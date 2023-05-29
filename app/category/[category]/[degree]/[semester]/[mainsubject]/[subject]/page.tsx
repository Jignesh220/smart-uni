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
              The requested {params.category.split(/(?=[A-Z])/).join(" ")} was not found.
            </div>
            <div className="md:text-3xl min-[0px]:text-lg text-center font-capriola font-bold text-red-400/50">
              Please feel free to submit a request through our 'Contact Us' page
              for Request a Document.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-8 min-w-screen">
        {MainSubjectData.map((item) => (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            key={item.id}
            whileInView={
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
                <div className="absolute top-3 right-4 flex flex-row gap-2">
                  <div className="font-capriola text-fuchsia-100 text-sm bg-fuchsia-700 p-1 px-4 rounded-full">
                    {item.DocumentYear}
                  </div>
                  <div className="font-capriola text-cyan-100 text-sm bg-cyan-900 p-1 px-4 rounded-full">
                    {item.category}
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
