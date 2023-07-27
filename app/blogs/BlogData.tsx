"use client";
import React, { useEffect } from "react";
import {
  doc,
  getDocs,
  collection,
  DocumentData,
  deleteDoc,
  Index,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Image from "next/image";
import Link from "next/link";
import { delay, motion } from "framer-motion";

export default function BlogData() {
  const [BlogData, setBlogData] = React.useState<DocumentData[]>([]);
  useEffect(() => {
    handleGetData();
  }, [db]);

  const handleGetData = async () => {
    const ref = `/blogs`;
    const contactInformation = collection(db, ref);
    const Mysnapshort = await getDocs(contactInformation);
    Mysnapshort.forEach(async (doc) => {
      setBlogData((arr) => [...arr, doc.data()]);
    });
  };
  return (
    <div className="min-w-full min-h-screen my-8">
      <div className="flex flex-row justify-center gap-6 flex-wrap">
        {BlogData.map((item) => (
          <Link href={`/blogs/${item.id}`} className="" key={item.id}>
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                delay: (BlogData.findIndex((i) => i.id === item.id) + 1) * 0.2,
              }}
              className="w-auto md:w-[28rem] min-[0px]:w-[22rem] pb-4 h-auto p-1 bg-purple-100 shadow-xl shadow-slate-300 rounded-2xl min-w-full justify-center flex flex-wrap flex-col gap-4"
            >
              <div className="md:w-[28rem] min-[0px]:w-[22rem] md:h-60 h-52 relative">
                <Image
                  src={item.coverImage}
                  alt="coverImage"
                  fill
                  className="rounded-2xl"
                />
              </div>
              <div className="px-4">
                <div className="font-outfit text-base text-center font-bold">
                  {item.title}
                </div>
                <div className="font-outfit text-sm text-center font-semibold mt-3 text-black/70">
                  {item.description}
                </div>
              </div>
            </motion.div>
            {/* <ReactQuill
              value={item.blogContent}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"], // toggled buttons
                  ["blockquote", "code-block"],

                  [{ header: 1 }, { header: 2 }], // custom button values
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }], // superscript/subscript
                  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                  [{ direction: "rtl" }], // text direction

                  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],

                  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                  [{ font: [] }],
                  [{ align: [] }],

                  ["clean"],
                ],
              }}
              readOnly={true}
              theme={"bubble"}
            ></ReactQuill> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
