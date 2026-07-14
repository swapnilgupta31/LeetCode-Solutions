import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings — Approach, Flow, Time Complexity, Space Complexity
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold text-gray-900 mt-6 mb-3 pb-2 border-b border-border">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-gray-900 mt-5 mb-2.5 flex items-center gap-2">
              <span className="w-1 h-4 bg-accent rounded-full inline-block shrink-0" />
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-2">
              {children}
            </h3>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{children}</p>
          ),
          // Bold — highlight key terms
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-3 text-sm text-gray-700 pl-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-3 text-sm text-gray-700 pl-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-gray-700 leading-relaxed">{children}</li>
          ),
          // Blockquote — used for notes/tips
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent bg-orange-50 px-4 py-2 my-3 rounded-r text-sm text-gray-700">
              {children}
            </blockquote>
          ),
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary text-gray-700 font-medium">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left border-b border-border text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-b border-border text-gray-700">{children}</td>
          ),
          // Inline code
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!match) {
              return (
                <code
                  className="bg-gray-900 text-green-400 px-1.5 py-0.5 rounded text-xs font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            // Fenced code block
            return (
              <div className="my-3 rounded-lg overflow-hidden border border-[#1e1e1e]">
                <div className="px-4 py-1.5 bg-[#1e1e1e] flex items-center justify-between">
                  <span className="text-xs text-[#858585] font-mono">{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  PreTag="div"
                  customStyle={{
                    borderRadius: 0,
                    fontSize: "0.8rem",
                    margin: 0,
                    background: "#1e1e1e",
                    padding: "1rem",
                  }}
                  showLineNumbers
                  lineNumberStyle={{ color: "#4a4a4a", minWidth: "2.5em" }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          },
          // Horizontal rule
          hr: () => <hr className="border-border my-5" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
