import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import ProblemForm from "@/components/problems/ProblemForm";

export const metadata = {
  title: "Add Problem | Vault Code",
};

export default function AddProblemPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0d1117] py-10">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#e6edf3]">
              Add Coding Problem
            </h1>

            <p className="mt-2 text-[#8b949e]">
              Add a new coding problem and its solution.
            </p>
          </div>

          <ProblemForm />
        </Container>
      </main>
    </>
  );
}