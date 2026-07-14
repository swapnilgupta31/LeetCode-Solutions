import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "csharp" }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[#1e1e1e]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-[#858585] font-mono">Solution.cs</span>
        <div className="flex items-center gap-2">
          <span className="text-xs border border-[#3e3e3e] text-[#858585] rounded px-2 py-0.5 font-mono">C#</span>
          <button
            onClick={handleCopy}
            className={`text-xs px-2.5 py-1 rounded border transition-colors font-mono ${
              copied
                ? "bg-green-600 border-green-600 text-white"
                : "bg-transparent border-[#3e3e3e] text-[#858585] hover:border-[#858585] hover:text-[#cccccc]"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.82rem",
          lineHeight: "1.65",
          background: "#1e1e1e",
          padding: "1.25rem 0",
        }}
        lineNumberStyle={{
          color: "#4a4a4a",
          minWidth: "3em",
          paddingRight: "1.5em",
          userSelect: "none",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
