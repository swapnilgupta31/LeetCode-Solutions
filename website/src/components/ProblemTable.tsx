import { Link } from "react-router-dom";
import DifficultyBadge from "./DifficultyBadge";
import type { Problem } from "../types";

interface Props {
  problems: Problem[];
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProblemTable({ problems }: Props) {
  if (problems.length === 0) {
    return <p className="text-muted py-8 text-center">No problems found.</p>;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary border-b border-border text-left">
            <th className="px-4 py-2.5 font-medium text-gray-600 w-16">#</th>
            <th className="px-4 py-2.5 font-medium text-gray-600">Problem</th>
            <th className="px-4 py-2.5 font-medium text-gray-600 w-24">Difficulty</th>
            <th className="px-4 py-2.5 font-medium text-gray-600 w-32 hidden sm:table-cell">Updated</th>
            <th className="px-4 py-2.5 font-medium text-gray-600 w-16"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {problems.map((p) => (
            <tr key={p.id} className="hover:bg-secondary transition-colors">
              <td className="px-4 py-3 text-muted font-mono">
                {p.number ?? "—"}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
              <td className="px-4 py-3">
                <DifficultyBadge difficulty={p.difficulty} />
              </td>
              <td className="px-4 py-3 text-muted hidden sm:table-cell">
                {formatDate(p.lastModified)}
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/problem/${encodeURIComponent(p.id)}`}
                  className="text-accent hover:underline font-medium"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
