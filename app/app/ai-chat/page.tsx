"use client";

import ChatInput from "@/components/ui/placeholders-and-vanish-input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";

import { useEffect, useState } from "react";
const page = () => {
  const [input, setInput] = useState("");
  const [Messages, setMessages] = useState<messageProps[]>();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || input[0] === " ") return;
    setMessages((prev) => [
      ...(prev || []),
      { from: "user", message: input.trim() },
    ]);
    console.log("submitted");
    setInput("");
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
