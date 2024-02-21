"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SvgIcon from "./SvgIcon";
import SmoothScrollbar from "./SmoothScrollbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
    name: "Blog",
    href: "/blogs",
  },
  {
    name: "Contact",
    href: "/contact-us",
  },
];

export function Navbar() {
  const [user, loading] = useAuthState(auth);
  const Router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Searchprops[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    while (suggestions.length > 0) {
      suggestions.pop();
    }
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

  const Logout = () => {
    signOut(auth);
  };

  const [Error, setError] = useState("");
  const provider = new GoogleAuthProvider();
  const LoginRegisterWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="relative w-full bg-transparent backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8 flex-row flex-wrap gap-2">
        <Link href="/" aria-label="Home">
          <div className="inline-flex items-center space-x-2">
            <span>
              <SvgIcon />
            </span>
            {/* <div className="text-sm font-outfit md:hidden min-[0px]:block">
              UniSmart
            </div> */}
          </div>
        </Link>
        <div className="flex flex-row gap-2">
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.8,
            }}
            transition={{
              type: "spring",
            }}
            className="my-auto block md:hidden rounded-full text-white bg-blue-300 p-1 px-3 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            <Link href="/notes" className="text-xs font-semibold tracking-wide">
              Take a Note
            </Link>
          </motion.div>
          {!loading && (
            <div className="my-auto block md:hidden">
              {user ? (
                <motion.div
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  onClick={Logout}
                  className="my-auto cursor-pointer rounded-full text-white bg-blue-300 p-1 px-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"
                >
                  <div className="text-xs font-semibold tracking-wide text-gray-600">
                    Log Out
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  onClick={LoginRegisterWithGoogle}
                  className=" bg-white cursor-pointer my-auto p-1 px-3 flex flex-row gap-1 rounded-full border hover:border-2 border-gray-500 "
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <div className="my-auto">
                    <svg
                      enable-background="new 0 0 128 128"
                      id="Social_Icons"
                      version="1.1"
                      viewBox="0 0 128 128"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 my-auto"
                    >
                      <g id="_x31__stroke">
                        <g id="Google">
                          <rect
                            clip-rule="evenodd"
                            fill="none"
                            fill-rule="evenodd"
                            height="128"
                            width="128"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
                            fill="#FBBC05"
                            fill-rule="evenodd"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
                            fill="#EA4335"
                            fill-rule="evenodd"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
                            fill="#34A853"
                            fill-rule="evenodd"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
                            fill="#4285F4"
                            fill-rule="evenodd"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="font-bold text-black my-auto font-outfit text-xs">
                    Login
                  </div>
                </motion.div>
              )}
            </div>
          )}

          <Link href="/search" className="block md:hidden my-auto">
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
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
        </div>
        <ul className="md:space-x-4 min-[0px]:hidden md:inline-flex">
          {menuItems.map((item) => (
            <li key={item.name} className="my-auto ">
              <Link
                href={item.href}
                className="text-lg tracking-wide font-semibold text-gray-800 hover:text-gray-800/75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <motion.li
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.8,
            }}
            transition={{
              type: "spring",
            }}
            className="my-auto"
          >
            <Link
              href="/notes"
              className="text-lg underline underline-offset-4 font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r via-blue-700 from-pink-700 to-purple-700"
            >
              Take a Note
            </Link>
          </motion.li>

          <li>
            <Link href="/search" className="cursor-pointer">
              <motion.input
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                }}
                className="h-10 cursor-pointer rounded-full border-none bg-purple-200 focus:border-2 hover:border-purple-400 outline-purple-700 pe-4 ps-4 text-sm shadow-sm"
                id="search"
                type="search"
                placeholder="Search"
                autoComplete="off"
                disabled
              />
            </Link>
          </li>
          <li className="my-auto">
            <Dropdown />
          </li>
          {!loading && (
            <motion.div
              initial={{
                scale: 0,
              }}
              whileInView={{
                scale: 1,
              }}
              className="my-auto"
            >
              {user ? (
                <motion.li
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  onClick={Logout}
                  className="my-auto cursor-pointer rounded-full text-white bg-blue-300 p-2 px-6 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"
                >
                  <div className="text-xs font-semibold tracking-wide text-gray-600">
                    Log Out
                  </div>
                </motion.li>
              ) : (
                <motion.li
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  onClick={LoginRegisterWithGoogle}
                  className=" bg-white cursor-pointer my-auto p-2 px-6 flex flex-row gap-4 rounded-full border hover:border-2 border-gray-500 "
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <div className="">
                    <svg
                      enable-background="new 0 0 128 128"
                      id="Social_Icons"
                      version="1.1"
                      viewBox="0 0 128 128"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 my-auto"
                    >
                      <g id="_x31__stroke">
                        <g id="Google">
                          <rect
                            clip-rule="evenodd"
                            fill="none"
                            fill-rule="evenodd"
                            height="128"
                            width="128"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
                            fill="#FBBC05"
                            fill-rule="evenodd"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
                            fill="#EA4335"
                            fill-rule="evenodd"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
                            fill="#34A853"
                            fill-rule="evenodd"
                          />
                          <path
                            clip-rule="evenodd"
                            d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
                            fill="#4285F4"
                            fill-rule="evenodd"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="font-bold text-black my-auto font-outfit text-sm">
                    Login With Google
                  </div>
                </motion.li>
              )}
            </motion.div>
          )}
        </ul>
      </div>
      <div className="text-sm flex flex-row justify-center gap-4 mt-1 md:hidden">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="my-auto bg-slate-200 p-1 px-4 rounded-full"
          >
            <Link
              href={item.href}
              className="text-xs font-semibold text-gray-800 hover:text-gray-800/75"
            >
              {item.name}
            </Link>
          </div>
        ))}
        <Dropdown />
      </div>
      <div className="min-w-full bg-rose-800 text-center font-bold font-outfit tracking-wider text-white/75 p-2 z-[999]">
        This website is closed please visite new website <Link href={"https://syncnotes.vercel.app/"} className="text-white" target="_blank">https://syncnotes.vercel.app/</Link>
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

