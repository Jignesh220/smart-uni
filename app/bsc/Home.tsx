"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import PreviewPage from "./PreviewPage";
import { uuidv4 } from "@firebase/util";
import Link from "next/link";
import Footer from "../Reuseable/Footer";

export default function Home() {
  const [popupBox, setpopupBox] = useState(false);
  const [SemesterNumber, setSemesterNumber] = useState(0);
  const [textvisible, settextvisible] = useState({
    semester1: false,
    semester2: false,
    semester3: false,
    semester4: false,
    semester5: false,
    semester6: false,
  });
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const fragmentIdentifier = window.location.hash.slice(1);
      setSemesterNumber(parseInt(fragmentIdentifier));
    }
  }, []);
  const [Semester, setSemester] = useState<string | null>(null);
  React.useEffect(() => {
    getOldPaperData();
  }, [Semester]);

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
      {!popupBox && (
        <div className="absolute min-h-full min-w-full">
          <div className="text-center text-6xl font-capriola font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-700">
            Semester
          </div>
          <div className="flex justify-center flex-row gap-1">
            <div className="flex justify-center flex-row gap-2 mt-8">
              <Link href="/bsc#1">
                <motion.div
                  onHoverStart={() => {
                    settextvisible({ ...textvisible, semester1: true });
                  }}
                  onHoverEnd={() => {
                    settextvisible({ ...textvisible, semester1: false });
                  }}
                  onClick={() => {
                    setSemester("1");
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
              </Link>
            </div>
            <div className="flex justify-center flex-row gap-2 mt-8">
              <Link href="/bsc#2">
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
              </Link>
            </div>
            <div className="flex justify-center flex-row gap-2 mt-8">
              <Link href="/bsc#3">
                <motion.div
                  onHoverStart={() => {
                    settextvisible({ ...textvisible, semester3: true });
                  }}
                  onHoverEnd={() => {
                    settextvisible({ ...textvisible, semester3: false });
                  }}
                  onClick={() => {
                    setSemester("3");
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
              </Link>
            </div>
            <div className="flex justify-center flex-row gap-2 mt-8">
              <Link href="/bsc#4">
                <motion.div
                  onHoverStart={() => {
                    settextvisible({ ...textvisible, semester4: true });
                  }}
                  onHoverEnd={() => {
                    settextvisible({ ...textvisible, semester4: false });
                  }}
                  onClick={() => {
                    setSemester("4");
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
              </Link>
            </div>
            <div className="flex justify-center flex-row gap-2 mt-8">
              <Link href="/bsc#5">
                <motion.div
                  onHoverStart={() => {
                    settextvisible({ ...textvisible, semester5: true });
                  }}
                  onHoverEnd={() => {
                    settextvisible({ ...textvisible, semester5: false });
                  }}
                  onClick={() => {
                    setSemester("5");
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
              </Link>
            </div>
            <div className="flex justify-center flex-row gap-2 mt-8">
              <Link href="/bsc#6">
                <motion.div
                  onHoverStart={() => {
                    settextvisible({ ...textvisible, semester6: true });
                  }}
                  onHoverEnd={() => {
                    settextvisible({ ...textvisible, semester6: false });
                  }}
                  onClick={() => {
                    setSemester("6");
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
              </Link>
            </div>
          </div>
          <center className="my-5 px-48">
            <hr />
          </center>
          {!Semester && (
            <div
              style={{
                minHeight: "50vh",
              }}
            ></div>
          )}
          {Semester && (
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={
                SubjectData.length !== 0
                  ? {
                      scale: 1,
                    }
                  : {}
              }
              className="mt-5 min-h-full"
            >
              <div className="min-h-min min-w-full ">
                <div className="grid grid-cols-12 md:gap-4 min-[0px]:gap-2 md:mx-8 min-[0px]:mx-1 md:p-3 min-[0px]:p-2 bg-white rounded-3xl">
                  <div className="md:col-span-1 min-[0px]:col-span-2 h-auto bg-cyan-200 rounded-3xl flex justify-center items-center">
                    <div className="-rotate-90 text-cyan-900 text-opacity-60 md:text-4xl min-[0px]:text-lg font-bold font-capriola whitespace-nowrap">
                      Syllabus
                    </div>
                  </div>
                  <div className="md:col-span-11 min-[0px]:col-span-10 h-auto bg-cyan-200 rounded-3xl md:p-5 min-[0px]:p-2">
                    <div className="flex overflow-x-scroll hide-scroll-bar">
                      <div
                        className="flex flex-nowrap"
                        style={{
                          minHeight: "208px",
                        }}
                      >
                        {SubjectData.filter(
                          (arrayItem) =>
                            arrayItem.category === "syllabus" &&
                            arrayItem.semester === `semester_${Semester}`
                        ).length === 0 && (
                          <div className="text-start font-outfit text-red-500  text-2xl">
                            {" "}
                            <div className="">Notes Not Found</div>
                            <div className="">
                              Please feel free to submit a request through our
                              &#39;
                              <Link
                                href="/contact-us"
                                className="text-cyan-500 hover:underline hover:underline-offset-3"
                              >
                                Contact Us
                              </Link>
                              &#39; page for Request a Document.
                            </div>{" "}
                          </div>
                        )}
                        {SubjectData.filter(
                          (arrayItem) =>
                            arrayItem.category === "syllabus" &&
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
                                scale: 0.98,
                              }}
                              whileTap={{
                                scale: 0.9,
                              }}
                              transition={{
                                ease: "easeInOut",
                                delay: 0.1,
                              }}
                              onClick={() => {
                                setpopupBox(true);
                                setArrayIndex(
                                  SubjectData.findIndex((i) => i.id === item.id)
                                );
                              }}
                              className="w-60 h-96 max-w-xs cursor-pointer overflow-hidden rounded-3xl shadow-md bg-cyan-900 text-cyan-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-center items-center flex-col"
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
            </motion.div>
          )}
          {Semester && (
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={
                SubjectData.length !== 0
                  ? {
                      scale: 1,
                    }
                  : {}
              }
              className="mt-5 min-h-full"
            >
              <div className="min-h-min min-w-full ">
                <div className="grid grid-cols-12 md:gap-4 min-[0px]:gap-2 md:mx-8 min-[0px]:mx-1 md:p-3 min-[0px]:p-2 bg-white rounded-3xl">
                  <div className="md:col-span-1 min-[0px]:col-span-2 h-auto bg-purple-200 rounded-3xl flex justify-center items-center">
                    <div className="-rotate-90 text-purple-900 text-opacity-60 md:text-4xl min-[0px]:text-lg font-bold font-capriola whitespace-nowrap">
                      Notes
                    </div>
                  </div>
                  <div className="md:col-span-11 min-[0px]:col-span-10 h-auto bg-purple-200 rounded-3xl md:p-5 min-[0px]:p-2">
                    <div className="flex overflow-x-scroll hide-scroll-bar">
                      <div
                        className="flex flex-nowrap"
                        style={{
                          minHeight: "208px",
                        }}
                      >
                        {SubjectData.filter(
                          (arrayItem) =>
                            arrayItem.category === "notes" &&
                            arrayItem.semester === `semester_${Semester}`
                        ).length === 0 && (
                          <div className="text-start font-outfit text-red-500  text-2xl">
                            {" "}
                            <div className="">Notes Not Found</div>
                            <div className="">
                              Please feel free to submit a request through our
                              &#39;
                              <Link
                                href="/contact-us"
                                className="text-purple-500 hover:underline hover:underline-offset-3"
                              >
                                Contact Us
                              </Link>
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
                                scale: 0.98,
                              }}
                              whileTap={{
                                scale: 0.9,
                              }}
                              transition={{
                                ease: "easeInOut",
                                delay: 0.1,
                              }}
                              onClick={() => {
                                setpopupBox(true);
                                setArrayIndex(
                                  SubjectData.findIndex((i) => i.id === item.id)
                                );
                              }}
                              className="w-60 h-96 max-w-xs cursor-pointer overflow-hidden rounded-3xl shadow-md bg-purple-900 text-purple-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-center items-center flex-col"
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
            </motion.div>
          )}
          {Semester && (
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={
                SubjectData.length !== 0
                  ? {
                      scale: 1,
                    }
                  : {}
              }
              className="mt-5 min-h-full "
            >
              <div className="min-h-min min-w-full ">
                <div className="grid grid-cols-12 md:gap-4 min-[0px]:gap-2 md:mx-8 min-[0px]:mx-1 md:p-3 min-[0px]:p-2 bg-white rounded-3xl">
                  <div className="md:col-span-1 min-[0px]:col-span-2 h-auto bg-teal-200 rounded-3xl flex justify-center items-center">
                    <div className="-rotate-90 text-teal-900 text-opacity-40 md:text-4xl min-[0px]:text-lg font-bold font-capriola whitespace-nowrap">
                      Old Paper
                    </div>
                  </div>
                  <div className="md:col-span-11 min-[0px]:col-span-10 h-auto bg-teal-200 rounded-3xl md:p-5 min-[0px]:p-2">
                    <div className="flex overflow-x-scroll hide-scroll-bar">
                      <div
                        className="flex flex-nowrap justify-center"
                        style={{
                          minHeight: "208px",
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
                              Please feel free to submit a request through our
                              &#39;
                              <Link
                                href="/contact-us"
                                className="text-blue-500 hover:underline hover:underline-offset-3"
                              >
                                Contact Us
                              </Link>
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
                                scale: 0.97,
                              }}
                              whileTap={{
                                scale: 0.9,
                              }}
                              transition={{
                                duration: 0.1,
                                ease: "easeInOut",
                              }}
                              onClick={() => {
                                setpopupBox(true);
                                setArrayIndex(
                                  SubjectData.findIndex((i) => i.id === item.id)
                                );
                              }}
                              className="w-60 h-96 max-w-xs overflow-hidden rounded-2xl shadow-md bg-teal-700 text-teal-300 hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-center items-center flex-col"
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
            </motion.div>
          )}
          <div className="mb-16"></div>
          <Footer />
        </div>
      )}

      {popupBox && (
        <div
          className="absolute min-h-full min-w-full bg-purple-100"
          style={{
            minHeight: "92vh",
          }}
        >
          <div
            className="absolute right-4 top-3 cursor-pointer"
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
      )}
    </div>
  );
}
