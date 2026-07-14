export type Difficulty = "Easy" | "Medium" | "Hard" | "Daily";
export type Category = "Daily Problems" | "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  number: number | null;
  title: string;
  category: Category;
  difficulty: Difficulty;
  readme: string;
  solution: string;
  lastModified: string;
  // Daily Problems extras
  dateLabel: string;        // "14 July 2026"
  dateISO: string;          // "2026-07-14"
  leetcodeNumber: number | null;
}
