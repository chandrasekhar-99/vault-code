"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import ProblemFilter from "@/components/problems/ProblemFilter";
import ProblemList from "@/components/problems/ProblemList";

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    difficulty: "",
    topic: "",
    language: "",
    company: "",
    sort: "newest",
  });

  const fetchProblems = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      const response = await fetch(
        `/api/problems?${params.toString()}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setProblems(result.data || []);
    } catch (error) {
      console.error("Failed to fetch problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProblems();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-65px)] bg-[#0d1117] py-6 sm:py-8 lg:py-10">
  <Container>
    <div>
      <h1 className="text-2xl font-bold text-[#e6edf3] sm:text-3xl">
        Coding Problems
      </h1>

      <p className="mt-2 text-sm leading-6 text-[#8b949e] sm:text-base">
        Search and explore coding problems and solutions.
      </p>
    </div>

    <div className="mt-6 sm:mt-8">
      <ProblemFilter
        filters={filters}
        setFilters={setFilters}
      />
    </div>

    <div className="mt-6 sm:mt-8">
      <ProblemList
        problems={problems}
        loading={loading}
      />
    </div>
  </Container>
</main>
    </>
  );
}