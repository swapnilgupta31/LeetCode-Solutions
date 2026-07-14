import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useProblems";
import ProblemTable from "../components/ProblemTable";
import type { Category } from "../types";

interface Props {
  category: Category;
}

export default function CategoryPage({ category }: Props) {
  const problems = useCategory(category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-4">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{category}</span>
      </nav>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">{category}</h1>
        <span className="text-sm text-muted">{problems.length} problem{problems.length !== 1 ? "s" : ""}</span>
      </div>

      <ProblemTable problems={problems} />
    </div>
  );
}
