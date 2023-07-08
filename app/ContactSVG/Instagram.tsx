import React from "react";
import { motion } from "framer-motion";

export default function Instagram() {
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
          fill: '#fecdd3',
        }}
        transition={{
          duration: 0.5,
        }}
        initial={{
          fill: 'none',
        }}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </motion.svg>
    </div>
  );
}
