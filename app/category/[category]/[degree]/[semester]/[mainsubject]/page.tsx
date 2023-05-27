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

const Colors = [
  {
    index: 1,
    color: "green",
  },
  {
    index: 5,
    color: "rose",
  },
  {
    index: 4,
    color: "blue",
  },

  {
    index: 3,
    color: "amber",
  },
  {
    index: 2,
    color: "purple",
  },

  {
    index: 6,
    color: "teal",
  },
  {
    index: 7,
    color: "indigo",
  },
];

export default function Page({
  params,
}: {
  params: {
    semester: string;
    mainsubject: string;
    degree: string;
    category: string;
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
    }/semester_${params.semester.slice(9)}/${params.mainsubject}`;
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
      <div className="mt-16 min-w-full px-32">
        <div className="min-w-full flex flex-row flex-wrap justify-center gap-3">
          {MainSubjectData.map((item) => {
            const colorThemeIndex = Colors[Math.floor(Math.random() * 7)].color;
            return (
              <Link
                href={`/category/${params.category}/${params.degree}/${params.semester}/${params.mainsubject}/${item.url}`}
                key={item.id}
              >
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
                        }
                      : {}
                  }
                  transition={{
                    delay:
                      (MainSubjectData.findIndex((i) => i.id === item.id) + 1) /
                      10,
                    ease: "easeInOut",
                  }}
                  className={`md:w-96 min-[0px]:w-96 md:h-36 min-[0px]:h-36 bg-${colorThemeIndex}-300 rounded-3xl flex justify-center items-center flex-col shadow-lg shadow-slate-400 relative overflow-hidden`}
                >
                  <div
                    className={`text-2xl font-capriola text-${colorThemeIndex}-800 absolute top-8 left-8`}
                  >
                    {item.subject.split(/(?=[A-Z])/).join(" ")}
                  </div>
                  <div
                    className={`absolute bottom-2 right-4 text-8xl font-capriola text-${colorThemeIndex}-700 text-opacity-30`}
                  >
                    {MainSubjectData.findIndex((i) => i.id === item.id) + 1}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
