"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function page() {
  const [query, setQuery] = useState("");
  const [Suggestion, setSuggestion] = useState<Searchprops[]>([]);
  const debounceQuery = useDebounceValue(query);
  const controller = new AbortController();
  useEffect(() => {
    const signal = controller.signal;
    setSuggestion([]);
    (async () => {
      if (debounceQuery.length > 0) {
        const data = await GetSuggetionResult(debounceQuery, signal);
        setSuggestion(data);
      }
    })();
    return () => controller.abort("cancel request");
  }, [debounceQuery]);
  return (
    <>
      <div className="min-h-fit min-w-full md:mt-8 mt-6">
        <center className="hidden md:block min-w-full">
          <motion.input
            initial={{
              width: "0px",
            }}
            animate={{
              width: "80%",
            }}
            whileFocus={{
              width: "90%",
            }}
            transition={{
              delay: 0.2,
              type: "spring",
            }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="h-12 pl-6 pr-8 rounded-full bg-purple-200 focus:outline-purple-700 outline-none pe-4 ps-4 text-sm shadow-sm"
            id="search"
            type="search"
            placeholder="Search"
            autoComplete="off"
            autoFocus
          />
        </center>
        <center className="block md:hidden">
          <motion.input
            initial={{
              width: "0px",
            }}
            animate={{
              width: "280px",
            }}
            whileFocus={{
              width: "350px",
            }}
            transition={{
              delay: 0.2,
              type: "spring",
            }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="h-10 rounded-full border-none bg-purple-200 focus:border-2 hover:border-purple-400 outline-purple-700 pe-4 ps-4 text-sm shadow-sm"
            id="search"
            type="search"
            placeholder="Search"
            autoComplete="off"
            autoFocus
          />
        </center>
        {Suggestion.length > 0 && (
          <div className="min-w-full min-h-fit flex justify-center rounded-3xl mt-3 relative">
            <ul
              className="absolute z-10 rounded-3xl overflow-auto scrollbar-search bg-purple-100 shadow-md mt-2"
              style={{
                width: "95%",
                height: "80vh",
              }}
            >
              {Suggestion.map((item) => (
                <Link href={item.url} key={item.index}>
                  <motion.div
                    initial={{
                      backgroundColor: "rgb(233 213 255)",
                    }}
                    whileHover={{
                      backgroundColor: "rgb(216 180 254)",
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className={`group my-auto min-w-full p-6 flex justify-between hover:border-2 hover:border-purple-400 hover:rounded-3xl`}
                  >
                    <div className="cursor-pointer font-outfit rounded-xl">
                      <div className="font-outfit text-purple-900 text-base font-bold tracking-wider">
                        <div className="">{item.name}</div>
                        <div className="text-xs font-normal text-purple-700/75">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-purple-500 group-hover:stroke-purple-900"
                    >
                      <path d="M13 5H19V11" />
                      <path d="M19 5L5 19" />
                    </svg>
                  </motion.div>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

function useDebounceValue(value: string, time: number = 250) {
  const [debouncevalue, setDebouncevalue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncevalue(value);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debouncevalue;
}

interface Searchprops {
  index: number;
  category: string;
  name: string;
  url: string;
  tag: string;
}

const GetSuggetionResult = (
  query: string,
  signal?: AbortSignal
): Promise<Searchprops[]> => {
  const Search = [
    {
      index: 1,
      name: "B.Sc",
      category: "Degree(BSc)",
      url: "/bsc",
      tag: "bsc b.sc degree old paper notes semester 1 2 3 4 5 6",
    },
    {
      index: 2,
      name: "M.Sc",
      category: "Degree(Msc)",
      url: "/msc",
      tag: "msc m.sc degree old paper notes project guide semester 1 2 3 4",
    },
    {
      index: 3,
      name: "Old Paper",
      category: "old Paper(BSc/MSc)",
      url: "/category/oldPaper",
      tag: "bsc b.sc m.sc msc degree old paper semester 1 2 3 4 5 6",
    },
    {
      index: 4,
      name: "Notes",
      category: "notes(BSc/MSc)",
      url: "/category/notes",
      tag: "bsc b.sc m.sc msc degree notes semester 1 2 3 4 5 6",
    },
    {
      index: 5,
      name: "Project Guide",
      category: "Project Guide (M.Sc)",
      url: "/category/notes",
      tag: "msc m.sc degree notes semester 1 2 3 4 5 6",
    },
    {
      index: 6,
      name: "B.Sc Semester 1",
      category: "old paper(BSc-1)",
      url: "/category/oldPaper/BachelorOfScience/semester-1",
      tag: "bsc b.sc old paper 1",
    },
    {
      index: 7,
      name: "B.Sc Semester 2",
      category: "old paper(BSc-1)",
      url: "/category/oldPaper/BachelorOfScience/semester-2",
      tag: "bsc b.sc old paper 2",
    },
    {
      index: 9,
      name: "B.Sc Semester 3",
      category: "old paper(BSc-3)",
      url: "/category/oldPaper/BachelorOfScience/semester-3",
      tag: "bsc b.sc old paper 3",
    },
    {
      index: 10,
      name: "B.Sc Semester 4",
      category: "old paper(BSc-4)",
      url: "/category/oldPaper/BachelorOfScience/semester-4",
      tag: "bsc b.sc old paper 4",
    },
    {
      index: 11,
      name: "B.Sc Semester 5",
      category: "old paper(BSc-5)",
      url: "/category/oldPaper/BachelorOfScience/semester-5",
      tag: "bsc b.sc old paper 5",
    },
    {
      index: 12,
      name: "B.Sc Semester 6",
      category: "old paper(BSc-6)",
      url: "/category/oldPaper/BachelorOfScience/semester-6",
      tag: "bsc b.sc old paper 6",
    },
    {
      index: 13,
      name: "M.Sc Semester 1",
      category: "old paper(MSc-1)",
      url: "/category/oldPaper/MasterOfScience/semester-1",
      tag: "msc m.sc old paper 1",
    },
    {
      index: 14,
      name: "M.Sc Semester 2",
      category: "old paper(MSc-2)",
      url: "/category/oldPaper/MasterOfScience/semester-2",
      tag: "msc m.sc  old paper 2",
    },
    {
      index: 15,
      name: "M.Sc Semester 3",
      category: "old paper(MSc-3)",
      url: "/category/oldPaper/MasterOfScience/semester-3",
      tag: "msc m.sc old paper 3",
    },
    {
      index: 16,
      name: "M.Sc Semester 4",
      category: "old paper(MSc-4)",
      url: "/category/oldPaper/MasterOfScience/semester-4",
      tag: " msc m.sc old paper 4",
    },
    // notes
    {
      index: 17,
      name: "B.Sc Semester 1",
      category: "notes(BSc-1)",
      url: "/category/notes/BachelorOfScience/semester-1",
      tag: "bsc b.sc notes 1",
    },
    {
      index: 18,
      name: "B.Sc Semester 2",
      category: "notes(BSc-2)",
      url: "/category/notes/BachelorOfScience/semester-2",
      tag: "bsc b.sc notes 2",
    },
    {
      index: 19,
      name: "B.Sc Semester 3",
      category: "notes(BSc-3)",
      url: "/category/notes/BachelorOfScience/semester-3",
      tag: "bsc b.sc notes 3",
    },
    {
      index: 20,
      name: "B.Sc Semester 4",
      category: "notes(BSc-4)",
      url: "/category/notes/BachelorOfScience/semester-4",
      tag: "bsc b.sc notes 4",
    },
    {
      index: 21,
      name: "B.Sc Semester 5",
      category: "notes(BSc-5)",
      url: "/category/notes/BachelorOfScience/semester-5",
      tag: "bsc b.sc notes 5",
    },
    {
      index: 22,
      name: "B.Sc Semester 6",
      category: "notes(BSc-6)",
      url: "/category/notes/BachelorOfScience/semester-6",
      tag: "bsc b.sc notes 6",
    },
    {
      index: 23,
      name: "M.Sc Semester 1",
      category: "notes(MSc-1)",
      url: "/category/notes/MasterOfScience/semester-1",
      tag: "bsc b.sc notes 1",
    },
    {
      index: 24,
      name: "M.Sc Semester 2",
      category: "notes(MSc-2)",
      url: "/category/notes/MasterOfScience/semester-2",
      tag: "msc m.sc notes 2",
    },
    {
      index: 25,
      name: "M.Sc Semester 3",
      category: "notes(MSc-3)",
      url: "/category/notes/MasterOfScience/semester-3",
      tag: "msc m.sc notes 3",
    },
    {
      index: 26,
      name: "M.Sc Semester 4",
      category: "notes(MSc-4)",
      url: "/category/notes/MasterOfScience/semester-4",
      tag: "msc m.sc notes 4",
    },
    {
      index: 27,
      name: "M.Sc Semester 4",
      category: "Project Guide(MSc-4)",
      url: "/category/notes/MasterOfScience/semester-4",
      tag: "msc m.sc project guide 4",
    },
    {
      index: 28,
      name: "B.Sc Semester 1 (BSc-1)",
      category: "B.Sc",
      url: "/bsc#1",
      tag: "bsc b.sc semester 1 sem 1",
    },
    {
      index: 29,
      name: "B.Sc Semester 2 (BSc-2)",
      category: "B.Sc",
      url: "/bsc#2",
      tag: "bsc b.sc semester 2 sem 2",
    },
    {
      index: 30,
      name: "B.Sc Semester 3 (BSc-3)",
      category: "B.Sc",
      url: "/bsc#3",
      tag: "bsc b.sc semester 3 sem 3",
    },
    {
      index: 31,
      name: "B.Sc Semester 4 (BSc-4)",
      category: "B.Sc",
      url: "/bsc#4",
      tag: "bsc b.sc semester 4 sem 4",
    },
    {
      index: 32,
      name: "B.Sc Semester 5 (BSc-5)",
      category: "B.Sc",
      url: "/bsc#5",
      tag: "bsc b.sc semester 5 sem 5",
    },
    {
      index: 33,
      name: "B.Sc Semester 6(BSc-6)",
      category: "B.Sc",
      url: "/bsc#6",
      tag: "bsc b.sc semester 6 sem 6",
    },
    {
      index: 33,
      name: "M.Sc Semester 1(MSc-1)",
      category: "M.Sc",
      url: "/msc#1",
      tag: "msc m.sc semester 1 sem 1",
    },
    {
      index: 32,
      name: "M.Sc Semester 2(MSc-2)",
      category: "M.Sc",
      url: "/msc#2",
      tag: "msc m.sc semester 2 sem 2",
    },
    {
      index: 33,
      name: "M.Sc Semester 3(MSc-3)",
      category: "M.Sc",
      url: "/msc#3",
      tag: "msc m.sc semester 3 sem 3",
    },
    {
      index: 34,
      name: "M.Sc Semester 4(MSc-4)",
      category: "M.Sc",
      url: "/msc#4",
      tag: "msc m.sc semester 4 sem 4",
    },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason);
      }
      resolve(
        Search.filter((searchTerm) =>
          searchTerm.tag.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
};
