import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useProblems";
import DifficultyBadge from "../components/DifficultyBadge";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function DailyProblemsPage() {
  const problems = useCategory("Daily Problems");

  const [yearFilter, setYearFilter]   = useState<string>("All");
  const [monthFilter, setMonthFilter] = useState<string>("All");

  // Derive available years and months from actual data
  const { years, months } = useMemo(() => {
    const yearSet  = new Set<string>();
    const monthSet = new Set<number>();
    for (const p of problems) {
      if (!p.dateISO) continue;
      const [y, m] = p.dateISO.split("-");
      yearSet.add(y);
      monthSet.add(parseInt(m, 10));
    }
    return {
      years:  Array.from(yearSet).sort((a, b) => b.localeCompare(a)),
      months: Array.from(monthSet).sort((a, b) => a - b),
    };
  }, [problems]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (!p.dateISO) return yearFilter === "All" && monthFilter === "All";
      const [y, m] = p.dateISO.split("-");
      if (yearFilter  !== "All" && y !== yearFilter)  return false;
      if (monthFilter !== "All" && m !== monthFilter.padStart(2, "0")) return false;
      return true;
    });
  }, [problems, yearFilter, monthFilter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-4">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Daily Problems</span>
      </nav>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">Daily Problems</h1>
        <span className="text-sm text-muted">{filtered.length} of {problems.length}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Year */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted font-medium">Year</label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="text-xs border border-border rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="All">All</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted font-medium">Month</label>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="text-xs border border-border rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="All">All</option>
            {months.map((m) => (
              <option key={m} value={String(m)}>{MONTHS[m - 1]}</option>
            ))}
          </select>
        </div>

        {/* Reset */}
        {(yearFilter !== "All" || monthFilter !== "All") && (
          <button
            onClick={() => { setYearFilter("All"); setMonthFilter("All"); }}
            className="text-xs text-accent hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="text-muted py-8 text-center text-sm">No problems found for this filter.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/problem/${encodeURIComponent(p.id)}`}
              className="flex items-center justify-between px-4 py-3 bg-white hover:bg-secondary transition-colors gap-3"
            >
              <span className="text-xs text-muted whitespace-nowrap w-28 shrink-0">{p.dateLabel || "—"}</span>
              <span className="font-mono font-medium text-gray-900 shrink-0">
                {p.leetcodeNumber !== null ? `#${p.leetcodeNumber}` : "—"}
              </span>
              <span className="flex-1"><DifficultyBadge difficulty={p.difficulty} /></span>
              <span className="text-xs font-medium text-accent border border-accent rounded px-2.5 py-1 whitespace-nowrap shrink-0">
                Open →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
