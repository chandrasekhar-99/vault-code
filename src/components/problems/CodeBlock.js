"use client";

import { useState } from "react";

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 24;
const DEFAULT_FONT_SIZE = 14;

export default function CodeBlock({
  code,
  language = "JavaScript",
}) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const increaseFontSize = () => {
    setFontSize((size) =>
      Math.min(size + 1, MAX_FONT_SIZE)
    );
  };

  const decreaseFontSize = () => {
    setFontSize((size) =>
      Math.max(size - 1, MIN_FONT_SIZE)
    );
  };

  const resetFontSize = () => {
    setFontSize(DEFAULT_FONT_SIZE);
  };

  return (
    <div className="code-block max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30363d] bg-[#181818] px-3 py-2.5 sm:px-4 sm:py-3">
        {/* Language */}
        <span className="text-xs text-[#8b949e] sm:text-sm">
          {language}
        </span>

        <div className="flex items-center gap-2">
          {/* Font Size Controls */}
          <div className="flex items-center overflow-hidden rounded-md border border-[#30363d]">
  <button
    type="button"
    onClick={decreaseFontSize}
    disabled={fontSize === MIN_FONT_SIZE}
    className="px-2.5 py-1 text-sm text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3] disabled:cursor-not-allowed disabled:opacity-40"
    title="Decrease font size"
  >
    −
  </button>

  <button
    type="button"
    onClick={resetFontSize}
    className="border-x border-[#30363d] px-2.5 py-1 text-xs text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3]"
    title="Reset font size"
  >
    Reset
  </button>

  <button
    type="button"
    onClick={increaseFontSize}
    disabled={fontSize === MAX_FONT_SIZE}
    className="px-2.5 py-1 text-sm text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3] disabled:cursor-not-allowed disabled:opacity-40"
    title="Increase font size"
  >
    +
  </button>
</div>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-[#30363d] px-2.5 py-1 text-xs text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#e6edf3]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre
        className="m-0 overflow-x-auto p-3 font-mono leading-6 text-[#d4d4d4] sm:p-5 sm:leading-7"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}