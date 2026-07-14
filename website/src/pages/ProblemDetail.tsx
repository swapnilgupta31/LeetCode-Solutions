import { useParams, Link } from "react-router-dom";
import { useProblems } from "../hooks/useProblems";
import DifficultyBadge from "../components/DifficultyBadge";
import MarkdownRenderer from "../components/MarkdownRenderer";
import CodeBlock from "../components/CodeBlock";

const CATEGORY_PATH: Record<string, string> = {
  "Daily Problems": "/daily",
  Easy: "/easy",
  Medium: "/medium",
  Hard: "/hard",
};

const RUN_STEPS = [
  "Read the approach above carefully.",
  "Analyse the logic and try to write the solution on your own.",
  "If stuck, copy the code below.",
  "Open LeetCode and find the problem.",
  "Paste the solution into the editor.",
  "Select C# as the language.",
  "Click Run to test.",
  "Click Submit.",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-1 h-5 bg-accent rounded-full" />
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{children}</h2>
    </div>
  );
}

export default function ProblemDetail() {
  const { encodedId } = useParams<{ encodedId: string }>();
  const all = useProblems();

  const id = encodedId ? decodeURIComponent(encodedId) : "";
  const idx = all.findIndex((p) => p.id === id);
  const problem = all[idx];

  if (!problem) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted">Problem not found.</p>
        <Link to="/" className="text-accent hover:underline text-sm mt-2 inline-block">
          ← Back to home
        </Link>
      </div>
    );
  }

  const categoryPath = CATEGORY_PATH[problem.category] ?? "/";

  const siblings = all.filter((p) => p.category === problem.category);
  const sibIdx = siblings.findIndex((p) => p.id === id);
  const prev = sibIdx > 0 ? siblings[sibIdx - 1] : null;
  const next = sibIdx < siblings.length - 1 ? siblings[sibIdx + 1] : null;

  // Extract complexity lines from solution comments
  const timeMatch = problem.solution.match(/Time Complexity[:\s]+([^\n\r]+)/i);
  const spaceMatch = problem.solution.match(/Space Complexity[:\s]+([^\n\r]+)/i);
  const timeComplexity = timeMatch ? timeMatch[1].replace(/^\/\/\s*/, "").trim() : null;
  const spaceComplexity = spaceMatch ? spaceMatch[1].replace(/^\/\/\s*/, "").trim() : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-5">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5">/</span>
        <Link to={categoryPath} className="hover:text-accent">{problem.category}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{problem.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 pb-5 border-b border-border">
        <div className="flex flex-wrap items-center gap-3">
          {problem.number !== null && (
            <span className="text-muted font-mono text-sm">#{problem.number}</span>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{problem.title}</h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        {problem.dateLabel && (
          <p className="text-xs text-muted mt-2">{problem.dateLabel}</p>
        )}
      </div>

      {/* Complexity — minimal inline tags */}
      {(timeComplexity || spaceComplexity) && (
        <div className="flex flex-wrap gap-2 mb-7">
          {timeComplexity && (
            <span className="inline-flex items-center gap-1.5 border border-border rounded px-2.5 py-1 text-xs text-muted">
              <span className="font-medium text-gray-700">Time</span>
              <span className="text-border">·</span>
              <span className="font-mono text-gray-800">{timeComplexity}</span>
            </span>
          )}
          {spaceComplexity && (
            <span className="inline-flex items-center gap-1.5 border border-border rounded px-2.5 py-1 text-xs text-muted">
              <span className="font-medium text-gray-700">Space</span>
              <span className="text-border">·</span>
              <span className="font-mono text-gray-800">{spaceComplexity}</span>
            </span>
          )}
        </div>
      )}

      {/* Approach / README */}
      {problem.readme && (
        <section className="mb-8 border border-border rounded-lg p-5 bg-white">
          <SectionLabel>Approach</SectionLabel>
          <MarkdownRenderer content={problem.readme} />
        </section>
      )}

      {/* Solution */}
      <section className="mb-8">
        <SectionLabel>Solution</SectionLabel>
        {problem.solution && <CodeBlock code={problem.solution} />}
      </section>

      {/* How to Run */}
      <section className="mb-10 border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 bg-secondary border-b border-border">
          <SectionLabel>How to Run</SectionLabel>
        </div>
        <ol className="divide-y divide-border">
          {RUN_STEPS.map((step, i) => (
            <li key={i} className="flex items-center gap-4 px-5 py-3 bg-white hover:bg-secondary transition-colors">
              <span className="shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Prev / Next */}
      <div className="flex justify-between gap-4 border-t border-border pt-5">
        {prev ? (
          <Link
            to={`/problem/${encodeURIComponent(prev.id)}`}
            className="text-sm text-accent hover:underline"
          >
            ← {prev.number !== null ? `#${prev.number} ` : ""}{prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link
            to={`/problem/${encodeURIComponent(next.id)}`}
            className="text-sm text-accent hover:underline"
          >
            {next.number !== null ? `#${next.number} ` : ""}{next.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
