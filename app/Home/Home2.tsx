"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";

export default function Home2() {
  return (
    <div>
      <div className="min-w-full min-h-full md:px-20 min-[0px]:px-2 py-4">
        <div
          className="min-w-full relative"
          style={{
            minHeight: "80vh",
          }}
        >
          <div className="absolute min-h-full min-w-full grid grid-cols-12 gap-4 overflow-visible">
            <div className="min-h-full min-w-full relative overflow-visible col-span-12 ">
              {/* <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                }}
                className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 blur-3xl"
              >
                <div className="md:h-80 md:w-80 min-[0px]:h-44 min-[0px]:w-44 blur-3xl rounded-full shadow-2xl shadow-pink-300 bg-pink-300 "></div>
              </motion.div> */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                }}
                className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 blur-3xl"
              >
                <div className="md:h-80 md:w-80 min-[0px]:h-44 min-[0px]:w-44 rounded-full blur-3xl shadow-2xl shadow-cyan-400 bg-cyan-400"></div>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                }}
                className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 blur-3xl"
              >
                <div className="md:h-80 md:w-80 min-[0px]:h-44 min-[0px]:w-44 rounded-full blur-3xl shadow-2xl shadow-purple-300 bg-purple-300"></div>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                }}
                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 blur-3xl"
              >
                <div className="md:h-80 md:w-80 min-[0px]:h-44 min-[0px]:w-44 rounded-full shadow-2xl blur-3xl backdrop-blur-sm shadow-green-300 bg-green-300"></div>
              </motion.div>
              <div className="absolute min-h-full min-w-full grid grid-cols-12 bg-transparent gap-4 overflow-visible">
                <div className="col-span-12 bg-transparent">
                  <div className="min-h-full mt-16 min-w-full flex justify-center items-center">
                    <div className="md:text-7xl min-[0px]:text-5xl text-center flex flex-col gap-3 text-black font-semibold font-krylon tracking-wide">
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                        }}
                        className=""
                      >
                        From notes to success Ace your exams
                      </motion.div>
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        transition={{
                          delay: 0.4,
                          type: "spring",
                        }}
                        className=""
                      >
                        with our comprehensive
                      </motion.div>
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                        }}
                        className=""
                      >
                        resource hub
                      </motion.div>
                    </div>
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
