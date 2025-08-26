"use client";

import ChatInput from "@/components/ui/placeholders-and-vanish-input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import axios, { AxiosResponse } from "axios";

import { useEffect, useState } from "react";
const page = () => {
  const [input, setInput] = useState("");
  const [Messages, setMessages] = useState<messageProps[]>();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  interface SearchRequest {
    query: string;
    token: string;
  }
  interface GenerateRequest {
    prompt: string;
  }

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

    console.log(data);
    if (data) {
      console.log("invoking llm");
      await generateContent(info, data.results);
    }
  }
  const generateContent = async (
    prompt: string,
    text: string
  ): Promise<GenerateResponse> => {
    // ) => {
    try {
      const response: AxiosResponse<GenerateResponse> = await axios.post(
        "/api/ai",
        {
          prompt,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) => [
        ...(prev || []),
        { from: "system", message: response.data.content },
      ]);
      // console.log(" ai resp ", response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Generation failed: ${error.response?.data?.error || error.message}`
      );
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || input[0] === " ") return;
    setMessages((prev) => [
      ...(prev || []),
      { from: "user", message: input.trim() },
    ]);
    console.log("submitted");
    setInput("");
    await RetriveKnowledge(input.trim());
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <Conversation className="relative w-full ">
        <ConversationContent className="">
          {Messages && <Chat data={Messages} />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <ChatInput onChange={handleChange} onSubmit={onSubmit} input={input} />
    </div>
  );
};
export default page;

interface messageProps {
  from: "system" | "user" | "assistant";
  message: string;
}

const Chat = ({ data }: { data: messageProps[] }) => {
  return (
    <>
      {data.map(({ from, message }, index) => (
        <Message from={from} className="" key={index}>
          <MessageContent className="whitespace-pre-wrap break-words">
            {message}
          </MessageContent>
        </Message>
      ))}
    </>
  );
};
