import Link from "next/link";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-65px)] bg-[#0d1117]">
        <Container className="flex min-h-[calc(100vh-65px)] items-center justify-center py-12 sm:py-16 lg:py-20">
          <section className="w-full max-w-3xl text-center">
            <div className="mb-5 inline-flex rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-xs text-[#8b949e] sm:px-4 sm:py-2 sm:text-sm">
              Coding Problems & Solutions
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#e6edf3] sm:text-5xl md:text-6xl">
              Your Coding
              <span className="block text-[#58a6ff] sm:inline">
                {" "}Knowledge Vault
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#8b949e] sm:mt-6 sm:text-lg sm:leading-8">
              Search, learn, and manage coding problem
              solutions in one place.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="/problems"
                className="rounded-md bg-[#238636] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2ea043] sm:text-base"
              >
                Browse Problems
              </Link>

              <Link
                href="/add-problem"
                className="rounded-md border border-[#30363d] bg-[#161b22] px-6 py-3 text-sm font-medium text-[#e6edf3] transition hover:border-[#58a6ff] sm:text-base"
              >
                Add Problem
              </Link>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}