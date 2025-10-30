// // components/SearchBar.tsx
// import { useState } from "react";
// import { projectsData } from "@/app/data/portfolioData";
// import { useRouter } from 'next/navigation';
// import { Search } from "lucide-react";


// interface TagResult {
//   name: string;
//   path: string | null;
//   mainPagePath: string;
// }

// const SearchBar: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<TagResult[]>([]);
//   const router = useRouter();

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value;
//   //   setQuery(value);

//   //   if (!value) {
//   //     setResults([]);
//   //     return;
//   //   }

//   //   const allTags: TagResult[] = projectsData.flatMap(project =>
//   //     project.tags.map(tag => ({
//   //       name: tag.name,
//   //       path: tag.path,
//   //       mainPagePath: tag.mainPagePath,
//   //     }))
//   //   );

//   //   const filtered = allTags.filter(tag =>
//   //     tag.name.toLowerCase().includes(value.toLowerCase())
//   //   );

//   //   setResults(filtered);
//   // };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value;
//   setQuery(value);

//   if (!value) {
//     setResults([]);
//     return;
//   }

//   const allTags: TagResult[] = projectsData.flatMap(project =>
//     project.tags.map(tag => ({
//       name: tag.name,
//       path: tag.path,
//       mainPagePath: tag.mainPagePath,
//       parentCategory: tag.parentCategoryName,
//       category: project.category,
//     }))
//   );

//   const filtered = allTags.filter(tag =>
//     tag.name.toLowerCase().includes(value.toLowerCase()) ||
//     tag.parentCategory.toLowerCase().includes(value.toLowerCase()) ||
//     tag.category.toLowerCase().includes(value.toLowerCase())
//   );

//   setResults(filtered);
// };


//   const handleClick = (tag: TagResult) => {
//     router.push(tag.path || tag.mainPagePath);
//     setQuery("");
//     setResults([]);
//   };

//   return (
//     <div className="w-full mx-auto relative">
//       {/* Search input with icon */}
//       <div className="relative">
//         <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//         <input
//           type="text"
//           value={query}
//           onChange={handleChange}
//           placeholder="Search services..."
//           className="w-full px-6 py-2 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#007BFF] focus:border-transparent pl-12"
//         />
//       </div>

//       {/* Dropdown */}
//       {/* {results.length > 0 && (
//         <ul className="top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
//           {results.map((tag, index) => (
//             <li
//               key={index}
//               className="flex items-center  px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
//               onClick={() => handleClick(tag)}
//             >

//               <Search className="w-4 h-4 mr-2 text-gray-400" />
//               {highlightMatch(tag.name, query)}
//             </li>
//           ))}
//         </ul>
//       )} */}

//       {/* Dropdown */}
// {query && (
//   <ul className="top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
//     {results.length > 0 ? (
//       results.map((tag, index) => (
//         <li
//           key={index}
//           className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
//           onClick={() => handleClick(tag)}
//         >
//           <Search className="w-4 h-4 mr-2 text-gray-400" />
//           {highlightMatch(tag.name, query)}
//         </li>
//       ))
//     ) : (
//       <li className="px-4 py-2 text-gray-500">No results found</li>
//     )}
//   </ul>
// )}

//     </div>
//   );
// };

// /** Highlight matching text like Google */
// function highlightMatch(text: string, query: string) {
//   const regex = new RegExp(`(${query})`, "gi");
//   const parts = text.split(regex);

//   return (
//     <>
//       {parts.map((part, i) =>
//         part.toLowerCase() === query.toLowerCase() ? (
//           <span key={i} className="font-semibold text-blue-600">
//             {part}
//           </span>
//         ) : (
//           <span key={i}>{part}</span>
//         )
//       )}
//     </>
//   );
// }

// export default SearchBar;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Settings, Mic, Camera } from "lucide-react";
import { projectsData } from "@/app/data/portfolioData";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TagResult {
  name: string;
  path: string;
  mainPagePath: string;
  parentCategoryName: string;
  category: string;
  snippet: string;
}

