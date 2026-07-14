import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSearch } from "../hooks/useProblems";
import ProblemTable from "../components/ProblemTable";
import type { Difficulty } from "../types";

type Filter = Difficulty | "All";

const FILTERS: Filter[] = ["All", "Easy", "Medium", "Hard", "Daily"];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [filter, setFilter] = useState<Filter>("All");

  // Keep URL in sync
  useEffect(() => {
    if (query.trim()) setSearchParams({ q: query.trim() });
    else setSearchParams({});
  }, [query, setSearchParams]);

  const results = useSearch(query, filter === "Daily" ? "Daily" : filter as Difficulty | "All");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-4">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Search</span>
      </nav>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by problem number or name…"
          autoFocus
          className="w-full border border-border rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded border transition-colors ${
              filter === f
                ? "bg-accent text-white border-accent"
                : "bg-white text-gray-600 border-border hover:border-accent hover:text-accent"
            }`}
          >
            {f === "Daily" ? "Daily Problems" : f}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-xs text-muted mb-3">
        {query.trim() ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"` : `${results.length} total problems`}
      </p>

      <ProblemTable problems={results} />
    </div>
  );
}
