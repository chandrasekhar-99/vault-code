import Link from "next/link";

const difficultyStyles = {
  Easy: "text-[#7ee787] bg-[#12261a] border-[#238636]",
  Medium: "text-[#d29922] bg-[#2a2110] border-[#9e6a03]",
  Hard: "text-[#ff7b72] bg-[#2d1616] border-[#da3633]",
};

export default function ProblemCard({ problem }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group block rounded-lg border border-[#30363d] bg-[#161b22] p-4 transition hover:border-[#58a6ff] sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="break-words text-base font-semibold text-[#e6edf3] group-hover:text-[#58a6ff] sm:text-lg">
            {problem.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#8b949e]">
            {problem.description}
          </p>
        </div>

        <span
          className={`self-start rounded-full border px-3 py-1 text-xs font-medium ${
            difficultyStyles[problem.difficulty]
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      {problem.topics?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {problem.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-[#21262d] px-2 py-1 text-xs text-[#8b949e]"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-[#8b949e]">
        {problem.solutions?.length || 0} solution
        {problem.solutions?.length === 1 ? "" : "s"}
      </div>
    </Link>
  );
}