// ✅ Synonym dictionary for expanded searches
const SYNONYMS: Record<string, string[]> = {
  "brand identity": ["logo design", "business card design", "email signature design", "letter head design"],
  ecommerce: ["e-commerce", "online shop", "web store"],
  social: ["facebook design", "instagram design", "google advertising", "social media design"],
};

// Flatten all tags for easier searching
const ALL_TAGS: TagResult[] = projectsData.flatMap((project) =>
  project.tags.map((tag) => ({
    name: tag.name,
    path: tag.path || tag.mainPagePath,
    mainPagePath: tag.mainPagePath,
    parentCategoryName: tag.parentCategoryName,
    category: project.category,
    snippet: project.description || "",
  }))
);

// --- HELPER: Highlight matches ---
function highlightMatch(text: string, query: string) {
  if (!query) return <span>{text}</span>;
  const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex).filter((part) => part.length > 0);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="font-semibold text-blue-800 dark:text-blue-300">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// --- SEARCH BAR ---
interface SearchBarProps {
  initialQuery: string;
  isResultsPage?: boolean;
  onQueryChange: (query: string, results: TagResult[]) => void;
  onSearchExecute: (query: string) => void;
  dropdownResults: TagResult[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery,
  isResultsPage = false,
  onQueryChange,
  onSearchExecute,
  dropdownResults,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const runLiveSearch = useCallback(
    (value: string) => {
      if (!value) {
        onQueryChange(value, []);
        return;
      }

      const normalized = value.toLowerCase();
      const expandedQueries = [normalized, ...(SYNONYMS[normalized] || [])];

      const filtered = ALL_TAGS.filter((tag) =>
        expandedQueries.some(
          (q) =>
            tag.name.toLowerCase().includes(q) ||
            tag.parentCategoryName.toLowerCase().includes(q) ||
            tag.category.toLowerCase().includes(q)
        )
      ).slice(0, 7);

      onQueryChange(value, filtered);
    },
    [onQueryChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    runLiveSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchExecute(query);
      setIsFocused(false);
    }
  };

  const executeSearch = () => {
    if (query.trim()) {
      onSearchExecute(query);
      setIsFocused(false);
    }
  };

  const handleDropdownClick = (tag: TagResult) => {
    onSearchExecute(tag.name);
    setIsFocused(false);
  };

  const showDropdown = isFocused && query.length > 0 && !isResultsPage;

  return (
    <div className="w-full relative z-30">
      <div className={`relative flex items-center w-full ${isResultsPage ? "max-w-xl" : ""}`}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search services and solutions..."
          className={`w-full px-6 py-3 text-base border-2 ${isResultsPage ? "rounded-3xl" : "rounded-full"
            } border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-800 dark:text-white pl-12 shadow-md transition duration-200`}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1 sm:space-x-2 items-center">
          <button
            onClick={executeSearch}
            className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showDropdown && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl max-h-60 overflow-y-auto z-40 p-1">
          {dropdownResults.length > 0 ? (
            dropdownResults.map((tag, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition text-gray-800 dark:text-gray-200"
                onMouseDown={() => handleDropdownClick(tag)}
              >
                <Search className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                {highlightMatch(tag.name, query)}
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  in {tag.category.split(" / ")[0]}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No suggestions for "{query}"</li>
          )}
        </ul>
      )}
    </div>
  );
};

// --- SEARCH RESULTS ---
interface SearchResultsProps {
  query: string;
  results: TagResult[];
  onBackToSearch: (newQuery?: string) => void;
  onSearchExecute: (query: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onBackToSearch, onSearchExecute }) => {
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    router.push(path); // ✅ real SPA navigation
  };

