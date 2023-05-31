"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import PreviewPage from "./PreviewPage";
import { uuidv4 } from "@firebase/util";
import Link from "next/link";

export default function Home() {
  const [popupBox, setpopupBox] = useState(false);
  const [textvisible, settextvisible] = useState({
    semester1: false,
    semester2: false,
    semester3: false,
    semester4: false,
    semester5: false,
    semester6: false,
  });
  const [Semester, setSemester] = useState<string | null>(null);
  React.useEffect(() => {
    getOldPaperData();
  }, [Semester]);

  const [SubjectData, setSubjectData] = React.useState<DocumentData[]>([]);
  const [ArrayIndex, setArrayIndex] = useState(0);

  const getOldPaperData = async () => {
    if (Semester) {
      while (SubjectData.length > 0) {
        SubjectData.pop();
      }
      const ref = `/allData/govind_guru/BachelorOfScience`;
      const oldpaperInformation = collection(db, ref);
      const Mysnapshort = getDocs(oldpaperInformation);
      (await Mysnapshort).forEach(async (doc) => {
        // console.log(doc.data());
        setSubjectData((arr) => [...arr, doc.data()]);
      });
    }
  };

  return (
    <div className="mt-5 relative">
      <div className="absolute min-h-full min-w-full">
        <div className="text-center text-6xl font-capriola font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-700">
          Semester
        </div>
        <div className="flex justify-center flex-row gap-2">
          <div className="flex justify-center flex-row gap-2 mt-8">
            <motion.div
              onClick={() => {
                setSemester("1");
              }}
              onHoverStart={() => {
                settextvisible({ ...textvisible, semester1: true });
              }}
              onHoverEnd={() => {
                settextvisible({ ...textvisible, semester1: false });
              }}
              className="mx-1 font-capriola flex items-center rounded-xl border border-blue-500 hover:bg-cyan-600 hover:text-white px-4 py-1 text-gray-900 gap-2 flex-row"
            >
              {textvisible.semester1 && (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={
                    textvisible.semester1
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  className="text-sm"
                >
                  Semester
                </motion.span>
              )}
              <span className="text-lg my-auto">1</span>
            </motion.div>
          </div>
          <div className="flex justify-center flex-row gap-2 mt-8">
            <motion.div
              onHoverStart={() => {
                settextvisible({ ...textvisible, semester2: true });
              }}
              onHoverEnd={() => {
                settextvisible({ ...textvisible, semester2: false });
              }}
              onClick={() => {
                setSemester("2");
              }}
              className="mx-1 font-capriola flex items-center rounded-xl border border-blue-500 hover:bg-cyan-600 hover:text-white px-4 py-1 text-gray-900 gap-2 flex-row"
            >
              {textvisible.semester2 && (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={
                    textvisible.semester2
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  className="text-sm"
                >
                  Semester
                </motion.span>
              )}
              <span className="text-lg my-auto">2</span>
            </motion.div>
          </div>
          <div className="flex justify-center flex-row gap-2 mt-8">
            <motion.div
              onHoverStart={() => {
                settextvisible({ ...textvisible, semester3: true });
              }}
              onHoverEnd={() => {
                settextvisible({ ...textvisible, semester3: false });
              }}
              className="mx-1 font-capriola flex items-center rounded-xl border border-blue-500 hover:bg-cyan-600 hover:text-white px-4 py-1 text-gray-900 gap-2 flex-row"
            >
              {textvisible.semester3 && (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={
                    textvisible.semester3
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  className="text-sm"
                >
                  Semester
                </motion.span>
              )}
              <span className="text-lg my-auto">3</span>
            </motion.div>
          </div>
          <div className="flex justify-center flex-row gap-2 mt-8">
            <motion.div
              onHoverStart={() => {
                settextvisible({ ...textvisible, semester4: true });
              }}
              onHoverEnd={() => {
                settextvisible({ ...textvisible, semester4: false });
              }}
              className="mx-1 font-capriola flex items-center rounded-xl border border-blue-500 hover:bg-cyan-600 hover:text-white px-4 py-1 text-gray-900 gap-2 flex-row"
            >
              {textvisible.semester4 && (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={
                    textvisible.semester4
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  className="text-sm"
                >
                  Semester
                </motion.span>
              )}
              <span className="text-lg my-auto">4</span>
            </motion.div>
          </div>
          <div className="flex justify-center flex-row gap-2 mt-8">
            <motion.div
              onHoverStart={() => {
                settextvisible({ ...textvisible, semester5: true });
              }}
              onHoverEnd={() => {
                settextvisible({ ...textvisible, semester5: false });
              }}
              className="mx-1 font-capriola flex items-center rounded-xl border border-blue-500 hover:bg-cyan-600 hover:text-white px-4 py-1 text-gray-900 gap-2 flex-row"
            >
              {textvisible.semester5 && (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={
                    textvisible.semester5
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  className="text-sm"
                >
                  Semester
                </motion.span>
              )}
              <span className="text-lg my-auto">5</span>
            </motion.div>
          </div>
          <div className="flex justify-center flex-row gap-2 mt-8">
            <motion.div
              onHoverStart={() => {
                settextvisible({ ...textvisible, semester6: true });
              }}
              onHoverEnd={() => {
                settextvisible({ ...textvisible, semester6: false });
              }}
              className="mx-1 font-capriola flex items-center rounded-xl border border-blue-500 hover:bg-cyan-600 hover:text-white px-4 py-1 text-gray-900 gap-2 flex-row"
            >
              {textvisible.semester6 && (
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={
                    textvisible.semester6
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  className="text-sm"
                >
                  Semester
                </motion.span>
              )}
              <span className="text-lg my-auto">6</span>
            </motion.div>
          </div>
        </div>
        <center className="my-5 px-48">
          <hr />
        </center>

        {Semester && (
          <div className="mt-5 min-h-full">
            <div className="min-h-min min-w-full ">
              <div className="grid grid-cols-12 gap-4 md:mx-8 min-[0px]:mx-2 md:p-3 min-[0px]:p-2 bg-blue-600 rounded-3xl">
                <div className="md:col-span-1 min-[0px]:col-span-2 h-auto bg-white rounded-3xl flex justify-center items-center">
                  <div className="-rotate-90 md:text-4xl min-[0px]:text-lg font-bold font-capriola whitespace-nowrap">
                    Notes
                  </div>
                </div>
                <div className="md:col-span-11 min-[0px]:col-span-10 h-auto bg-white rounded-3xl relative md:p-5 min-[0px]:p-2">
                  <div className="flex overflow-x-scroll hide-scroll-bar">
                    <div className="flex flex-nowrap" style={{
                      minHeight: '208px'
                    }}>
                    {SubjectData.filter(
                        (arrayItem) =>
                          arrayItem.category === "notes" &&
                          arrayItem.semester === `semester_${Semester}`
                      ).length === 0 && (
                        <div className="text-start font-outfit text-red-500  text-2xl">
                          {" "}
                          <div className="">Notes Not Found</div>
                          <div className="">
                            Please feel free to submit a request through our &#39;
                            <Link href="/contact-us" className="text-blue-500 hover:underline hover:underline-offset-3">Contact Us</Link>
                            &#39; page for Request a Document.
                          </div>{" "}
                        </div>
                      )}
                      {SubjectData.filter(
                        (arrayItem) =>
                          arrayItem.category === "notes" &&
                          arrayItem.semester === `semester_${Semester}`
                      ).map((item) => (
                        <div className="inline-block px-1" key={item.id}>
                          <motion.div
                            initial={{
                              scale: 0,
                            }}
                            animate={{
                              scale: 1,
                            }}
                            whileHover={{
                              // rotateY: 360,
                              scale: 1.04,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            transition={{
                              duration: 1,
                              ease: "easeInOut",
                            }}
                            onClick={() => {
                              setpopupBox(true);
                              setArrayIndex(
                                SubjectData.findIndex((i) => i.id === item.id)
                              );
                            }}
                            className="w-60 h-96 max-w-xs overflow-hidden rounded-2xl shadow-md bg-blue-700 text-blue-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-center items-center flex-col"
                          >
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.degree.split(/(?=[A-Z])/).join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.semester.split("_").join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.mainSubject.split(/(?=[A-Z])/).join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.subject.split(/(?=[A-Z])/).join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.subjectCode.split(/(?=[A-Z])/).join(" ")}
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {Semester && (
          <div className="mt-5 min-h-full ">
            <div className="min-h-min min-w-full ">
              <div className="grid grid-cols-12 gap-4 md:mx-8 min-[0px]:mx-2 md:p-3 min-[0px]:p-2 bg-blue-600 rounded-3xl">
                <div className="md:col-span-1 min-[0px]:col-span-2 h-auto bg-white rounded-3xl flex justify-center items-center">
                  <div className="-rotate-90 md:text-4xl min-[0px]:text-lg font-bold font-capriola whitespace-nowrap">
                    Old Paper
                  </div>
                </div>
                <div className="md:col-span-11 min-[0px]:col-span-10 h-auto bg-white rounded-3xl relative md:p-5 min-[0px]:p-2">
                  <div className="flex overflow-x-scroll hide-scroll-bar">
                    <div className="flex flex-nowrap justify-center"
                    style={{
                      minHeight: '208px'
                    }}
                    >
                      {SubjectData.filter(
                        (arrayItem) =>
                          arrayItem.category === "oldPaper" &&
                          arrayItem.semester === `semester_${Semester}`
                      ).length === 0 && (
                        <div className="text-start font-outfit text-red-500  text-2xl">
                          {" "}
                          <div className="">Old Paper Not Found</div>
                          <div className="">
                            Please feel free to submit a request through our &#39;
                            <Link href="/contact-us" className="text-blue-500 hover:underline hover:underline-offset-3">Contact Us</Link>
                            &#39; page for Request a Document.
                          </div>{" "}
                        </div>
                      )}
                      {SubjectData.filter(
                        (arrayItem) =>
                          arrayItem.category === "oldPaper" &&
                          arrayItem.semester === `semester_${Semester}`
                      ).map((item) => (
                        <div className="inline-block px-1" key={item.id}>
                          <motion.div
                            initial={{
                              scale: 0,
                            }}
                            animate={{
                              scale: 1,
                            }}
                            whileHover={{
                              // rotateY: 360,
                              scale: 1.04,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            transition={{
                              duration: 1,
                              ease: "easeInOut",
                            }}
                            onClick={() => {
                              setpopupBox(true);
                              setArrayIndex(
                                SubjectData.findIndex((i) => i.id === item.id)
                              );
                            }}
                            className="w-60 h-96 max-w-xs overflow-hidden rounded-2xl shadow-md bg-blue-700 text-blue-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-center items-center flex-col"
                          >
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.degree.split(/(?=[A-Z])/).join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.semester.split("_").join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.mainSubject.split(/(?=[A-Z])/).join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.subject.split(/(?=[A-Z])/).join(" ")}
                            </div>
                            <div className="text-lg font-outfit font-bold tracking-wider capitalize">
                              {item.subjectCode.split(/(?=[A-Z])/).join(" ")}
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {popupBox && (
        <div
          className="absolute min-w-full bg-blue-300"
          style={{
            minHeight: "90vh",
          }}
        >
          <div
            className="absolute right-4 top-3 cursor-pointer"
            onClick={() => {
              setpopupBox(false);
            }}
          >
            close
          </div>
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
      )}
    </div>
  );
}
