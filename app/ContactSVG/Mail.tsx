import React from "react";
import { motion } from "framer-motion";

export default function Mail() {
  return (
    <div>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-none"
        whileHover={{
          fill: '#fecaca',
        }}
        transition={{
          duration: 0.5,
        }}
        initial={{
          fill: 'none',
        }}
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </motion.svg>
    </div>
  );
}
