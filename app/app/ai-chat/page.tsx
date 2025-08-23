"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";

import { useState } from "react";
const page = () => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const [input, setInput] = useState("");
  return (
    <div className="h-full">
      <Conversation className="relative w-full" style={{ height: "80vh" }}>
        <ConversationContent>
          <Message from={"user"}>
            <MessageContent>Hi there!</MessageContent>
          </Message>
          <Message from={"assistant"}>
            <MessageContent>Hi there!</MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
export default page;
