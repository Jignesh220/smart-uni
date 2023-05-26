"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { db } from "@/app/Firebase/Firebase";
import Pdfview from "./Pdfview";

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
              <div className="lg:col-span-6 min-[0px]:col-span-12 flex justify-center bg-blue-200 shadow-2xl rounded-3xl shadow-slate-900 p-8"></div>
              <div className="lg:col-span-6 min-[0px]:col-span-12 bg-blue-200 shadow-2xl rounded-3xl shadow-slate-900 md:p-8 min-[0px]:p-0">
                <div className="relative rounded-3xl overflow-hidden">
                  <Pdfview fileurl={item.fileURL}/>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
