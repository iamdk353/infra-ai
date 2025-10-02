import React from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { ArrowBigUpDashIcon, MicIcon, PackageOpen } from "lucide-react";
import { Toggle } from "./toggle";

interface ChatInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  thinking: boolean;
  isAgent: boolean;
  setIsAgent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  input,
  onChange,
  setInput,
  thinking,
  isAgent,
  setIsAgent,
}) => {
  // Speech-to-text click handler
  const handleMicClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: Event) => {
      // Use 'any' to access dynamic property
      const transcript = (event as any).results[0][0].transcript;
      console.log(transcript);
      setInput(transcript as string);
    };
    recognition.onerror = (event: Event) => {
      const error = (event as any).error;
      console.error("Speech recognition error: " + error);
    };
    recognition.start();
  };

  return (
    <form
      className="ring ring-primary rounded-3xl rounded-b-xl p-4 shadow-2xl w-[42rem] max-w-full absolute bottom-10 left-1/2 -translate-x-1/2"
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        if (!input.trim() || input[0] === " ") return;
        if (e.key === "Enter" && !e.ctrlKey) {
          e.preventDefault();
          onSubmit(e as React.FormEvent<HTMLFormElement>);
        } else if (e.key === "Enter" && e.ctrlKey) {
          const target = e.target as HTMLTextAreaElement;
          const start = target.selectionStart;
          const end = target.selectionEnd;
          target.value =
            target.value.substring(0, start) +
            "\n" +
            target.value.substring(end);
          target.selectionStart = target.selectionEnd = start + 1;
        }
      }}
    >
      <div className="bg-background max-h-[5rem] overflow-y-scroll scrollbar-hidden rounded-t-3xl relative">
        <Textarea
          placeholder="Prompt the Next Improvement to your organisation"
          value={input}
          className="w-full text-wrap resize-none border-none pr-[3rem]"
          onChange={onChange}
        />
      </div>
      <div className="flex space-x-2.5">
        <Toggle
          aria-label="Toggle"
          defaultPressed={isAgent}
          onPressedChange={setIsAgent}
        >
          <PackageOpen />
          Agent
        </Toggle>
      </div>
      <Button
        type="submit"
        className="rounded-full cursor-pointer shadow-xs disabled:rounded-md group absolute right-3 bottom-1 transition-all duration-200 ease-in-out"
        disabled={input.length === 0 || thinking}
      >
        <ArrowBigUpDashIcon className="size-[14px] group-hover:translate-y-[-1px] transition-all" />
      </Button>
      <Button
        type="button"
        className="rounded-full cursor-pointer shadow-xs disabled:rounded-md group absolute right-[4rem] bottom-1 transition-all duration-200 ease-in-out"
        onClick={handleMicClick}
      >
        <MicIcon className="size-[14px] group-hover:translate-y-[-1px] transition-all" />
      </Button>
    </form>
  );
};

export default ChatInput;
