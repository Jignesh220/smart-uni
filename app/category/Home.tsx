"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "@/app/Firebase/Firebase";
import PreviewPage from "../bsc/PreviewPage";
import { uuidv4 } from "@firebase/util";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Modal from "../Reuseable/Model";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = searchParams.get("n");
  const sNumber = searchParams.get("s");
  const dName = searchParams.get("d");
  const [Degree, setDegree] = useState<string | null>("BachelorOfScience");
  const [Semester, setSemester] = useState<string | null>("1");
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [url, seturl] = useState("");

  const SemesterNumberArray = [
    {
      index: "1",
      title: "Semester 1",
      url: `/category?n=${search}&s=semester_1&d=${Degree}`,
    },
    {
      index: "2",
      title: "Semester 2",
      url: `/category?n=${search}&s=semester_2&d=${Degree}`,
    },
    {
      index: "3",
      title: "Semester 3",
      url: `/category?n=${search}&s=semester_3&d=${Degree}`,
    },
    {
      index: "4",
      title: "Semester 4",
      url: `/category?n=${search}&s=semester_4&d=${Degree}`,
    },
    {
      index: "5",
      title: "Semester 5",
      url: `/category?n=${search}&s=semester_5&d=${Degree}`,
    },
    {
      index: "6",
      title: "Semester 6",
      url: `/category?n=${search}&s=semester_6&d=${Degree}`,
    },
  ];
  const DegreeArray = [
    {
      index: 1,
      title: "B.Sc",
      name: "BachelorOfScience",
      url: `/category?n=${search}&s=semester_${sNumber}&d=BachelorOfScience`,
    },
    {
      index: 1,
      title: "M.Sc",
      name: "MasterOfScience",
      url: `/category?n=${search}&s=semester_${sNumber}&d=MasterOfScience`,
    },
  ];

  React.useEffect(() => {
    if (Degree) {
      getOldPaperData();
    }
  }, [db, Degree]);

  useEffect(() => {
    setTimeout(() => {
      setSemester(sNumber?.slice(9) || "1");
    }, 500);
  }, [Semester]);

  useEffect(() => {
    setTimeout(() => {
      setDegree(dName);
    }, 500);
  }, [Degree]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      seturl(
        `${
          process.env.NEXT_PUBLIC_URL
        }/category${window.location.search.toString()}`
      );
    }
  }, [Semester, Degree]);

  const [SubjectData, setSubjectData] = React.useState<DocumentData[]>([]);
  const [ArrayIndex, setArrayIndex] = useState(0);

  const getOldPaperData = async () => {
    if (Semester && Degree) {
      while (SubjectData.length > 0) {
        SubjectData.pop();
      }
      const ref = `/allData/govind_guru/${dName}`;
      const oldpaperInformation = collection(db, ref);
      const Mysnapshort = await getDocs(oldpaperInformation);
      Mysnapshort.forEach(async (doc) => {
        setSubjectData((arr) => [...arr, doc.data()]);
      });
    }
  };

  const openModel = () => {
    setIsModelOpen(true);
  };
  const closeModel = () => {
    setIsModelOpen(false);
  };
  const ShareMenu = () => {
    const [copy, setcopy] = useState(false);
    return (
      <div className="flex mt-2 flex-row-reverse h-auto my-auto md:justify-end justify-center items-center gap-2">
        <Link
          href={`whatsapp://send?text=${url}`}
          target="_blank"
          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <div className="sr-only">Whatsapp share</div>
          <motion.svg
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-green-700"
            viewBox="0 0 512 512"
          >
            <path
              d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"
              fillRule="evenodd"
            />
          </motion.svg>
        </Link>
        <Link
          href={`mailto:?subject=URL send via UniSmart.com
                        ${url}`}
          target="_blank"
          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <div className="sr-only">Email</div>
          <motion.svg
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.4,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 fill-red-200"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </motion.svg>
        </Link>
        <Link
          href={`https://telegram.me/share/url?url=${url}`}
          target="_blank"
          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <div className="sr-only">Telegram</div>
          <motion.svg
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 fill-slate-200"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </motion.svg>
        </Link>
        <Link
          href={`sms:?body=URL send via UniSmart.com
                        
                        
                      ${url}`}
          target="_blank"
          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <motion.svg
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 fill-blue-200"
          >
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </motion.svg>
        </Link>
        <div
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`${url}`);
              setcopy(true);
              setTimeout(() => {
                setcopy(false);
              }, 5000);
            } catch (error) {
              alert("Failed to copy link. Please try again.");
            }
          }}
          className="rounded-full cursor-pointer bg-transparent px-2 py-2 text-sm font-semibold shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {copy ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </motion.svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute min-h-full min-w-full md:px-32 px-2 mt-5">
        <div className="md:text-start capitalize text-center text-5xl font-capriola font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-700">
          {search}
        </div>
        <div className="my-2 pe-40 hidden md:block">
          <hr />
        </div>
        {/* <ShareMenu /> */}
        <div className="flex h-auto my-auto md:justify-start justify-center flex-row md:gap-4 gap-2 flex-wrap mt-4">
          {DegreeArray.map((item) => (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              key={item.index}
              onClick={() => {
                setDegree(item.name);
                navigate.push(item.url);
              }}
              className={`flex justify-center cursor-pointer flex-row md:gap-3 gap-2 shadow-xl shadow-slate-200 rounded-xl ${
                Degree && Degree === item.name ? "bg-purple-200" : "bg-white"
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
            </motion.div>
          ))}
        </div>
        {Degree && (
          <div className="flex md:justify-start justify-center flex-row md:gap-4 gap-2 flex-wrap mt-3">
            {SemesterNumberArray.slice(
              0,
              Degree === "BachelorOfScience" ? 6 : 4
            ).map((item) => (
              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                key={item.index}
                onClick={() => {
                  setSemester(item.index);
                  navigate.push(item.url);
                }}
                className={`flex justify-center cursor-pointer flex-row md:gap-3 gap-2 shadow-xl shadow-slate-200 rounded-xl ${
                  Semester && Semester === item.index
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
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-white h-[69.5vh] overflow-hidden overflow-y-scroll p-2 scrollbar-hidden mt-6">
          {Semester && Degree && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              className="flex md:justify-start justify-center flex-row md:gap-2 gap-2 flex-wrap"
            >
              {SubjectData.filter(
                (arrayItem) =>
                  arrayItem.category === search &&
                  arrayItem.semester === `semester_${Semester}`
              ).length === 0 && (
                <div className="text-start font-outfit text-black tracking-wider">
                  {" "}
                  <div className="capitalize">{search} Not Found</div>
                  <div className="">
                    Want a {search} file ?, Request a document on{" "}
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
                  arrayItem.category === search &&
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
                    delay: SubjectData.findIndex((i) => i.id === item.id) / 100,
                    type: "spring",
                  }}
                  key={item.id}
                  onClick={() => {
                    // setpopupBox(true);
                    openModel();
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
                      {search}
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
            </motion.div>
          )}
        </div>
        <div className="mb-16"></div>
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

interface shareManuProps {
  url: string;
}
