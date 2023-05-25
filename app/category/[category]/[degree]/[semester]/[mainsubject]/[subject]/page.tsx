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
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { ZoomInIcon, ZoomOutIcon } from '@react-pdf-viewer/zoom';

import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import "@react-pdf-viewer/core/lib/styles/index.css";

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
    const zoomPluginInstance = zoomPlugin({
        enableShortcuts: true,
    });
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
    }/semester_${params.semester.slice(9)}/${params.mainsubject}/${
      params.subject
    }/${params.category}`;
    console.log(ref);

    const bseInformation = collection(db, ref);
    const mySnapshot: QuerySnapshot = await getDocs(bseInformation);
    mySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
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
      <div className="min-w-full flex justify-center mt-8">
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
                  rotate: 360,
                }
              : {}
          }
          className="w-96 h-48 bg-cyan-900 rounded-3xl flex justify-center items-center flex-col gap-2 shadow-2xl shadow-slate-400"
        >
          <div className="text-4xl text-white font-capriola">
            {params.mainsubject}
          </div>
          <code className="text-sm text-white font-outfit tracking-widest">
            {params.semester} ({degreeName})
          </code>
        </motion.div>
      </div>
      <div className="mt-16 min-w-full md:px-32 min-[0px]:px-2">
        <div className="min-w-full flex flex-row flex-wrap justify-center gap-3">
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
              transition={{
                delay:
                  (MainSubjectData.findIndex((i) => i.id === item.id) + 1) / 10,
                ease: "easeInOut",
              }}
              className="min-h-max lg:w-11/12 min-[0px]:w-11/12 lg:p-4 min-[0px]:p-0 rounded-xl flex justify-center items-center flex-wrap"
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div className="w-screen">
                  <Viewer
                    fileUrl={item.fileURL}
                    plugins={[zoomPluginInstance]}
                    defaultScale={.5}
                  />
                </div>
              </Worker>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
