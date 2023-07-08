import React from "react";
import { motion } from "framer-motion";

export default function Facebook() {
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
          fill: '#bfdbfe',
        }}
        transition={{
          duration: 0.5,
        }}
        initial={{
          fill: 'none',
        }}
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </motion.svg>
    </div>
  );
}
