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
                      Subject
                    </span>{" "}
                    : {item.mainSubject}
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
                    getDownloadURL(
                      ref(
                        storage,
                        item.fileURL
                      )
                    )
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
                      })
                      .catch((error) => {
                        console.log(error);
                        throw new Error(error);
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
