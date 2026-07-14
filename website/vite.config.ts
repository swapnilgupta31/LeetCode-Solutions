import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const VIRTUAL_ID = "virtual:problems";
const RESOLVED_ID = "\0virtual:problems";

// ── Types ────────────────────────────────────────────────────────────────────

type Category = "Daily Problems" | "Easy" | "Medium" | "Hard";
type Difficulty = "Easy" | "Medium" | "Hard" | "Daily";

interface ProblemEntry {
  id: string;
  number: number | null;
  title: string;
  category: Category;
  difficulty: Difficulty;
  readme: string;
  solution: string;
  lastModified: string;
  // Daily Problems extras
  dateLabel: string;       // e.g. "14 July 2026"
  dateISO: string;         // e.g. "2026-07-14" — for filtering
  leetcodeNumber: number | null; // problem number from filename e.g. 2812
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseNumber(name: string): number | null {
  const m = name.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function parseTitle(name: string): string {
  return name
    .replace(/^\d+[-_.\s()]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\.cs$/i, "")
    .trim() || name;
}

function readFile(p: string): string {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "";
}

function lastModified(p: string): string {
  try { return fs.statSync(p).mtime.toISOString(); } catch { return ""; }
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

/**
 * Parse Daily Problems filename format: D-M-YY(NNNN).cs
 * Examples: "1-7-26(2812).cs"  "13-7-27(1291).cs"
 * Returns { day, month (1-based), year (full), leetcodeNumber, dateLabel, dateISO }
 */
function parseDailyFilename(filename: string): {
  day: number;
  month: number;
  year: number;
  leetcodeNumber: number | null;
  dateLabel: string;
  dateISO: string;
} | null {
  // Match: day-month-year(number).cs  — year is 2-digit
  const m = filename.match(/^(\d+)-(\d+)-(\d+)\((\d+)\)\.cs$/i);
  if (!m) return null;

  const day   = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);       // 1-based
  const year  = 2000 + parseInt(m[3], 10); // 26 → 2026
  const leetcodeNumber = parseInt(m[4], 10);

  const dateLabel = `${day} ${MONTHS[month - 1]} ${year}`;
  const dateISO   = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return { day, month, year, leetcodeNumber, dateLabel, dateISO };
}

// ── Difficulty map ────────────────────────────────────────────────────────────
// Read from difficulty-map.json at repo root.
// Format: { "2812": "Hard", "1291": "Medium", ... }
// If a number is not in the map, falls back to "Daily".

function loadDifficultyMap(): Record<string, Difficulty> {
  const mapPath = path.join(REPO_ROOT, "difficulty-map.json");
  if (!fs.existsSync(mapPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(mapPath, "utf-8")) as Record<string, Difficulty>;
  } catch {
    return {};
  }
}

// ── Scanner ──────────────────────────────────────────────────────────────────

function scanCategory(category: Category, diffMap: Record<string, Difficulty>): ProblemEntry[] {
  const dir = path.join(REPO_ROOT, category);
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const problems: ProblemEntry[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const readme   = readFile(path.join(entryPath, "README.md"));
      const solution = readFile(path.join(entryPath, "Solution.cs"));
      const num      = parseNumber(entry.name);
      const title    = parseTitle(entry.name);
      const mtime    = lastModified(entryPath);

      problems.push({
        id: `${category}/${entry.name}`,
        number: num,
        title,
        category,
        difficulty: category === "Daily Problems" ? "Daily" : category as "Easy" | "Medium" | "Hard",
        readme,
        solution,
        lastModified: mtime,
        dateLabel: "",
        dateISO: "",
        leetcodeNumber: null,
      });

    } else if (entry.isFile() && entry.name.endsWith(".cs")) {
      const solution = readFile(entryPath);
      const mtime    = lastModified(entryPath);

      if (category === "Daily Problems") {
        // Parse the special daily filename format
        const parsed = parseDailyFilename(entry.name);
        const lcNum  = parsed?.leetcodeNumber ?? null;
        const diff: Difficulty =
          lcNum !== null && diffMap[String(lcNum)]
            ? diffMap[String(lcNum)]
            : "Daily";

        // Title: use the LeetCode number as the display title base
        // e.g. "Problem 2812" until a better name is available
        const title = lcNum !== null ? `Problem ${lcNum}` : parseTitle(entry.name);

        problems.push({
          id: `${category}/${entry.name}`,
          number: lcNum,
          title,
          category,
          difficulty: diff,
          readme: "",
          solution,
          lastModified: mtime,
          dateLabel: parsed?.dateLabel ?? "",
          dateISO:   parsed?.dateISO   ?? "",
          leetcodeNumber: lcNum,
        });
      } else {
        // Easy / Medium / Hard flat .cs file
        problems.push({
          id: `${category}/${entry.name}`,
          number: parseNumber(entry.name),
          title: parseTitle(entry.name),
          category,
          difficulty: category as "Easy" | "Medium" | "Hard",
          readme: "",
          solution,
          lastModified: mtime,
          dateLabel: "",
          dateISO: "",
          leetcodeNumber: null,
        });
      }
    }
  }

  // Sort daily by date descending (newest first), others by number ascending
  if (category === "Daily Problems") {
    problems.sort((a, b) => {
      if (a.dateISO && b.dateISO) return b.dateISO.localeCompare(a.dateISO);
      return 0;
    });
  } else {
    problems.sort((a, b) => {
      if (a.number !== null && b.number !== null) return a.number - b.number;
      if (a.number !== null) return -1;
      if (b.number !== null) return 1;
      return a.title.localeCompare(b.title);
    });
  }

  return problems;
}

function buildData(): string {
  const diffMap = loadDifficultyMap();
  const categories: Category[] = ["Daily Problems", "Easy", "Medium", "Hard"];
  const all: ProblemEntry[] = [];
  for (const cat of categories) all.push(...scanCategory(cat, diffMap));

  // Cross-list daily problems into their detected difficulty category
  // so they also appear on /easy, /medium, /hard pages.
  const dailyProblems = all.filter((p) => p.category === "Daily Problems");
  for (const dp of dailyProblems) {
    if (dp.difficulty === "Daily") continue; // no detected difficulty, skip
    const targetCat = dp.difficulty as Category;
    // Only add if not already present (avoid duplicates if user also added a folder)
    const alreadyExists = all.some(
      (p) => p.category === targetCat && p.number === dp.number && p.number !== null
    );
    if (!alreadyExists) {
      all.push({
        ...dp,
        id: `${targetCat}/${dp.leetcodeNumber ?? dp.id}__daily`,
        category: targetCat,
        // keep difficulty as Easy/Medium/Hard (already set correctly)
      });
    }
  }

  return JSON.stringify(all);
}

// ── Plugin ───────────────────────────────────────────────────────────────────

function problemsPlugin(): Plugin {
  return {
    name: "problems-plugin",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export const problems = ${buildData()};`;
      }
    },
    handleHotUpdate({ server }) {
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) server.moduleGraph.invalidateModule(mod);
      server.ws.send({ type: "full-reload" });
    },
  };
}

// ── Config ───────────────────────────────────────────────────────────────────

export default defineConfig({
  base: "/",
  plugins: [react(), problemsPlugin()],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          markdown: ["react-markdown", "remark-gfm", "rehype-raw"],
          highlight: ["react-syntax-highlighter"],
        },
      },
    },
  },
});