const Dropdown = () => {
  const Router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
    setTimeout(() => {
      closeDropdown();
    }, 3000);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="my-auto  z-50 inset-0">
      <div className="mx-auto flex justify-between items-center">
        <div className="relative">
          <motion.div
            initial={{
              scale: 0,
            }}
            whileInView={{
              scale: 1,
            }}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.8,
            }}
            transition={{
              type: "spring",
            }}
            onHoverStart={openDropdown}
            onClick={openDropdown}
            className="my-auto cursor-pointer rounded-full text-white bg-blue-300 md:p-2 md:px-6 p-1 px-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
          >
            <div className="text-sm font-semibold tracking-wide">Tools</div>
          </motion.div>
          {isDropdownOpen && (
            <div className="">
              <div className="block md:hidden">
                <div className="fixed inset-0 right-0 md:p-2 p-2 w-72 flex flex-col gap-1">
                  <motion.div
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => {
                      Router.push("/tools/add-watermark-to-pdf");
                    }}
                    className="py-2 cursor-pointer bg-gray-800 rounded-xl shadow-lg"
                  >
                    <div className="block cursor-pointer text-center px-4 py-2 text-white hover:text-gray-300 font-outfit tracking-wider md:text-sm text-xs">
                      Add Watermark to PDF
                    </div>
                  </motion.div>
                  <div className="py-2 cursor-pointer bg-gray-800 rounded-xl shadow-lg">
                    <div className="block cursor-pointer text-center px-4 py-2 text-red-200 hover:text-gray-300 font-outfit tracking-wider text-xs">
                      We are adding more tools...
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="absolute right-0 md:p-2 p-2 w-72 flex flex-col gap-1">
                  <motion.div
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => {
                      Router.push("/tools/add-watermark-to-pdf");
                    }}
                    className="py-2 cursor-pointer bg-gray-800 rounded-xl shadow-lg"
                  >
                    <div className="block cursor-pointer text-center px-4 py-2 text-white hover:text-gray-300 font-outfit tracking-wider md:text-sm text-xs">
                      Add Watermark to PDF
                    </div>
                  </motion.div>
                  <div className="py-2 cursor-pointer bg-gray-800 rounded-xl shadow-lg">
                    <div className="block cursor-pointer text-center px-4 py-2 text-red-200 hover:text-gray-300 font-outfit tracking-wider text-xs">
                      We are adding more tools...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