  const ResultCard: React.FC<{ result: TagResult }> = ({ result }) => (
    <div className="mb-8 max-w-2xl text-left">
      <h2 className="text-xl text-blue-800 dark:text-blue-400 hover:underline cursor-pointer font-medium mt-0.5">
        <a href={result.path} onClick={(e) => handleLinkClick(e, result.path)}>
          {highlightMatch(result.name, query)}
        </a>
      </h2>
      <a
        href={result.path}
        onClick={(e) => handleLinkClick(e, result.path)}
        className="text-sm text-green-700 dark:text-green-400 block truncate"
      >
        {typeof window !== "undefined" &&
          `${window.location.origin}${result.mainPagePath}`} › {result.parentCategoryName}
      </a>
      <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{highlightMatch(result.snippet, query)}</p>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <Settings className="w-3 h-3 mr-1" />
        {result.category}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 pt-5 text-gray-800 dark:text-white">
      <main className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full pr-4">
            {results.length > 0 ? (
              results.map((result, index) => <ResultCard key={index} result={result} />)
            ) : (
              <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
                {/* <h3 className="text-xl font-semibold mb-2 text-red-500">No results found</h3> */}
                <p>
                  Your search  <span className="font-bold text-lg">"{query}"</span>  did not match any documents.
                </p>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="md:w-1/4 mt-10 md:mt-0 pt-1">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-40">
                <h3 className="text-lg font-semibold mb-3">Searches related to {query}</h3>
                <div className="flex flex-col gap-2">
                  {["Logo Design", "E-Commerce Development", "Flyer Design", "Social Media Design"].map((related, index) => (
                    <button
                      key={index}
                      onClick={() => onSearchExecute(related)}
                      className="text-sm text-left w-full px-3 py-1.5 text-blue-600 dark:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      {related}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useState("");
  const [liveResults, setLiveResults] = useState<TagResult[]>([]);
  const [executedQuery, setExecutedQuery] = useState<string | null>(null);
  const [finalResults, setFinalResults] = useState<TagResult[]>([]);

  const handleSearchExecute = useCallback((query: string) => {
    if (!query.trim()) {
      setExecutedQuery(null);
      return;
    }

    setExecutedQuery(query);

    const normalized = query.toLowerCase();
    const expandedQueries = [normalized, ...(SYNONYMS[normalized] || [])];

    const results = ALL_TAGS.filter((tag) =>
      expandedQueries.some(
        (q) =>
          tag.name.toLowerCase().includes(q) ||
          tag.parentCategoryName.toLowerCase().includes(q) ||
          tag.category.toLowerCase().includes(q) ||
          tag.snippet.toLowerCase().includes(q)
      )
    );

    setFinalResults(results);
    setCurrentQuery(query);
    setLiveResults([]);
  }, []);

  const handleLiveQueryChange = useCallback((query: string, results: TagResult[]) => {
    setCurrentQuery(query);
    setLiveResults(results);
  }, []);

  const handleBackToSearch = useCallback(
    (newQuery?: string) => {
      setExecutedQuery(null);
      setFinalResults([]);

      if (newQuery) {
        handleSearchExecute(newQuery);
      } else {
        setCurrentQuery("");
      }
    },
    [handleSearchExecute]
  );

  const isResultsView = executedQuery !== null;

  return (
    <div className="font-sans antialiased bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 🔹 Always visible search bar */}
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col  items-center justify-center">
          <SearchBar
            initialQuery={currentQuery}
            isResultsPage={isResultsView}   // tell SearchBar when it’s on results page
            onQueryChange={handleLiveQueryChange}
            onSearchExecute={handleSearchExecute}
            dropdownResults={liveResults}
          />
        </div>
      </div>

      {/* 🔹 Below it, conditionally render results */}
      {isResultsView && (
        <SearchResults
          query={executedQuery || ""}
          results={finalResults}
          onBackToSearch={handleBackToSearch}
          onSearchExecute={handleSearchExecute}
        />
      )}
    </div>
  );

};

export default App;
