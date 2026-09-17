import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#30363d] bg-[#0d1117]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/problems">
  Vault<span className="text-[#58a6ff]">Code</span>
</Link>

        <nav className="flex items-center gap-3 text-sm sm:gap-6">
          <Link
            href="/problems"
            className="text-[#8b949e] transition hover:text-[#e6edf3]"
          >
            Problems
          </Link>

          <Link
            href="/add-problem"
            className="rounded-md bg-[#238636] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#2ea043] sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add Problem</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}