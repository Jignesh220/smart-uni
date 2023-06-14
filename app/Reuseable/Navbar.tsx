"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SvgIcon from "./SvgIcon";
interface Searchprops {
  index: number;
  category: string;
  name: string;
  url: string;
  tag: string;
}

const menuItems = [
  {
    name: "Category",
    href: "/#Category",
  },
  {
    name: "About",
    href: "/about-us",
  },
  {
    name: "Contact",
    href: "/contact-us",
  },
];

export function Navbar() {
  const Router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Searchprops[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    setSearchTerm(term);

    const filteredSuggestions = Search.filter((searchTerm) =>
      searchTerm.tag.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 500);
  };

  return (
    <div className="relative w-full bg-blue-200 bg-opacity-20">
      <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8 md:flex-row min-[0px]:flex-col flex-wrap gap-2">
        <Link href="/" aria-label="Home">
          <div className="inline-flex items-center space-x-2">
            <span>
              <SvgIcon />
            </span>
            <div className="text-sm font-outfit md:hidden min-[0px]:block">
              UniSmart
            </div>
          </div>
        </Link>
        <div className="block">
          <ul className="inline-flex md:space-x-8">
            {menuItems.map((item) => (
              <li key={item.name} className="my-auto min-[0px]:hidden md:block">
                <a
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-800/75"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <div className="w-auto flex items-center h-auto">
                <form action="" className="my-auto">
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="relative"
                  >
                    <label className="sr-only" htmlFor="search">
                      {" "}
                      Search{" "}
                    </label>

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
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="h-10 rounded-full border-none bg-purple-200 focus:border-2 hover:border-purple-400 outline-purple-700 pe-10 ps-4 text-sm shadow-sm"
                      id="search"
                      type="search"
                      placeholder="Search"
                      autoComplete="off"
                      value={searchTerm}
                      onChange={handleChange}
                    />

                    
                  </motion.div>
                  {isFocused && suggestions.length > 0 && (
                    <motion.div
                      initial={{
                        scale: 0,
                        opacity: 0,
                        width: "0px",
                      }}
                      animate={
                        isFocused && suggestions.length > 0
                          ? {
                              scale: 1,
                              opacity: 1,
                              width: "350px",
                            }
                          : { scale: 0, opacity: 0, width: "0px" }
                      }
                      transition={{
                        delay: 0.3,
                      }}
                      className="absolute z-10 md:max-h-96 min-[0px]:max-h-80 overflow-auto scrollbar-search bg-purple-100 border border-purple-300 rounded-md shadow-md mt-2"
                    >
                      {suggestions.map((item) => (
                        <Link href={item.url} key={item.index}>
                          <div className="p-2 cursor-pointer hover:bg-purple-200">
                            <div className="font-outfit text-sm text-purple-900">
                              <div className="font-bold">{item.name}</div>
                              <div className="text-xs font-normal text-purple-700/75">
                                {item.category}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}

                  {isFocused && !(suggestions.length > 0) && (
                    <motion.div
                      initial={{
                        scale: 0,
                        opacity: 0,
                        width: "0px",
                      }}
                      animate={
                        isFocused && suggestions.length > 0
                          ? {
                              scale: 1,
                              opacity: 1,
                              width: "350px",
                            }
                          : { scale: 0, opacity: 0, width: "0px" }
                      }
                      transition={{
                        delay: 0.3,
                      }}
                      className="absolute z-10 md:max-h-96 min-[0px]:max-h-80 overflow-auto scrollbar-search bg-purple-100 border border-purple-300 rounded-xl shadow-md mt-2 w-96"
                    >
                      {Search.map((item) => (
                        <Link href={item.url} key={item.index}>
                          <div className="p-2 cursor-pointer hover:bg-purple-200 font-outfit rounded-xl">
                            <div className="font-outfit text-purple-900 text-base font-bold tracking-wider">
                              <div className="">{item.name}</div>
                              <div className="text-xs font-normal text-purple-700/75">
                                {item.category}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const Search: Searchprops[] = [
  {
    index: 1,
    name: "B.Sc",
    category: "Degree",
    url: "bsc",
    tag: "bsc degree old paper notes semester 1 2 3 4 5 6",
  },
  {
    index: 2,
    name: "M.Sc",
    category: "Degree",
    url: "/msc",
    tag: "msc degree old paper notes project guide semester 1 2 3 4",
  },
  {
    index: 3,
    name: "Old Paper",
    category: "old Paper",
    url: "/category/oldPaper",
    tag: "bsc msc degree old paper semester 1 2 3 4 5 6",
  },
  {
    index: 4,
    name: "Notes",
    category: "notes",
    url: "/category/notes",
    tag: "bsc msc degree notes semester 1 2 3 4 5 6",
  },
  {
    index: 5,
    name: "Project Guide",
    category: "Project Guide (M.Sc)",
    url: "/category/notes",
    tag: "msc degree notes semester 1 2 3 4 5 6",
  },
  {
    index: 6,
    name: "B.Sc Semester 1",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-1",
    tag: "bsc old paper 1",
  },
  {
    index: 7,
    name: "B.Sc Semester 2",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-2",
    tag: "bsc old paper 2",
  },
  {
    index: 9,
    name: "B.Sc Semester 3",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-3",
    tag: "bsc old paper 3",
  },
  {
    index: 10,
    name: "B.Sc Semester 4",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-4",
    tag: "bsc old paper 4",
  },
  {
    index: 11,
    name: "B.Sc Semester 5",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-5",
    tag: "bsc old paper 5",
  },
  {
    index: 12,
    name: "B.Sc Semester 6",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-6",
    tag: "bsc old paper 6",
  },
  {
    index: 13,
    name: "M.Sc Semester 1",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-1",
    tag: "msc old paper 1",
  },
  {
    index: 14,
    name: "M.Sc Semester 2",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-2",
    tag: "msc old paper 2",
  },
  {
    index: 15,
    name: "M.Sc Semester 3",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-3",
    tag: "msc old paper 3",
  },
  {
    index: 16,
    name: "M.Sc Semester 4",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-4",
    tag: " msc old paper 4",
  },
  // notes
  {
    index: 17,
    name: "B.Sc Semester 1",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-1",
    tag: "bsc notes 1",
  },
  {
    index: 18,
    name: "B.Sc Semester 2",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-2",
    tag: "bsc notes 2",
  },
  {
    index: 19,
    name: "B.Sc Semester 3",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-3",
    tag: "bsc notes 3",
  },
  {
    index: 20,
    name: "B.Sc Semester 4",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-4",
    tag: "bsc notes 4",
  },
  {
    index: 21,
    name: "B.Sc Semester 5",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-5",
    tag: "bsc notes 5",
  },
  {
    index: 22,
    name: "B.Sc Semester 6",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-6",
    tag: "bsc notes 6",
  },
  {
    index: 23,
    name: "M.Sc Semester 1",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-1",
    tag: "bsc notes 1",
  },
  {
    index: 24,
    name: "M.Sc Semester 2",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-2",
    tag: "msc notes 2",
  },
  {
    index: 25,
    name: "M.Sc Semester 3",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-3",
    tag: "msc notes 3",
  },
  {
    index: 26,
    name: "M.Sc Semester 4",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-4",
    tag: "msc notes 4",
  },
  {
    index: 27,
    name: "M.Sc Semester 4",
    category: "Project Guide",
    url: "/category/notes/MasterOfScience/semester-4",
    tag: "msc project guide 4",
  },
  {
    index: 28,
    name: "B.Sc Semester 1",
    category: "B.Sc",
    url: "/bsc#1",
    tag: "bsc semester 1 sem 1",
  },
  {
    index: 29,
    name: "B.Sc Semester 2",
    category: "B.Sc",
    url: "/bsc#2",
    tag: "bsc semester 2 sem 2",
  },
  {
    index: 30,
    name: "B.Sc Semester 3",
    category: "B.Sc",
    url: "/bsc#3",
    tag: "bsc semester 3 sem 3",
  },
  {
    index: 31,
    name: "B.Sc Semester 4",
    category: "B.Sc",
    url: "/bsc#4",
    tag: "bsc semester 4 sem 4",
  },
  {
    index: 32,
    name: "B.Sc Semester 5",
    category: "B.Sc",
    url: "/bsc#5",
    tag: "bsc semester 5 sem 5",
  },
  {
    index: 33,
    name: "B.Sc Semester 6",
    category: "B.Sc",
    url: "/bsc#6",
    tag: "bsc semester 6 sem 6",
  },
  {
    index: 33,
    name: "M.Sc Semester 1",
    category: "M.Sc",
    url: "/msc#1",
    tag: "msc semester 1 sem 1",
  },
  {
    index: 32,
    name: "M.Sc Semester 2",
    category: "M.Sc",
    url: "/msc#2",
    tag: "msc semester 2 sem 2",
  },
  {
    index: 33,
    name: "M.Sc Semester 3",
    category: "M.Sc",
    url: "/msc#3",
    tag: "msc semester 3 sem 3",
  },
  {
    index: 34,
    name: "M.Sc Semester 4",
    category: "M.Sc",
    url: "/msc#4",
    tag: "msc semester 4 sem 4",
  },
];
