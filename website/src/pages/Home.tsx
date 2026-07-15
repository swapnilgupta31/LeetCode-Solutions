import { Link } from "react-router-dom";
import { useCategoryCounts } from "../hooks/useProblems";
import type { Category } from "../types";

const CATEGORIES: { label: Category; path: string; description: string }[] = [
  { label: "Daily Problems", path: "/daily", description: "Daily challenge solutions" },
  { label: "Easy", path: "/easy", description: "Easy difficulty problems" },
  { label: "Medium", path: "/medium", description: "Medium difficulty problems" },
  { label: "Hard", path: "/hard", description: "Hard difficulty problems" },
];

export default function Home() {
  const counts = useCategoryCounts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Description */}
      <p className="text-muted text-sm mb-8">
        Collection of LeetCode solutions written in C# with clean implementations, approaches and complexity analysis.
      </p>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(({ label, path, description }) => (
          <Link
            key={label}
            to={path}
            className="block border border-border rounded-lg p-5 bg-white hover:border-accent hover:shadow-sm transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 text-base">{label}</h2>
                <p className="text-muted text-xs mt-1">{description}</p>
              </div>
              <span className="text-2xl font-semibold text-gray-900 tabular-nums">
                {counts[label]}
              </span>
            </div>
            <div className="mt-4">
              <span className="inline-block text-xs font-medium text-accent border border-accent rounded px-3 py-1.5 group-hover:bg-accent group-hover:text-white transition-colors">
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
