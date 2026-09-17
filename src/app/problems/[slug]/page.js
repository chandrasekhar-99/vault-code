import Link from "next/link";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import ProblemDetails from "@/components/problems/ProblemDetails";

async function getProblem(slug) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
    }/api/problems/slug/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  return result.data;
}

export default async function ProblemPage({ params }) {
  const { slug } = await params;

  const problem = await getProblem(slug);

  if (!problem) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#0d1117] py-20">
          <Container>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#e6edf3]">
                Problem Not Found
              </h1>

              <Link
                href="/problems"
                className="mt-6 inline-block text-[#58a6ff] hover:underline"
              >
                ← Back to Problems
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0d1117] py-10">
        <Container className="max-w-4xl">
          <Link
            href="/problems"
            className="text-sm text-[#8b949e] hover:text-[#58a6ff]"
          >
            ← Back to Problems
          </Link>

          <div className="mt-8">
            <ProblemDetails problem={problem} />
          </div>
        </Container>
      </main>
    </>
  );
}