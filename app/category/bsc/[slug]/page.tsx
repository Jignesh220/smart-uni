"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const SemesterData = [
  [
    {
      index: 1,
      title: "Chemistry101",
      url: "#",
    },
    {
      index: 2,
      title: "Physics101",
      url: "#",
    },
    {
      index: 3,
      title: "Maths101",
      url: "#",
    },
    {
      index: 4,
      title: "Botany101",
      url: "#",
    },
    {
      index: 5,
      title: "Microbiology101",
      url: "#",
    },
    {
      index: 6,
      title: "General English",
      url: "#",
    },
  ],
  [
    {
      index: 1,
      title: "Chemistry",
      url: "#",
    },
    {
      index: 2,
      title: "Physics",
      url: "#",
    },
    {
      index: 3,
      title: "Maths",
      url: "#",
    },
    {
      index: 4,
      title: "Botany",
      url: "#",
    },
    {
      index: 5,
      title: "Microbiology",
      url: "#",
    },
    {
      index: 6,
      title: "General English",
      url: "#",
    },
  ],
];

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="min-w-full flex justify-center mt-8">
        <motion.div 
        initial={{
            scale: 0,
            opacity: 0,
        }}
        whileInView={{
            scale:1,
            opacity: 1,
            rotate: 360,
        }}
        className="w-96 h-48 bg-cyan-900 rounded-3xl flex justify-center items-center flex-col gap-2 shadow-2xl shadow-slate-400">
          <div className="text-4xl text-white font-capriola">{params.slug}</div>
          <code className="text-sm text-white font-capriola">(B.Sc)</code>
        </motion.div>
      </div>
      <div className="mt-16 min-w-full px-32">
        <div className="min-w-full flex flex-row flex-wrap justify-center gap-3">
          {SemesterData[parseInt(params.slug.slice(9)) - 1].map((item) => (
            <Link href={item.url} key={item.index}>
              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: item.index / 10,
                  ease: "easeInOut",
                }}
                className="md:w-52 min-[0px]:w-36 md:h-28 min-[0px]:h-20 bg-sky-300 rounded-xl flex justify-center items-center flex-col shadow-lg shadow-slate-400"
              >
                <div className="text-lg font-capriola text-black">
                  {item.title}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
