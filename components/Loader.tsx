import React, { useState, useEffect } from "react";

const Loader = () => {
  const [currentTagline, setCurrentTagline] = useState("");

  const taglines = [
    "Thinking deeply...",
    "Processing your request...",
    "Gathering insights...",
    "Analyzing information...",
    "Connecting the dots...",
    "Brewing up a response...",
    "Diving into knowledge...",
    "Crafting the perfect answer...",
    "Exploring possibilities...",
    "Computing solutions...",
    "Weaving thoughts together...",
    "Scanning the data universe...",
    "Assembling wisdom...",
    "Decoding your query...",
    "Channeling AI magic...",
    "Parsing through information...",
    "Synthesizing knowledge...",
    "Running neural networks...",
    "Consulting the digital oracle...",
    "Loading brilliance...",
    "Crunching numbers...",
    "Searching databases...",
    "Connecting neurons...",
    "Processing patterns...",
    "Generating ideas...",
  ];

  useEffect(() => {
    // Set initial random tagline
    const getRandomTagline = () =>
      taglines[Math.floor(Math.random() * taglines.length)];
    setCurrentTagline(getRandomTagline());
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-6 h-6 bg-transparent rounded-full border border-gray-700 flex items-center justify-center overflow-hidden">
        {/* ::before pseudo-element */}
        <div className="absolute inset-1 bg-transparent border border-dashed border-gray-600 rounded-full"></div>

        {/* ::after pseudo-element */}
        <div className="absolute w-2 h-2 rounded-full border border-dashed border-gray-600"></div>

        {/* Rotating radar span */}
        <span
          className="absolute top-1/2 left-1/2 w-1/2 h-full bg-transparent origin-top-left animate-spin border-t border-dashed"
          style={{
            borderTopColor: "oklch(0.5553 0.1455 48.9975)",
            animationDuration: "2s",
          }}
        >
          {/* span::before pseudo-element */}
          <div
            className="absolute top-0 left-0 w-full h-full origin-top-left -rotate-55"
            style={{
              background: "oklch(0.5553 0.1455 48.9975)",
              filter:
                "blur(8px) drop-shadow(4px 4px 8px oklch(0.5553 0.1455 48.9975))",
            }}
          ></div>
        </span>
      </div>

      <span
        className="text-sm text-accent-foreground animate-pulse select-none transition-all duration-500 ease-in-out"
        key={currentTagline}
      >
        {currentTagline}
      </span>
    </div>
  );
};

export default Loader;
