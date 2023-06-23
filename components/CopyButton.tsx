"use client";

import { useState } from "react";

export const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <button
      className="absolute right-1 top-0 rounded-md px-2 py-1 font-sans text-xs font-medium lowercase text-slate-100/70 transition-colors hover:bg-slate-300/20"
      disabled={isCopied}
      onClick={copy}
    >
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
