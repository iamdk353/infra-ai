"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo, useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import { Play, StopCircleIcon, Volume2Icon } from "lucide-react";
import { tts, utterance, stopTTS } from "@/lib/tts";

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, ...props }: ResponseProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <>
        <Streamdown
          className={cn(
            "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            className
          )}
          {...props}
        />

        {(props as any)["data-type"] === "system" && (
          <button>
            {!isPlaying ? (
              <Volume2Icon
                className="size-4 m-2 cursor-pointer"
                onClick={() => {
                  setIsPlaying(true);
                  tts(props.children as string);
                  utterance!.onend = () => setIsPlaying(false);
                }}
              />
            ) : (
              <StopCircleIcon
                className="size-4 m-2 cursor-pointer animate-pulse"
                onClick={() => {
                  stopTTS();
                  setIsPlaying(false);
                }}
              />
            )}
          </button>
        )}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
