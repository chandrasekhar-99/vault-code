import ProblemCard from "./ProblemCard";

export default function ProblemList({
  problems,
  loading,
}) {
  if (loading) {
    return (
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-8 text-center">
        <p className="text-[#8b949e]">
          Loading problems...
        </p>
      </div>
    );
  }

  if (!problems.length) {
    return (
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-12 text-center">
        <h2 className="text-lg font-semibold text-[#e6edf3]">
          No problems found
        </h2>

        <p className="mt-2 text-sm text-[#8b949e]">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {problems.map((problem) => (
        <ProblemCard
          key={problem._id}
          problem={problem}
        />
      ))}
    </div>
  );
}