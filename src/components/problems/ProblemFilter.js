"use client";

import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

export default function ProblemFilter({
  filters,
  setFilters,
}) {
  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
  <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4 sm:p-5">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div className="sm:col-span-2 xl:col-span-2">
        <Input
          label="Search"
          placeholder="Search problems..."
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
        />
      </div>

      <Select
        label="Difficulty"
        value={filters.difficulty}
        onChange={(event) =>
          updateFilter("difficulty", event.target.value)
        }
        options={[
          { label: "All", value: "" },
          { label: "Easy", value: "Easy" },
          { label: "Medium", value: "Medium" },
          { label: "Hard", value: "Hard" },
        ]}
      />

      <Select
        label="Topic"
        value={filters.topic}
        onChange={(event) =>
          updateFilter("topic", event.target.value)
        }
        options={[
          { label: "All", value: "" },
          { label: "Array", value: "Array" },
          { label: "String", value: "String" },
          { label: "HashMap", value: "HashMap" },
          { label: "Stack", value: "Stack" },
          { label: "Queue", value: "Queue" },
          { label: "Linked List", value: "Linked List" },
          { label: "Tree", value: "Tree" },
          { label: "Graph", value: "Graph" },
          { label: "Recursion", value: "Recursion" },
        ]}
      />

      <Select
        label="Language"
        value={filters.language}
        onChange={(event) =>
          updateFilter("language", event.target.value)
        }
        options={[
          { label: "All", value: "" },
          { label: "JavaScript", value: "JavaScript" },
          { label: "TypeScript", value: "TypeScript" },
          { label: "Python", value: "Python" },
          { label: "Java", value: "Java" },
          { label: "C++", value: "C++" },
        ]}
      />

      <Select
        label="Sort"
        value={filters.sort}
        onChange={(event) =>
          updateFilter("sort", event.target.value)
        }
        options={[
          { label: "Newest", value: "newest" },
          { label: "Oldest", value: "oldest" },
          { label: "Title A-Z", value: "title-asc" },
          { label: "Title Z-A", value: "title-desc" },
        ]}
      />
    </div>
  </div>
);
}