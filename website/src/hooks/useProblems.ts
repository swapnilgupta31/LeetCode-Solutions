import { useMemo } from "react";
import { problems as all } from "virtual:problems";
import type { Category, Difficulty, Problem } from "../types";

export function useProblems() {
  return all;
}

export function useCategory(category: Category): Problem[] {
  return useMemo(() => all.filter((p) => p.category === category), [category]);
}

export function useCategoryCounts() {
  return useMemo(
    () => ({
      "Daily Problems": all.filter((p) => p.category === "Daily Problems").length,
      Easy: all.filter((p) => p.category === "Easy").length,
      Medium: all.filter((p) => p.category === "Medium").length,
      Hard: all.filter((p) => p.category === "Hard").length,
    }),
    []
  );
}

export function useSearch(query: string, difficulty: Difficulty | "All") {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const matchesDiff =
        difficulty === "All" ||
        (difficulty === "Daily" ? p.category === "Daily Problems" : p.difficulty === difficulty);
      if (!matchesDiff) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.number !== null && String(p.number).includes(q))
      );
    });
  }, [query, difficulty]);
}
