"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Searchprops {
  index: number;
  category: string;
  name: string;
  url: string;
  tag:string;
}

const menuItems = [
  {
    name: "Category",
    href: "/#Category",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact-us",
  },
];

const EmptyArry: [] = [];

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Searchprops[]>([]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    setSearchTerm(term);

    const filteredSuggestions = Search.filter((searchTerm) =>
      searchTerm.tag.toLowerCase().includes(term.toLowerCase())
    );
    term.length <= 0
      ? setSuggestions(EmptyArry)
      : setSuggestions(filteredSuggestions);
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8 md:flex-row min-[0px]:flex-col gap-2">
        <Link href="/">
          <div className="inline-flex items-center space-x-2">
            <span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="font-bold">UniSmart</span>
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
                        width: "384px",
                      }}
                      transition={{
                        delay: 0.2,
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="h-10 rounded-full border-none bg-purple-100 focus:border-2 hover:border-purple-400 outline-purple-700 pe-10 ps-4 text-sm shadow-sm"
                      id="search"
                      type="search"
                      placeholder="Search"
                      autoComplete="off"
                      value={searchTerm}
                      onChange={handleChange}
                    />

                    <motion.button
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.1,
                      }}
                      type="button"
                      className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                    >
                      <span className="sr-only">Search</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </motion.button>
                  </motion.div>
                  {isFocused && suggestions.length > 0 ? (
                    <div className="absolute md:max-h-96 min-[0px]:max-h-80 overflow-auto scrollbar-search bg-purple-100 border border-purple-300 rounded-md shadow-md mt-2 w-96">
                      {suggestions.map((country) => (
                        <div
                          key={country.index}
                          className="p-2 cursor-pointer hover:bg-purple-200"
                          onClick={() => {
                            setSuggestions(EmptyArry);
                          }}
                        >
                          <Link
                            href={country.url}
                            className="font-outfit text-sm text-purple-900"
                          >
                            <div className="font-bold">{country.name}</div>
                            <div className="text-xs font-normal text-purple-700/75">
                              {country.category}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="">
                      {isFocused && (
                        <div className="absolute md:max-h-96 min-[0px]:max-h-80 overflow-auto scrollbar-search bg-purple-100 border border-purple-300 rounded-xl shadow-md mt-2 w-96">
                          {Search.map((country) => (
                            <div
                              key={country.index}
                              className="p-2 cursor-pointer hover:bg-purple-200 font-outfit rounded-xl"
                              onClick={() => {
                                setSuggestions(EmptyArry);
                              }}
                            >
                              <Link
                                href={country.url}
                                className="font-outfit text-purple-900 text-base font-bold tracking-wider"
                              >
                                <div className="">{country.name}</div>
                                <div className="text-xs font-normal text-purple-700/75">
                                  {country.category}
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
    url: "/bsc",
    tag: 'bsc degree old paper notes semester 1 2 3 4 5 6'
  },
  {
    index: 2,
    name: "M.Sc",
    category: "Degree",
    url: "/msc",
    tag: 'msc degree old paper notes project guide semester 1 2 3 4'
  },
  {
    index: 3,
    name: "Old Paper",
    category: "old Paper",
    url: "/category/oldPaper",
    tag: 'bsc msc degree old paper semester 1 2 3 4 5 6'
  },
  {
    index: 4,
    name: "Notes",
    category: "notes",
    url: "/category/notes",
    tag: 'bsc msc degree notes semester 1 2 3 4 5 6'
  },
  {
    index: 5,
    name: "Project Guide",
    category: "Project Guide (M.Sc)",
    url: "/category/notes",
    tag: 'msc degree notes semester 1 2 3 4 5 6'
  },
  {
    index: 6,
    name: "B.Sc Semester 1",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-1",
    tag: 'bsc old paper 1'
  },
  {
    index: 7,
    name: "B.Sc Semester 2",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-2",
    tag: 'bsc old paper 2'
  },
  {
    index: 9,
    name: "B.Sc Semester 3",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-3",
    tag: 'bsc old paper 3'
  },
  {
    index: 10,
    name: "B.Sc Semester 4",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-4",
    tag: 'bsc old paper 4'
  },
  {
    index: 11,
    name: "B.Sc Semester 5",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-5",
    tag: 'bsc old paper 5'
  },
  {
    index: 12,
    name: "B.Sc Semester 6",
    category: "old paper",
    url: "/category/oldPaper/BachelorOfScience/semester-6",
    tag: 'bsc old paper 6'
  },
  {
    index: 13,
    name: "M.Sc Semester 1",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-1",
    tag: 'msc old paper 1'
  },
  {
    index: 14,
    name: "M.Sc Semester 2",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-2",
    tag: 'msc old paper 2'
  },
  {
    index: 15,
    name: "M.Sc Semester 3",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-3",
    tag: 'msc old paper 3'
  },
  {
    index: 16,
    name: "M.Sc Semester 4",
    category: "old paper",
    url: "/category/oldPaper/MasterOfScience/semester-4",
    tag: ' msc old paper 4'
  },
  // notes
  {
    index: 17,
    name: "B.Sc Semester 1",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-1",
    tag: 'bsc notes 1'
  },
  {
    index: 18,
    name: "B.Sc Semester 2",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-2",
    tag: 'bsc notes 2'
  },
  {
    index: 19,
    name: "B.Sc Semester 3",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-3",
    tag: 'bsc notes 3'
  },
  {
    index: 20,
    name: "B.Sc Semester 4",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-4",
    tag: 'bsc notes 4'
  },
  {
    index: 21,
    name: "B.Sc Semester 5",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-5",
    tag: 'bsc notes 5'
  },
  {
    index: 22,
    name: "B.Sc Semester 6",
    category: "notes",
    url: "/category/notes/BachelorOfScience/semester-6",
    tag: 'bsc notes 6'
  },
  {
    index: 23,
    name: "M.Sc Semester 1",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-1",
    tag: 'bsc notes 1'
  },
  {
    index: 24,
    name: "M.Sc Semester 2",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-2",
    tag: 'msc notes 2'
  },
  {
    index: 25,
    name: "M.Sc Semester 3",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-3",
    tag: 'msc notes 3'
  },
  {
    index: 26,
    name: "M.Sc Semester 4",
    category: "notes",
    url: "/category/notes/MasterOfScience/semester-4",
    tag: 'msc notes 4'
  },
  {
    index: 27,
    name: "M.Sc Semester 4",
    category: "Project Guide",
    url: "/category/notes/MasterOfScience/semester-4",
    tag: 'msc project guide 4'
  },
  {
    index: 28,
    name: "B.Sc Semester 1",
    category: "B.Sc",
    url: "/bsc#1",
    tag: 'bsc semester 1 sem 1'
  },
  {
    index: 29,
    name: "B.Sc Semester 2",
    category: "B.Sc",
    url: "/bsc#2",
    tag: 'bsc semester 2 sem 2'
  },
  {
    index: 30,
    name: "B.Sc Semester 3",
    category: "B.Sc",
    url: "/bsc#3",
    tag: 'bsc semester 3 sem 3'
  },
  {
    index: 31,
    name: "B.Sc Semester 4",
    category: "B.Sc",
    url: "/bsc#4",
    tag: 'bsc semester 4 sem 4'
  },
  {
    index: 32,
    name: "B.Sc Semester 5",
    category: "B.Sc",
    url: "/bsc#5",
    tag: 'bsc semester 5 sem 5'
  },
  {
    index: 33,
    name: "B.Sc Semester 6",
    category: "B.Sc",
    url: "/bsc#6",
    tag: 'bsc semester 6 sem 6'
  },
  {
    index: 33,
    name: "M.Sc Semester 1",
    category: "M.Sc",
    url: "/msc#1",
    tag: 'msc semester 1 sem 1'
  },
  {
    index: 32,
    name: "M.Sc Semester 2",
    category: "M.Sc",
    url: "/msc#2",
    tag: 'msc semester 2 sem 2'
  },
  {
    index: 33,
    name: "M.Sc Semester 3",
    category: "M.Sc",
    url: "/msc#3",
    tag: 'msc semester 3 sem 3'
  },
  {
    index: 34,
    name: "M.Sc Semester 4",
    category: "M.Sc",
    url: "/msc#4",
    tag: 'msc semester 4 sem 4'
  },
];
