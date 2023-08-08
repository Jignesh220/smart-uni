"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "@/app/Firebase/Firebase";
import PreviewPage from "../bsc/PreviewPage";
import { uuidv4 } from "@firebase/util";
import Link from "next/link";
import Footer from "../Reuseable/Footer";

const SemesterNumberArray = [
  {
    index: 1,
    title: "Semester 1",
    url: "/msc#1",
  },
  {
    index: 2,
    title: "Semester 2",
    url: "/msc#2",
  },
  {
    index: 3,
    title: "Semester 3",
    url: "/msc#3",
  },
  {
    index: 4,
    title: "Semester 4",
    url: "/msc#4",
  },
];
interface CategoryProps {
  index: number;
  title: string;
  url: "syllabus" | "notes" | "oldPaper" | "assignment";
}
const categoryArray: CategoryProps[] = [
  {
    index: 1,
    title: "Syllabus",
    url: "syllabus",
  },
  {
    index: 2,
    title: "Notes",
    url: "notes",
  },
  {
    index: 3,
    title: "Exam Papers",
    url: "oldPaper",
  },
  {
    index: 4,
    title: "Assignment",
    url: "assignment",
  },
];
export default function Home() {
  const [popupBox, setpopupBox] = useState(false);
  const [SemesterNumber, setSemesterNumber] = useState(0);
  const [Semester, setSemester] = useState<string | null>(null);
  const [category, setCategory] = useState<
    "syllabus" | "notes" | "oldPaper" | "assignment"
  >("syllabus");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const fragmentIdentifier = window.location.hash.slice(1);
      setSemesterNumber(parseInt(fragmentIdentifier));
    }
  }, []);

  React.useEffect(() => {
    getOldPaperData();
  }, [Semester, db]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (SemesterNumber > 0 && SemesterNumber <= 6) {
        setSemester(window.location.hash.slice(1));
      }
    }
  }, [SemesterNumber]);

  const [SubjectData, setSubjectData] = React.useState<DocumentData[]>([]);
  const [ArrayIndex, setArrayIndex] = useState(0);

  const getOldPaperData = async () => {
    if (Semester) {
      while (SubjectData.length > 0) {
        SubjectData.pop();
      }
      const ref = `/allData/govind_guru/MasterOfScience`;
      const oldpaperInformation = collection(db, ref);
      const Mysnapshort = await getDocs(oldpaperInformation);
      Mysnapshort.forEach(async (doc) => {
        setSubjectData((arr) => [...arr, doc.data()]);
      });
    }
  };

  return (
    <div className="relative">
      {!popupBox && (
        <div className="absolute min-h-full min-w-full md:px-32 px-2 mt-5">
          <div className="md:text-start text-center text-5xl font-capriola font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-700">
            M.Sc
          </div>
          <div className="my-2 pe-40 hidden md:block">
            <hr />
          </div>
          <div className="flex md:justify-start justify-center flex-row md:gap-4 gap-2 flex-wrap mt-6">
            {SemesterNumberArray.map((item) => (
              <Link
                href={item.url}
                key={item.index}
                onClick={() => {
                  setSemester(item.index.toString());
                }}
                className={`flex justify-center cursor-pointer flex-row md:gap-3 gap-2 shadow-xl shadow-slate-200 rounded-xl ${
                  Semester && Semester === item.index.toString()
                    ? "bg-purple-200"
                    : "bg-white"
                } hover:bg-purple-100 border border-black/10 md:p-4 p-2`}
              >
                <div className="my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:w-6 w-4"
                  >
                    <path d="M8 17h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.93a2 2 0 0 1-1.66-.9l-.82-1.2a2 2 0 0 0-1.66-.9H8a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2Z" />
                    <path d="M2 8v11c0 1.1.9 2 2 2h14" />
                  </svg>
                </div>
                <div className="md:text-sm text-xs my-auto font-outfit font-bold tracking-wider">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="my-auto text-sm font-outfit font-bold tracking-wider block md:hidden mt-4 mb-2 text-center">
            category :{" "}
          </div>
          <div className="flex md:justify-start justify-center flex-row gap-2 flex-wrap mb-6 md:mt-6">
            <div className="my-auto text-sm font-outfit font-bold tracking-wider hidden md:block">
              Category :{" "}
            </div>
            {categoryArray.map((item) => (
              <div
                key={item.index}
                onClick={() => {
                  setCategory(item.url);
                }}
                className={`flex cursor-pointer justify-center flex-row gap-2 rounded-full shadow-xl shadow-slate-200 ${
                  category === item.url ? "bg-purple-200" : "bg-white"
                } hover:bg-purple-100 border border-black/10 p-2 px-4`}
              >
                <div className="my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4"
                  >
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg>
                </div>
                <div className="text-xs my-auto font-outfit font-bold tracking-wider">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white min-h-[70vh] overflow-hidden overflow-y-scroll p-2 scrollbar-hidden">
            {Semester && (
              <div className="flex md:justify-start justify-center flex-row md:gap-2 gap-2 flex-wrap">
                {SubjectData.filter(
                  (arrayItem) =>
                    arrayItem.category === category &&
                    arrayItem.semester === `semester_${Semester}`
                ).length === 0 && (
                  <div className="text-start font-outfit text-black tracking-wider">
                    {" "}
                    <div className="capitalize">{category} Not Found</div>
                    <div className="">
                      Want a {category} file ?, Request a document on{" "}
                      <Link
                        href="/contact-us"
                        className="text-cyan-500 hover:underline hover:underline-offset-3"
                      >
                        Contact Us
                      </Link>
                      {" page"}
                    </div>
                  </div>
                )}
                {SubjectData.filter(
                  (arrayItem) =>
                    arrayItem.category === category &&
                    arrayItem.semester === `semester_${Semester}`
                ).map((item) => (
                  <motion.div
                  initial={{
                    y: 100,
                    opacity: 0,
                  }}
                  whileInView={{
                    y: 0,
                    opacity: 1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    delay: SubjectData.findIndex((i) => i.id === item.id)/100,
                    type:"spring"
                  }}
                    key={item.id}
                    onClick={() => {
                      setpopupBox(true);
                      setArrayIndex(
                        SubjectData.findIndex((i) => i.id === item.id)
                      );
                    }}
                    className="md:min-w-[10rem] cursor-pointer w-[11.2rem] md:max-w-[12rem] min-h-auto p-4 rounded-2xl relative shadow-2xl shadow-slate-200 border border-purple-700 bg-purple-50/40"
                  >
                    <div className="absolute top-3 left-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1 min-h-fit justify-start items-start mt-12">
                      <div className="text-black/60 underline-offset-2 underline capitalize text-xs font-outfit font-bold tracking-wider">
                        {category}
                      </div>
                      <div className="text-black my-1 font-outfit font-bold tracking-wider">
                        {item.mainSubject.split(/(?=[A-Z])/).join(" ")}
                      </div>
                      <div className="text-black my-1 font-outfit font-bold tracking-wider">
                        {item.subject.split(/(?=[A-Z])/).join(" ")}
                      </div>
                      <div className="text-black font-outfit font-bold tracking-wider">
                        [ {item.subjectCode.split("_").join(" ")} ]
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-16"></div>
          <Footer />
        </div>
      )}

      {popupBox && (
        <div className="absolute min-h-[100vh] min-w-full flex justify-center items-center md:py-0 py-4">
          <div className="md:min-w-[95vw] min-w-[98vw] min-h-[95vh] bg-purple-200 rounded-3xl py-2">
            <div
              className="absolute md:right-9 right-1 md:top-3 top-2 cursor-pointer"
              onClick={() => {
                setpopupBox(false);
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                xlinkTitle="close"
              >
                <rect fill="white" fill-opacity="0.01" height="48" width="48" />
                <path
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                  stroke-linejoin="round"
                  stroke-width="4"
                  className="fill-purple-900 stroke-purple-400 animate-pulse"
                />
                <path
                  d="M29.6569 18.3431L18.3432 29.6568"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                />
                <path
                  d="M18.3432 18.3431L29.6569 29.6568"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                />
              </svg>
            </div>
            <div className="md:mt-0 min-[0px]:mt-20">
              <PreviewPage
                university={SubjectData[ArrayIndex].university}
                degree={SubjectData[ArrayIndex].degree}
                mainSubject={SubjectData[ArrayIndex].mainSubject}
                subject={SubjectData[ArrayIndex].subject}
                semester={SubjectData[ArrayIndex].semester}
                subjectCode={SubjectData[ArrayIndex].subjectCode}
                url={SubjectData[ArrayIndex].fileURL}
                documentYear={SubjectData[ArrayIndex].DocumentYear}
                category="notes"
                fileName={SubjectData[ArrayIndex].fileName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
