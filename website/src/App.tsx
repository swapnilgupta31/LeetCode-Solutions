import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";

const Home             = lazy(() => import("./pages/Home"));
const DailyProblemsPage = lazy(() => import("./pages/DailyProblemsPage"));
const CategoryPage     = lazy(() => import("./pages/CategoryPage"));
const ProblemDetail    = lazy(() => import("./pages/ProblemDetail"));
const SearchPage       = lazy(() => import("./pages/SearchPage"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/daily" element={<DailyProblemsPage />} />
              <Route path="/easy" element={<CategoryPage category="Easy" />} />
              <Route path="/medium" element={<CategoryPage category="Medium" />} />
              <Route path="/hard" element={<CategoryPage category="Hard" />} />
              <Route path="/problem/:encodedId" element={<ProblemDetail />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
