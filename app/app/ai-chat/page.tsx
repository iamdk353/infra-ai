"use client";
import ChatInput from "@/components/ui/placeholders-and-vanish-input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import React from "react";
import Loader from "@/components/Loader";

const Page = () => {
  const [input, setInput] = useState("");
  const [Messages, setMessages] = useState<messageProps[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  interface GenerateResponse {
    message: string;
    content: string;
    timestamp: string;
  }

  interface SearchResponse {
    success: boolean;
    query: string;
    results: string;
  }

  async function RetriveKnowledge(info: string) {
    const { data } = await axios.post<SearchResponse>(
      "/api/knowledge/retrive",
      {
        query: info,
        token: localStorage.getItem("token"),
      }
    );
    if (data) {
      await generateContent(info, data.results);
    }
  }

  const generateContent = async (
    prompt: string,
    text: string
  ): Promise<GenerateResponse> => {
    try {
      setThinking(true); // AI started thinking
      const response: AxiosResponse<GenerateResponse> = await axios.post(
        "/api/ai",
        { prompt, text },
        { headers: { "Content-Type": "application/json" } }
      );
      // Replace "thinking..." placeholder with final AI message
      setMessages((prev) => {
        const withoutThinking = prev.filter(
          (m) => m.from !== "system-thinking"
        );
        return [
          ...withoutThinking,
          { from: "system", message: response.data.content },
        ];
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Generation failed: ${error.response?.data?.error || error.message}`
      );
    } finally {
      setThinking(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || input[0] === " ") return;

    const userMessage = input.trim();

    // Add user message
    setMessages((prev) => [...prev, { from: "user", message: userMessage }]);
    // Add placeholder "AI is thinking..." (now using Loader component)
    setMessages((prev) => [
      ...prev,
      { from: "system-thinking", message: "" }, // Empty message since we'll render Loader
    ]);

    // Clear input after capturing the value
    setInput("");

    try {
      await RetriveKnowledge(userMessage);
    } catch (error) {
      console.error("Error retrieving knowledge:", error);
      // Remove the thinking message if there's an error
      setMessages((prev) => prev.filter((m) => m.from !== "system-thinking"));
    }
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <Conversation className="relative w-full">
        <ConversationContent>
          {Messages && <Chat data={Messages} />}
        </ConversationContent>
        {/* <ConversationScrollButton /> */}
      </Conversation>
      <ChatInput
        onChange={handleChange}
        onSubmit={onSubmit}
        input={input}
        thinking={thinking}
      />
    </div>
  );
};

export default Page;

interface messageProps {
  from: "system" | "user" | "assistant" | "system-thinking";
  message: string;
}

const Chat = ({ data }: { data: messageProps[] }) => {
  return (
    <>
      {data.map(({ from, message }, index) => (
        <Message
          from={from === "system-thinking" ? "system" : from}
          key={index}
        >
          <MessageContent
            className={`whitespace-pre-wrap break-words ${
              from === "system-thinking"
                ? "flex justify-center items-center"
                : ""
            }`}
          >
            {from === "system-thinking" ? <Loader /> : message}
          </MessageContent>
        </Message>
      ))}
    </>
  );
};
