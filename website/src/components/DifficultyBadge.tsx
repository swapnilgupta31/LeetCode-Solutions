import type { Difficulty } from "../types";

const styles: Record<Difficulty, string> = {
  Easy: "bg-green-50 text-green-700 border border-green-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Hard: "bg-red-50 text-red-700 border border-red-200",
  Daily: "bg-blue-50 text-blue-700 border border-blue-200",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${styles[difficulty]}`}>
      {difficulty === "Daily" ? "Daily" : difficulty}
    </span>
  );
}
