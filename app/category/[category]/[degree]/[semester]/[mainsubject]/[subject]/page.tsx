"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { db } from "@/app/Firebase/Firebase";
import Pdfview from "./Pdfview";
import { storage } from "@/app/Firebase/Firebase";
import { ref, getDownloadURL } from "firebase/storage";

import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import Head from "next/head";

export default function SubjectPage({
  params,
}: {
  params: {
    semester: string;
    mainsubject: string;
    degree: string;
    category: string;
    subject: string;
  };
}) {
  const [MainSubjectData, setMainSubjectData] = React.useState<DocumentData[]>(
    []
  );
  const [copy, setcopy] = React.useState(false);
  const [shareManu, setShareManu] = React.useState(false);
  const [loaded, setloaded] = React.useState(false);
  React.useEffect(() => {
    getBscData().then(() => {
      setloaded(true);
    });
  }, [db]);

  interface handleDownloadPdfProps {
    url: string;
  }

  const getBscData = async (): Promise<void> => {
    const ref = `/university/govind_guru/${
      params.degree
    }/semester_${params.semester.slice(9)}/${params.mainsubject}/${
      params.subject
    }/${params.category}`;

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
              The requested {params.category.split(/(?=[A-Z])/).join(" ")} was
              not found.
            </div>
            <div className="md:text-3xl min-[0px]:text-lg text-center font-capriola font-bold text-red-400/50">
              Please feel free to submit a request through our &#39;Contact
              Us&#39; page for Request a Document.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>UniSol | Subject</title>
      </Head>
      <div className="mt-8 min-w-screen">
        {MainSubjectData.map((item) => (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            key={item.id}
            animate={
              loaded
                ? {
                    scale: 1,
                    opacity: 1,
                  }
                : {}
            }
          >
            <div className="min-w-full grid grid-cols-12 gap-3 lg:px-32">
              <div className="lg:col-span-4 min-[0px]:col-span-12 flex bg-cyan-200 min-[0px]:mx-3 md:mx-0 shadow-2xl rounded-3xl shadow-slate-500 p-8 items-center justify-center relative flex-col">
                <div className="absolute top-3 right-4 flex flex-col gap-2">
                  <div className="flex flex-row gap-2 justify-end">
                    <div className="font-capriola text-fuchsia-100 text-sm bg-fuchsia-700 p-1 px-4 rounded-full">
                      {item.DocumentYear}
                    </div>
                    <div className="font-capriola text-cyan-100 text-sm bg-cyan-900 p-1 px-4 rounded-full">
                      {item.category}
                    </div>
                  </div>
                  <div className="flex flex-row justify-end gap-2">
                    {shareManu && (
                      <div className="flex flex-row justify-end gap-2">
                        <Link
                          href={`whatsapp://send?text=${process.env.NEXT_PUBLIC_URL}/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}/${item.subject}`}
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
                            ease: 'easeInOut'
                          }}
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                          >
                            <title />
                            <g
                              data-name="wa whatsapp message communication chat"
                              id="wa_whatsapp_message_communication_chat"
                            >
                              <path d="M16,3A13,13,0,0,0,4.53,22.13L3,27.74a1,1,0,0,0,.27,1A1,1,0,0,0,4,29a.84.84,0,0,0,.27,0l5.91-1.65a1,1,0,0,0-.53-1.93L5.42,26.56l1.15-4.3a1,1,0,0,0-.1-.76A11,11,0,1,1,16,27a11.23,11.23,0,0,1-1.84-.15,1,1,0,0,0-1.15.82,1,1,0,0,0,.82,1.15A13,13,0,1,0,16,3Z" />
                              <path d="M15,11.21l-1.16-1.6a2.06,2.06,0,0,0-1.5-.84,2.08,2.08,0,0,0-1.62.6l-1.2,1.2a2.81,2.81,0,0,0-.8,2.08c0,1.77,1.36,4,4,6.6,3.09,3,5.23,4,6.69,4a2.7,2.7,0,0,0,2-.81l1.2-1.2a2,2,0,0,0-.24-3.11L20.8,17a2.09,2.09,0,0,0-1.83-.3l-1.49.47a.53.53,0,0,1-.26-.09,11.42,11.42,0,0,1-2.35-2.26.31.31,0,0,1,0-.11c.13-.44.35-1.15.5-1.64A2,2,0,0,0,15,11.21Zm1.29,7.63a2.33,2.33,0,0,0,1.75.2l1.54-.46,1.61,1.25L20,21c-.48.47-2.25.33-5.86-3.21-3-2.91-3.41-4.5-3.41-5.18A.89.89,0,0,1,11,12l1.28-1.19,1.18,1.65c-.16.49-.39,1.22-.51,1.65A2.12,2.12,0,0,0,13,15.51,11.24,11.24,0,0,0,16.33,18.84Z" />
                            </g>
                          </motion.svg>
                        </Link>
                        <Link
                          href={`mailto:?subject=${item.subject} | ${params.category}&body=${item.subject} | ${params.category} URL send via UniSmart.com
                      
                      
                      ${process.env.NEXT_PUBLIC_URL}/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}/${item.subject}`}
                          target="_blank"
                          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
                            ease: 'easeInOut'
                          }}
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 56.7 56.7"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                          >
                            <path d="M53.1719,14.5953l0.0011-0.0011l-0.0011,0.0008v-1.184c0-2.2468-1.8384-4.0852-4.0853-4.0852l-0.0012,0.0011l-0.0024,0.0018  l0.0036-0.0029H7.3962l0.0161,0.0131l-0.0161-0.012c-2.2468,0-4.0853,1.8384-4.0853,4.0853v27.9073  c0,2.2468,1.8384,4.0851,4.0853,4.0851h1.4543h38.6578v-0.001c4.2856-0.0498,5.5728-1.1102,5.6702-4.0809L53.1719,14.5953z   M46.0429,10.3258L28.1753,23.487L10.4239,10.3258H46.0429z M9.8608,20.5521l16.5508,11.4004l0.0166,0.0115L9.8513,43.4907  L9.8608,20.5521z M10.2886,44.4046l17.0151-11.8314l0.2985,0.2077c0.1716,0.1194,0.3714,0.1792,0.5712,0.1792  c0.1982,0,0.8773-0.39,0.8773-0.39l17.0197,11.8345H10.2886z M46.4973,43.4836L29.9305,31.9641l9.2394-6.3642l7.3274-5.0472V43.4836  z" />
                          </motion.svg>
                        </Link>
                        <Link
                          href={`https://telegram.me/share/url?url=${process.env.NEXT_PUBLIC_URL}/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}/${item.subject}`}
                          target="_blank"
                          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
                            ease: 'easeInOut'
                          }}
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                          >
                            <title />
                            <g
                              data-name="telegram social media network chat"
                              id="telegram_social_media_network_chat"
                            >
                              <path d="M28.59,4.29a2.23,2.23,0,0,0-2.27-.36L3.41,13.1a1.83,1.83,0,0,0,0,3.38l1.48.61a1,1,0,0,0,1.31-.53,1,1,0,0,0-.54-1.31L4.56,14.8l22.51-9a.22.22,0,0,1,.23,0,.24.24,0,0,1,.08.23L23.27,25.21a.4.4,0,0,1-.26.3.39.39,0,0,1-.39-.06l-8-6.24,7.83-7.91a1,1,0,0,0-1.22-1.56L9.75,16.54a1,1,0,1,0,1,1.72l4.83-2.85L13.23,17.8a2,2,0,0,0,.2,3.08l8,6.15a2.4,2.4,0,0,0,1.47.5,2.47,2.47,0,0,0,.83-.15,2.37,2.37,0,0,0,1.52-1.75L29.33,6.47A2.23,2.23,0,0,0,28.59,4.29Z" />
                            </g>
                          </motion.svg>
                        </Link>
                        <Link
                          href={`sms:?body=${item.subject} | ${params.category} URL send via UniSmart.com
                      
                      
                    ${process.env.NEXT_PUBLIC_URL}/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}/${item.subject}`}
                          target="_blank"
                          className="rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
                            ease: 'easeInOut'
                          }}
                            id="Icons"
                            version="1.1"
                            viewBox="0 0 32 32"
                            className="w-6 h-6"
                          >
                            <line
                              className="fill-none stroke-black stroke-2"
                              style={{
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                              }}
                              x1="12"
                              x2="12"
                              y1="14"
                              y2="14"
                            />
                            <line
                              className="fill-none stroke-black stroke-2"
                              style={{
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                              }}
                              x1="16"
                              x2="16"
                              y1="14"
                              y2="14"
                            />
                            <line
                              className="fill-none stroke-black stroke-2"
                              style={{
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                              }}
                              x1="20"
                              x2="20"
                              y1="14"
                              y2="14"
                            />
                            <path
                              className="fill-none stroke-black stroke-2"
                              style={{
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                              }}
                              d="M11,4c-4.4,0-8,3.6-8,8v12v5l0,0c3.7-3.2,8.4-5,13.3-5H21c4.4,0,8-3.6,8-8v-4c0-4.4-3.6-8-8-8H11z"
                            />
                          </motion.svg>
                        </Link>
                        <div
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(
                                `${process.env.NEXT_PUBLIC_URL}/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}/${item.subject}`
                              );
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
                            initial={{
                              opacity: 0,
                            }}
                            whileInView={{
                              opacity: 1,
                            }}
                            transition={{
                              delay: 0.2,
                              ease: 'easeInOut'
                            }}
                              data-name="Layer 1"
                              id="Layer_1"
                              viewBox="0 0 200 200"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                            >
                              <title />
                              <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z" />
                            </motion.svg>
                          ) : (
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h48v48h-48z" fill="none" />
                              <path d="M32 2h-24c-2.21 0-4 1.79-4 4v28h4v-28h24v-4zm6 8h-22c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h22c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4zm0 32h-22v-28h22v28z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      onClick={() => {
                        setShareManu((perv) => !perv);
                      }}
                      className="rounded-full cursor-pointer bg-transparent px-2 py-2 text-sm font-semibold shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                      >
                        <path d="M5.5 15a3.51 3.51 0 0 0 2.36-.93l6.26 3.58a3.06 3.06 0 0 0-.12.85 3.53 3.53 0 1 0 1.14-2.57l-6.26-3.58a2.74 2.74 0 0 0 .12-.76l6.15-3.52A3.49 3.49 0 1 0 14 5.5a3.35 3.35 0 0 0 .12.85L8.43 9.6A3.5 3.5 0 1 0 5.5 15zm12 2a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0-13A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 17.5 4zm-12 6A1.5 1.5 0 1 1 4 11.5 1.5 1.5 0 0 1 5.5 10z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <center className="flex flex-col gap-3 text-cyan-900 mt-16">
                  <div className="flex justify-center md:pt-8 min-[0px]:pt-5">
                    <div className="flex flex-row md:gap-3 min-[0px]:gap-1 p-2 md:px-7 min-[0px]:px-3 rounded-full">
                      <Link
                        href="/"
                        className="md:text-sm min-[0px]:text-xs font-outfit text-blue-700 hover:underline underline-offset-4 my-auto"
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
                      <div className="md:text-sm min-[0px]:text-xs font-extrabold text-blue-600">
                        ...
                      </div>
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
                        href={`/category/${params.category}/${params.degree}/${params.semester}`}
                        className="md:text-sm min-[0px]:text-xs font-outfit text-blue-700 hover:underline underline-offset-4 my-auto flex flex-row gap-2"
                      >
                        <span>Semester</span>
                        <span>{params.semester.slice(9)}</span>
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
                        href={`/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}`}
                        className="md:text-sm min-[0px]:text-xs font-outfit text-blue-700 hover:underline underline-offset-4 my-auto flex flex-row gap-2"
                      >
                        {params.mainsubject}
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
                      <div className="md:text-sm min-[0px]:text-xs font-outfit text-black my-auto">
                        {params.subject}
                      </div>
                    </div>
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Univercity
                    </span>{" "}
                    : {item.university.split("_").join(" ")}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Degree
                    </span>{" "}
                    : {item.degree.split(/(?=[A-Z])/).join(" ")}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Main Subject
                    </span>{" "}
                    : {item.mainSubject}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Subject
                    </span>{" "}
                    : {item.subject}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Semester
                    </span>{" "}
                    : {item.semester.split("_").join(" ")}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Subject Code
                    </span>
                    : {item.subjectCode}
                  </div>
                </center>
                <button
                  onClick={() => {
                    getDownloadURL(ref(storage, item.fileURL))
                      .then((url) => {
                        const xhr = new XMLHttpRequest();
                        xhr.responseType = "blob";
                        xhr.onload = (event) => {
                          const blob = xhr.response;
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(blob);
                          link.download = `${item.fileName}.pdf`; // Set the desired file name and extension
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        };
                        xhr.open("GET", url);
                        xhr.send();
                      })
                      .catch((error) => {
                        console.log(error);
                        // throw new Error(error);
                      });
                  }}
                  className="bg-cyan-800 p-2 px-8 text-cyan-200 rounded-full mt-8 mb-16 font-outfit tracking-wide hover:bg-blue-950 hover:text-blue-200"
                >
                  Download
                </button>
              </div>
              <div className="lg:col-span-8 min-[0px]:col-span-12 md:p-8 min-[0px]:p-0">
                <div className="relative overflow-hidden mx-2 shadow-2xl shadow-slate-500 rounded-3xl bg-black">
                  <Pdfview fileurl={item.fileURL} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
