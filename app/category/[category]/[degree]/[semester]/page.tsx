"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { db } from "@/app/Firebase/Firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

const Colors = [
  "rgb(187 247 208)",
  "rgb(254 205 211)",
  "rgb(191 219 254)",
  "rgb(253 230 138)",
  "rgb(233 213 255)",
  "rgb(153 246 228)",
  "rgb(199 210 254)",
];
const TextColor = [
  "rgb(21 128 61)",
  "rgb(190 18 60)",
  "rgb(29 78 216)",
  "rgb(180 83 9)",
  "rgb(126 34 206",
  "rgb(15 118 110)",
  "rgb(67 56 202)",
];

export default function Page({
  params,
}: {
  params: { semester: string; degree: string; category: string };
}) {
  const [MainSubjectData, setMainSubjectData] = React.useState<DocumentData[]>(
    []
  );
  const [loaded, setloaded] = React.useState(false);
  const [degreeName, setdegreeName] = React.useState("");

  React.useEffect(() => {
    getBscData().then(() => {
      setloaded(true);
      if (params.degree === "BachelorOfScience") {
        setdegreeName("B.Sc");
      } else if (params.degree === "MasterOfScience") {
        setdegreeName("M.Sc");
      } else {
        setdegreeName(params.degree);
      }
    });
  }, [db]);

  const getBscData = async (): Promise<void> => {
    const ref = `/university/govind_guru/${
      params.degree
    }_semester_${params.semester.slice(9)}`;
    const bseInformation = collection(db, ref);
    const mySnapshot: QuerySnapshot = await getDocs(bseInformation);
    mySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setMainSubjectData((arr) => [...arr, doc.data()]);
    });
  };
  if (!loaded) {
    return (
      <div
        className="min-h-screen min-w-full flex justify-center items-center"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="text-3xl font-capriola font-bold text-white">
          <span className="loader"></span>
        </div>
      </div>
    );
  }
  if (MainSubjectData.length === 0) {
    return (
      <div className="min-w-full md:px-5 min-[0px]:px-2 py-4 flex justify-center">
        <div
          className="min-w-full rounded-3xl outline outline-offset-2 outline-2 outline-blue-500 bg-slate-50 flex justify-center"
          style={{
            minHeight: "90vh",
          }}
        >
          <div className="mt-8 flex flex-col md:gap-5 min-[0px]:gap-3 px-3">
            <div className="md:text-3xl min-[0px]:text-lg text-center font-capriola font-bold text-red-400/50 capitalize">
              The requested document was not found.
            </div>
            <div className="md:text-3xl min-[0px]:text-lg text-center font-capriola font-bold text-red-400/50">
              Please feel free to submit a request through our &#39;Contact Us&#39; page
              for Request a Document.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-w-full md:px-5 min-[0px]:px-2 py-4 flex justify-center">
      <div
        className="min-w-full rounded-3xl outline outline-offset-2 outline-2 outline-blue-500 bg-slate-50 md:pb-0 min-[0px]:pb-8"
        style={{
          minHeight: "90vh",
        }}
      >
        <div className="flex justify-center md:pt-8 min-[0px]:pt-5">
          <div className="flex flex-row md:gap-3 min-[0px]:gap-1 bg-blue-50 p-2 md:px-7 min-[0px]:px-3 rounded-full">
            <Link
              href="/"
              className="md:text-base min-[0px]:text-xs font-outfit text-blue-700 hover:underline underline-offset-4 my-auto"
            >
              Home
            </Link>
            <div className="h-auto flex items-center">
              <svg
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-4 min-[0px]:w-2 md:h-4 min-[0px]:h-2 my-auto"
              >
                <title />
                <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
              </svg>
            </div>
            <Link
              href="/#Category"
              className="md:text-base min-[0px]:text-xs font-outfit text-blue-700 hover:underline underline-offset-4 my-auto"
            >
              Category
            </Link>
            <div className="h-auto flex items-center">
              <svg
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-4 min-[0px]:w-2 md:h-4 min-[0px]:h-2 my-auto"
              >
                <title />
                <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
              </svg>
            </div>
            <Link
              href={`/category/${params.category}`}
              className="md:text-base min-[0px]:text-xs font-outfit text-blue-700 hover:underline underline-offset-4 my-auto"
            >
              {params.degree.split(/(?=[A-Z])/).join(" ")}
            </Link>
            <div className="h-auto flex items-center">
              <svg
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-4 min-[0px]:w-2 md:h-4 min-[0px]:h-2 my-auto"
              >
                <title />
                <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
              </svg>
            </div>
            <div className="md:text-base min-[0px]:text-xs font-outfit text-black my-auto flex flex-row gap-2">
              <span>Semester</span>
              <span>{params.semester.slice(9)}</span>
            </div>
          </div>
        </div>
        <div className="mt-16 min-w-full px-32">
          <div className="min-w-full flex flex-row flex-wrap justify-center gap-6">
            {MainSubjectData.map((item) => {
              const RandomIndex = Math.floor(Math.random() * 6);
              const colorThemeIndex = Colors[RandomIndex];
              const colorText = TextColor[RandomIndex];
              return (
                <Link
                  href={`/category/${params.category}/${params.degree}/${params.semester}/${item.url}`}
                  key={item.id}
                >
                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    whileInView={
                      loaded
                        ? {
                            scale: 1,
                            opacity: 1,
                          }
                        : {}
                    }
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{
                      delay:
                        (MainSubjectData.findIndex((i) => i.id === item.id) +
                          1) /
                        10,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundColor: colorThemeIndex,
                    }}
                    className={`group md:w-96 min-[0px]:w-80 md:h-36 min-[0px]:h-36 rounded-3xl flex justify-center items-center flex-col shadow-lg shadow-slate-400 relative overflow-hidden`}
                  >
                    <div
                      style={{
                        color: colorText,
                      }}
                      className={`text-2xl font-outfit absolute top-8 left-8`}
                    >
                      {item.mainSubject}
                    </div>
                    <div
                      style={{
                        color: colorText,
                        opacity: 0.3,
                      }}
                      className={`absolute bottom-2 right-4 text-8xl group-hover:text-7xl group-hover:transition group-hover:duration-150 group-hover:ease-in-out group-hover:delay-300 font-capriola`}
                    >
                      {MainSubjectData.findIndex((i) => i.id === item.id) + 1}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
