"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";

const initialForm = {
  title: "",
  slug: "",
  difficulty: "Easy",
  description: "",
  topics: "",
  companies: "",
  constraints: "",
  approach: "",
  timeComplexity: "",
  spaceComplexity: "",
  language: "JavaScript",
  code: "",
};

export default function ProblemForm({ problem = null }) {
  const router = useRouter();

  const isEditMode = Boolean(problem);

  const [form, setForm] = useState(() => {
    if (!problem) {
      return initialForm;
    }

    return {
      title: problem.title || "",
      slug: problem.slug || "",
      difficulty: problem.difficulty || "Easy",
      description: problem.description || "",
      topics: problem.topics?.join(", ") || "",
      companies: problem.companies?.join(", ") || "",
      constraints: problem.constraints?.join("\n") || "",
      approach: problem.approach || "",
      timeComplexity: problem.timeComplexity || "",
      spaceComplexity: problem.spaceComplexity || "",
      language:
        problem.solutions?.[0]?.language || "JavaScript",
      code: problem.solutions?.[0]?.code || "",
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (name, value) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value) => {
    setForm((previous) => ({
      ...previous,
      title: value,
      slug: createSlug(value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const title = form.title.trim();
      const slug = form.slug.trim();
      const description = form.description.trim();

      if (!title) {
        throw new Error("Title is required");
      }

      if (!slug) {
        throw new Error("Slug is required");
      }

      if (!description) {
        throw new Error("Description is required");
      }

      const payload = {
        title,
        slug,
        difficulty: form.difficulty,
        description,

        topics: form.topics
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        companies: form.companies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        constraints: form.constraints
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        approach: form.approach.trim(),
        timeComplexity: form.timeComplexity.trim(),
        spaceComplexity: form.spaceComplexity.trim(),

        solutions: [
          {
            language: form.language,
            code: form.code,
          },
        ],
      };

      console.log("Submitting payload:", payload);

      const url = isEditMode
        ? `/api/problems/${problem._id}`
        : "/api/problems";

      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            (isEditMode
              ? "Failed to update problem"
              : "Failed to create problem")
        );
      }

      router.push(`/problems/${result.data.slug}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md border border-[#da3633] bg-[#2d1616] p-4 text-sm text-[#ff7b72]">
          {error}
        </div>
      )}

      <section className="space-y-5 rounded-lg border border-[#30363d] bg-[#161b22] p-6">
        <h2 className="text-lg font-semibold text-[#e6edf3]">
          Basic Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Title"
            value={form.title}
            placeholder="Two Sum"
            onChange={(event) =>
              handleTitleChange(event.target.value)
            }
          />

          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-[#e6edf3]">
              Slug
            </label>

            <input
              type="text"
              value={form.slug}
              readOnly
              className="w-full cursor-not-allowed rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2.5 text-sm text-[#8b949e] outline-none"
            />
          </div>

          <Select
            label="Difficulty"
            value={form.difficulty}
            onChange={(event) =>
              updateField(
                "difficulty",
                event.target.value
              )
            }
            options={[
              {
                label: "Easy",
                value: "Easy",
              },
              {
                label: "Medium",
                value: "Medium",
              },
              {
                label: "Hard",
                value: "Hard",
              },
            ]}
          />

          <Input
            label="Topics"
            value={form.topics}
            placeholder="Array, HashMap"
            onChange={(event) =>
              updateField(
                "topics",
                event.target.value
              )
            }
          />
        </div>

        <Input
          label="Companies"
          value={form.companies}
          placeholder="Amazon, Google, Microsoft"
          onChange={(event) =>
            updateField(
              "companies",
              event.target.value
            )
          }
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-[#e6edf3]">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
            rows={6}
            placeholder="Describe the problem..."
            className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-3 text-sm text-[#e6edf3] outline-none placeholder:text-[#6e7681] focus:border-[#58a6ff]"
          />
        </div>
      </section>

      <section className="space-y-5 rounded-lg border border-[#30363d] bg-[#161b22] p-6">
        <h2 className="text-lg font-semibold text-[#e6edf3]">
          Constraints
        </h2>

        <textarea
          value={form.constraints}
          onChange={(event) =>
            updateField(
              "constraints",
              event.target.value
            )
          }
          rows={5}
          placeholder={
            "2 <= nums.length <= 10000\n-10^9 <= nums[i] <= 10^9"
          }
          className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-3 font-mono text-sm text-[#e6edf3] outline-none placeholder:text-[#6e7681] focus:border-[#58a6ff]"
        />
      </section>

      <section className="space-y-5 rounded-lg border border-[#30363d] bg-[#161b22] p-6">
        <h2 className="text-lg font-semibold text-[#e6edf3]">
          Solution
        </h2>

        <Select
          label="Language"
          value={form.language}
          onChange={(event) =>
            updateField(
              "language",
              event.target.value
            )
          }
          options={[
            {
              label: "JavaScript",
              value: "JavaScript",
            },
            {
              label: "TypeScript",
              value: "TypeScript",
            },
            {
              label: "Python",
              value: "Python",
            },
            {
              label: "Java",
              value: "Java",
            },
            {
              label: "C++",
              value: "C++",
            },
          ]}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-[#e6edf3]">
            Approach
          </label>

          <textarea
            value={form.approach}
            onChange={(event) =>
              updateField(
                "approach",
                event.target.value
              )
            }
            rows={6}
            placeholder="Explain the approach..."
            className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-3 text-sm leading-6 text-[#e6edf3] outline-none placeholder:text-[#6e7681] focus:border-[#58a6ff]"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Time Complexity"
            value={form.timeComplexity}
            placeholder="O(n)"
            onChange={(event) =>
              updateField(
                "timeComplexity",
                event.target.value
              )
            }
          />

          <Input
            label="Space Complexity"
            value={form.spaceComplexity}
            placeholder="O(n)"
            onChange={(event) =>
              updateField(
                "spaceComplexity",
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#e6edf3]">
            Code
          </label>

          <textarea
            value={form.code}
            onChange={(event) =>
              updateField(
                "code",
                event.target.value
              )
            }
            rows={20}
            spellCheck={false}
            placeholder="Write your solution here..."
            className="w-full rounded-md border border-[#30363d] bg-[#1e1e1e] px-4 py-4 font-mono text-sm leading-7 text-[#d4d4d4] outline-none placeholder:text-[#6e7681] focus:border-[#58a6ff]"
          />
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : isEditMode
            ? "Update Problem"
            : "Save Problem"}
        </Button>
      </div>
    </form>
  );
}