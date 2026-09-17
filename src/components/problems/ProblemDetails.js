import CodeBlock from "./CodeBlock";

const difficultyStyles = {
  Easy: "text-[#7ee787] bg-[#12261a] border-[#238636]",
  Medium: "text-[#d29922] bg-[#2a2110] border-[#9e6a03]",
  Hard: "text-[#ff7b72] bg-[#2d1616] border-[#da3633]",
};

export default function ProblemDetails({ problem }) {
  if (!problem) {
    return (
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-8 text-center">
        <p className="text-[#8b949e]">
          Problem not found.
        </p>
      </div>
    );
  }

  return (
    <article>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  <h1 className="break-words text-2xl font-bold text-[#e6edf3] sm:text-3xl">
    {problem.title}
  </h1>

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
              className="rounded-md bg-[#21262d] px-2.5 py-1 text-xs text-[#8b949e]"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-[#e6edf3]">
          Problem
        </h2>

        <p className="mt-4 whitespace-pre-wrap leading-7 text-[#8b949e]">
          {problem.description}
        </p>
      </section>

      {problem.examples?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Examples
          </h2>

          <div className="mt-4 space-y-4">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#30363d] bg-[#161b22] p-5"
              >
                <p className="mb-3 text-sm font-medium text-[#8b949e]">
                  Example {index + 1}
                </p>

                <div className="space-y-3 font-mono text-sm">
                  <div>
                    <span className="text-[#7ee787]">
                      Input:
                    </span>

                    <p className="mt-1 text-[#e6edf3]">
                      {example.input}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#7ee787]">
                      Output:
                    </span>

                    <p className="mt-1 text-[#e6edf3]">
                      {example.output}
                    </p>
                  </div>

                  {example.explanation && (
                    <div>
                      <span className="text-[#7ee787]">
                        Explanation:
                      </span>

                      <p className="mt-1 text-[#8b949e]">
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {problem.constraints?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Constraints
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-[#8b949e]">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </section>
      )}

      {problem.approach && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Approach
          </h2>

          <p className="mt-4 whitespace-pre-wrap leading-7 text-[#8b949e]">
            {problem.approach}
          </p>
        </section>
      )}

      {(problem.timeComplexity ||
        problem.spaceComplexity) && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Complexity
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
              <p className="text-sm text-[#8b949e]">
                Time Complexity
              </p>

              <p className="mt-2 font-mono text-[#7ee787]">
                {problem.timeComplexity || "N/A"}
              </p>
            </div>

            <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
              <p className="text-sm text-[#8b949e]">
                Space Complexity
              </p>

              <p className="mt-2 font-mono text-[#7ee787]">
                {problem.spaceComplexity || "N/A"}
              </p>
            </div>
          </div>
        </section>
      )}

      {problem.solutions?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Solutions
          </h2>

          <div className="mt-5 space-y-6">
            {problem.solutions.map((solution) => (
              <CodeBlock
                key={solution._id}
                code={solution.code}
                language={solution.language}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}