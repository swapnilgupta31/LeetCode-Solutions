/// <reference types="vite/client" />

declare module "virtual:problems" {
  import type { Problem } from "./types";
  export const problems: Problem[];
}
