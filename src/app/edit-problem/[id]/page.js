import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import ProblemForm from "@/components/problems/ProblemForm";
import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problem";

async function getProblem(id) {
  await connectDB();

  const problem = await Problem.findById(id).lean();

  if (!problem) {
    return null;
  }

  return JSON.parse(JSON.stringify(problem));
}

export default async function EditProblemPage({ params }) {
  const { id } = await params;

  const problem = await getProblem(id);

  if (!problem) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0d1117] py-6 sm:py-8 lg:py-10">
        <Container className="max-w-4xl">
          <h1 className="text-2xl font-bold text-[#e6edf3] sm:text-3xl">
            Edit Problem
          </h1>

          <p className="mt-2 text-sm text-[#8b949e]">
            Update your problem and solution.
          </p>

          <div className="mt-6 sm:mt-8">
            <ProblemForm problem={problem} />
          </div>
        </Container>
      </main>
    </>
  );
}