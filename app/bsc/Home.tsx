"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "@/app/Firebase/Firebase";
import PreviewPage from "./PreviewPage";
import Link from "next/link";
import Footer from "../Reuseable/Footer";
import Modal from "../Reuseable/Model";
import { useSearchParams } from "next/navigation";

const SemesterNumberArray = [
  {
    index: 1,
    title: "Semester 1",
    url: "/bsc?s=1",
  },
  {
    index: 2,
    title: "Semester 2",
    url: "/bsc?s=2",
  },
  {
    index: 3,
    title: "Semester 3",
    url: "/bsc?s=3",
  },
  {
    index: 4,
    title: "Semester 4",
    url: "/bsc?s=4",
  },
  {
    index: 5,
    title: "Semester 5",
    url: "/bsc?s=5",
  },
  {
    index: 6,
    title: "Semester 6",
    url: "/bsc?s=6",
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
  const searchParams = useSearchParams();
  const sem = searchParams.get("s") || "1";
  const [Semester, setSemester] = useState<string | null>(null);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<
    "syllabus" | "notes" | "oldPaper" | "assignment"
  >("syllabus");

  React.useEffect(() => {
    getOldPaperData();
  }, [db]);

  React.useEffect(() => {
    if (sem) {
      setSemester(sem);
    }
  }, [Semester, sem]);

  const [SubjectData, setSubjectData] = React.useState<DocumentData[]>([]);
  const [ArrayIndex, setArrayIndex] = useState(0);

  const getOldPaperData = async () => {
    setSubjectData([]);
    const ref = `/allData/govind_guru/BachelorOfScience`;
    const oldpaperInformation = collection(db, ref);
    const Mysnapshort = await getDocs(oldpaperInformation);
    Mysnapshort.forEach(async (doc) => {
      setSubjectData((arr) => [...arr, doc.data()]);
    });
  };

  const openModel = () => {
    setIsModelOpen(true);
  };
  const closeModel = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="relative">
      <div className="absolute min-h-full min-w-full md:px-32 px-2 mt-5">
        <div className="md:text-start text-center text-5xl font-capriola font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-700">
          B.Sc
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
            Category{" "}
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
        <div className="bg-white h-[69.5vh] overflow-hidden overflow-y-scroll p-2 scrollbar-hidden">
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
                    scale: 1.05,
                    backgroundColor: "rgb(243 232 255)",
                  }}
                  transition={{
                    delay: SubjectData.findIndex((i) => i.id === item.id) / 100,
                    type: "spring",
                  }}
                  key={item.id}
                  onClick={() => {
                    openModel();
                    setArrayIndex(
                      SubjectData.findIndex((i) => i.id === item.id)
                    );
                  }}
                  className="md:min-w-[10rem] cursor-pointer w-[11.2rem] md:max-w-[12rem] min-h-auto p-4 rounded-2xl relative shadow-2xl shadow-slate-200 border border-purple-700 bg-purple-50"
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
                    <div className="text-black font-outfit font-bold tracking-wider">
                      {item.mainSubject.split(/(?=[A-Z])/).join(" ")}
                    </div>
                    <div className="text-black font-outfit font-bold tracking-wider">
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
      <Modal
        variants="custome"
        className="bg-white min-w-[97vw]"
        isOpen={isModelOpen}
        onClose={closeModel}
      >
        <PreviewPage
          university={SubjectData[ArrayIndex]?.university}
          degree={SubjectData[ArrayIndex]?.degree}
          mainSubject={SubjectData[ArrayIndex]?.mainSubject}
          subject={SubjectData[ArrayIndex]?.subject}
          semester={SubjectData[ArrayIndex]?.semester}
          subjectCode={SubjectData[ArrayIndex]?.subjectCode}
          url={SubjectData[ArrayIndex]?.fileURL}
          documentYear={SubjectData[ArrayIndex]?.DocumentYear}
          category={SubjectData[ArrayIndex]?.category}
          fileName={SubjectData[ArrayIndex]?.fileName}
        />
      </Modal>
    </div>
  );
}
