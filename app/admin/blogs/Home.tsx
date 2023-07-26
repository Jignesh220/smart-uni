import Link from "next/link";
import React, { useState } from "react";
import AddBlogs from "./AddBlogs";
import dynamic from "next/dynamic";
const DeleteBlog = dynamic(() => import("./DeleteBlog"), { ssr: false });

const Menu = [
  {
    index: 1,
    title: "Add Blog",
  },
  {
    index: 2,
    title: "Delete Blog",
  },
];

export default function Home() {
  const [indexAddBlogActive, setIndexAddBlogActive] = useState(1);
  return (
    <div className="min-h-screen">
      <div className="flex justify-center">
        <nav
          className="flex gap-1 bg-blue-200 p-1 rounded-xl"
          aria-label="Tabs"
        >
          {Menu.map((item) => (
            <div
              key={item.index}
              onClick={() => {
                setIndexAddBlogActive(item.index);
              }}
              className={`shrink-0 rounded-lg p-2 text-sm font-outfit tracking-wide ${
                indexAddBlogActive === item.index
                  ? "bg-white"
                  : "bg-transparent"
              } text-black font-bold hover:bg-blue-100 hover:text-gray-700`}
            >
              {item.title}
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-5">
        {indexAddBlogActive === 1 ? <AddBlogs /> : <DeleteBlog />}
      </div>
    </div>
  );
}
