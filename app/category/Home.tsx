"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const BScSemesterCount = [
  {
    index: 1,
    title: "semester 1",
    url: "/category/bsc/semester-1",
  },
  {
    index: 2,
    title: "semester 2",
    url: "/category/bsc/semester-2",
  },
  {
    index: 3,
    title: "semester 3",
    url: "#",
  },
  {
    index: 4,
    title: "semester 4",
    url: "#",
  },
  {
    index: 5,
    title: "semester 5",
    url: "#",
  },
  {
    index: 6,
    title: "semester 6",
    url: "#",
  },
];
const MScSemesterCount = [
  {
    index: 1,
    title: "semester 1",
    url: "#",
  },
  {
    index: 2,
    title: "semester 2",
    url: "#",
  },
  {
    index: 3,
    title: "semester 3",
    url: "#",
  },
  {
    index: 4,
    title: "semester 4",
    url: "#",
  },
];

export default function Home() {
  return (
    <div>
      <div className="h-screen md:px-16 min-[0px]:px-3 mt-16">
        <div className="min-h-full">
          <div className="flex flex-col gap-5">
            <div className="min-h-max">
              <div className="flex lg:flex-row min-[0px]:flex-col items-center min-h-full gap-3 justify-center">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="md:w-72 min-[0px]:w-52 md:h-44 min-[0px]:h-32 bg-sky-800 text-white rounded-xl flex justify-center items-center flex-col shadow-xl shadow-slate-400"
                >
                  <div className="text-3xl font-capriola">B.Sc</div>
                  <div className="text-sm font-capriola">
                    Govind Guru University
                  </div>
                </motion.div>
                <div className="h-auto p-3">
                  <div className="flex flex-row flex-wrap gap-3 items-center min-h-full justify-center">
                    {BScSemesterCount.map((item) => (
                      <Link href={item.url} key={item.index}>
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.6,
                            // x: -100,
                          }}
                          whileInView={{
                            opacity: 1,
                            scale: 1,
                            // x: 0,
                            // rotate: 360,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: item.index / 10,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: 'rgb(253 164 175)'
                          }}
                          className="md:w-40 min-[0px]:w-32 md:h-24 min-[0px]:h-16 bg-sky-300 rounded-xl flex justify-center items-center flex-col shadow-lg shadow-slate-400"
                        >
                          <div className="text-sm font-capriola">
                            Semester{" "}
                            <span className="text-2xl">{item.index}</span>{" "}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="min-h-max">
              <div className="flex lg:flex-row-reverse min-[0px]:flex-col items-center min-h-full gap-3 justify-center">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="md:w-72 min-[0px]:w-52 md:h-44 min-[0px]:h-32 bg-sky-800 text-white rounded-xl flex justify-center items-center flex-col shadow-xl shadow-slate-400"
                >
                  <div className="text-3xl font-capriola">M.Sc</div>
                  <div className="text-sm font-capriola">
                    Govind Guru University
                  </div>
                </motion.div>
                <div className="h-auto p-3">
                  <div className="flex flex-row-reverse flex-wrap gap-3 items-center min-h-full justify-center">
                    {MScSemesterCount.map((item) => (
                      <Link href={item.url} key={item.index}>
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.6,
                            // x: -100,
                          }}
                          whileInView={{
                            opacity: 1,
                            scale: 1,
                            // x: 0,
                            // rotate: 360,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: item.index / 10,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: 'rgb(253 164 175)'
                          }}
                          className="md:w-40 min-[0px]:w-32 md:h-24 min-[0px]:h-16 bg-sky-300 rounded-xl flex justify-center items-center flex-col shadow-lg shadow-slate-400"
                        >
                          <div className="text-sm font-capriola">
                            Semester{" "}
                            <span className="text-2xl">{item.index}</span>{" "}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
