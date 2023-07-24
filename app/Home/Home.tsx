"use client";

import React from "react";
import Image from "next/image";
import Avtar from "../../images/home_cover_3.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          ease: "easeInOut",
        }}
        className="min-w-full h-auto flex justify-center items-center lg:px-8 min-[0px]:px-2 mt-5 text-center z-0"
      >
        <motion.div
          initial={{
            background:
              "linear-gradient(to bottom right, rgb(96 165 250) 70%,rgb(37 99 235), rgb(30 64 175 ),",
          }}
          animate={{
            background:
              "linear-gradient(to bottom right,rgb(30 64 175), rgb(29 78 216) ,rgb(96 165 250) 90%)",
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="min-w-full flex flex-col lg:gap-2 min-[0px]:gap-1 lg:py-40 min-[0px]:py-16 text-blue-200 rounded-3xl lg:px-64 md:px-20 min-[0px]:px-2"
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="lg:text-6xl md:text-6xl min-[0px]:text-2xl font-bold font-capriola tracking-tight"
          >
            From notes to success
          </motion.div>
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="lg:text-6xl md:text-6xl min-[0px]:text-2xl font-bold font-capriola tracking-tight"
          >
            Ace your exams with our comprehensive resource hub.
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
