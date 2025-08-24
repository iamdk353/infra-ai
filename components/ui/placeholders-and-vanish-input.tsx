import { Textarea } from "./textarea";
import { Button } from "./button";
import { ArrowBigUpDashIcon } from "lucide-react";

const ChatInput = ({
  onSubmit,
  input,
  onChange,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <form
      className="ring ring-primary rounded-3xl rounded-b-xl p-4 shadow-2xl w-[42rem] max-w-full  absolute bottom-10 left-1/2 -translate-x-1/2"
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        if (!input.trim() || input[0] === " ") return;
        if (e.key === "Enter" && !e.ctrlKey) {
          e.preventDefault();
          onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        } else if (e.key === "Enter" && e.ctrlKey) {
          // Ctrl+Enter → allow newline
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
      <div className="bg-background max-h-[5rem] overflow-y-scroll scrollbar-hidden rounded-t-3xl  relative">
        <Textarea
          placeholder="Prompt the Next Improvement to your organisation"
          value={input}
          className="w-full text-wrap resize-none border-none pr-[3rem]"
          onChange={onChange}
        />
      </div>

      <Button
        type="submit"
        className="rounded-full cursor-pointer shadow-xs disabled:rounded-md group absolute right-3 bottom-1 transition-all duration-200 ease-in-out"
        disabled={input.length === 0}
      >
        <ArrowBigUpDashIcon className="size-[14px] group-hover:translate-y-[-1px] transition-all" />
      </Button>
    </form>
  );
};
export default ChatInput;
