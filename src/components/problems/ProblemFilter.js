// "use client";

// import Input from "@/components/common/Input";
// import Select from "@/components/common/Select";

// export default function ProblemFilter({
//   filters,
//   setFilters,
// }) {
//   const updateFilter = (name, value) => {
//     setFilters((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   return (
//   <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4 sm:p-5">
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//       <div className="sm:col-span-2 xl:col-span-2">
//         <Input
//           label="Search"
//           placeholder="Search problems..."
//           value={filters.search}
//           onChange={(event) =>
//             updateFilter("search", event.target.value)
//           }
//         />
//       </div>

//       <Select
//         label="Difficulty"
//         value={filters.difficulty}
//         onChange={(event) =>
//           updateFilter("difficulty", event.target.value)
//         }
//         options={[
//           { label: "All", value: "" },
//           { label: "Easy", value: "Easy" },
//           { label: "Medium", value: "Medium" },
//           { label: "Hard", value: "Hard" },
//         ]}
//       />

//       <Select
//         label="Topic"
//         value={filters.topic}
//         onChange={(event) =>
//           updateFilter("topic", event.target.value)
//         }
//         options={[
//           { label: "All", value: "" },
//           { label: "Array", value: "Array" },
//           { label: "String", value: "String" },
//           { label: "HashMap", value: "HashMap" },
//           { label: "Stack", value: "Stack" },
//           { label: "Queue", value: "Queue" },
//           { label: "Linked List", value: "Linked List" },
//           { label: "Tree", value: "Tree" },
//           { label: "Graph", value: "Graph" },
//           { label: "Recursion", value: "Recursion" },
//         ]}
//       />

//       <Select
//         label="Language"
//         value={filters.language}
//         onChange={(event) =>
//           updateFilter("language", event.target.value)
//         }
//         options={[
//           { label: "All", value: "" },
//           { label: "JavaScript", value: "JavaScript" },
//           { label: "TypeScript", value: "TypeScript" },
//           { label: "Python", value: "Python" },
//           { label: "Java", value: "Java" },
//           { label: "C++", value: "C++" },
//         ]}
//       />

//       <Select
//         label="Sort"
//         value={filters.sort}
//         onChange={(event) =>
//           updateFilter("sort", event.target.value)
//         }
//         options={[
//           { label: "Newest", value: "newest" },
//           { label: "Oldest", value: "oldest" },
//           { label: "Title A-Z", value: "title-asc" },
//           { label: "Title Z-A", value: "title-desc" },
//         ]}
//       />
//     </div>
//   </div>
// );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Input from "@/components/common/Input";

export default function ProblemFilter({
  filters,
  setFilters,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const abortControllerRef = useRef(null);

  /*
   * Fetch suggestions from database.
   */
  useEffect(() => {
    const search = filters.search.trim();

    // No API request for empty search
    if (!search) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        // Cancel previous request
        abortControllerRef.current?.abort();

        const controller = new AbortController();

        abortControllerRef.current = controller;

        setLoading(true);

        const response = await fetch(
          `/api/problems/suggestions?q=${encodeURIComponent(
            search
          )}`,
          {
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch suggestions"
          );
        }

        setSuggestions(result.data || []);
        setSelectedIndex(-1);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Failed to fetch suggestions:",
            error
          );

          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [filters.search]);

  /*
   * Cancel request when component unmounts.
   */
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  /*
   * Close suggestions when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Update search text.
   */
  const handleSearchChange = (event) => {
    const value = event.target.value;

    setFilters((previous) => ({
      ...previous,
      search: value,
    }));

    setSelectedIndex(-1);

    if (!value.trim()) {
      setSuggestions([]);
      setLoading(false);
      setIsOpen(false);

      abortControllerRef.current?.abort();

      return;
    }

    setIsOpen(true);
  };

  /*
   * Select suggestion.
   */
  const handleSelectSuggestion = (suggestion) => {
    setFilters((previous) => ({
      ...previous,
      search: suggestion,
    }));

    setSelectedIndex(-1);
    setIsOpen(false);
  };

  /*
   * Clear search.
   */
  const handleClear = () => {
    abortControllerRef.current?.abort();

    setFilters((previous) => ({
      ...previous,
      search: "",
    }));

    setSuggestions([]);
    setSelectedIndex(-1);
    setLoading(false);
    setIsOpen(false);
  };

  /*
   * Keyboard navigation.
   */
  const handleKeyDown = (event) => {
    if (!isOpen || !suggestions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((previous) =>
        previous < suggestions.length - 1
          ? previous + 1
          : 0
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((previous) =>
        previous > 0
          ? previous - 1
          : suggestions.length - 1
      );

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (selectedIndex >= 0) {
        handleSelectSuggestion(
          suggestions[selectedIndex]
        );
      }

      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg border border-[#30363d] bg-[#161b22] p-4 sm:p-5"
    >
      <div className="relative">
        <Input
          label="Search Problems"
          placeholder="Search by title, topic, language, or company..."
          value={filters.search}
          onChange={handleSearchChange}
          onFocus={() => {
            if (filters.search.trim()) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        />

        {filters.search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-[38px] flex h-6 w-6 items-center justify-center rounded text-sm text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3]"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen &&
        filters.search.trim() &&
        (loading || suggestions.length > 0) && (
          <div className="absolute left-4 right-4 top-[88px] z-50 overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117] shadow-xl sm:left-5 sm:right-5">
            <div className="border-b border-[#30363d] px-3 py-2">
              <p className="text-xs font-medium text-[#8b949e]">
                {loading
                  ? "Searching..."
                  : "Suggestions"}
              </p>
            </div>

            {!loading && suggestions.length > 0 && (
              <div className="max-h-64 overflow-y-auto py-1">
                {suggestions.map(
                  (suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();

                        handleSelectSuggestion(
                          suggestion
                        );
                      }}
                      className={`flex w-full items-center px-3 py-2.5 text-left text-sm transition ${
                        selectedIndex === index
                          ? "bg-[#21262d] text-[#e6edf3]"
                          : "text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3]"
                      }`}
                    >
                      <span className="mr-3 text-[#58a6ff]">
                        {index + 1}
                      </span>

                      <span className="truncate">
                        {suggestion}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        )}
    </div>
  );
}