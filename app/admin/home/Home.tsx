import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const adminItem = [
  {
    index: 1,
    title: "Add",
    url: "/admin/add",
  },
  {
    index: 1,
    title: "Update",
    url: "#",
  },
  {
    index: 1,
    title: "Remove",
    url: "#",
  },
];

export default function Home() {
  return (
    <div>
      <div className="min-h-screen pt-2">
        <div className="text-center font-bold font-capriola text-3xl text-black mt-24">
          Admin
        </div>
        <div className="flex min-w-full justify-center mt-8 px-2">
          <div className="gap-4 flex flex-row flex-wrap justify-center">
            {adminItem.map((item) => (
              <Link href={item.url} key={item.index}>
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="lg:w-60 lg:h-32 min-[0px]:w-44 min-[0px]:h-28 shadow-xl shadow-slate-500 bg-emerald-300 rounded-2xl flex justify-center items-center"
                >
                  <div className="text-base font-outfit font-bold tracking-wide">
                    {item.title}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
