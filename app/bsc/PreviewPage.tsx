import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/Firebase";
import Pdfview from "../Reuseable/Pdfview";
import { DocumentData } from "firebase/firestore";

interface PreviewPageProps {
  university: string;
  degree: string;
  mainSubject: string;
  subject: string;
  semester: string;
  subjectCode: string;
  url: string;
  category: string;
  documentYear: string;
  fileName: string;
}

export default function PreviewPage({
  university,
  degree,
  mainSubject,
  subject,
  semester,
  subjectCode,
  url,
  category,
  documentYear,
  fileName,
}: PreviewPageProps) {
  const [copy, setcopy] = React.useState(false);
  const [shareManu, setShareManu] = React.useState(false);
  return (
    <div>
      <div className="mt-8 w-auto">
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
        >
          <div className="min-w-full grid grid-cols-12 gap-3 lg:px-32">
            <div className="lg:col-span-4 my-8 min-[0px]:col-span-12 flex bg-purple-200 min-[0px]:mx-3 md:mx-0 shadow-2xl rounded-3xl shadow-slate-500 p-8 items-center justify-center relative flex-col">
              <div className="absolute top-3 right-4 flex flex-col gap-2">
                <div className="flex flex-row gap-2 justify-end">
                  <div className="font-capriola text-purple-100 text-sm bg-purple-700 p-1 px-4 rounded-full">
                    {documentYear}
                  </div>
                  <div className="font-capriola text-purple-100 text-sm bg-purple-700 p-1 px-4 rounded-full">
                    {category}
                  </div>
                </div>
              </div>
              <center className="flex flex-col gap-3 text-purple-900 mt-16">
                <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                  <span className="text-lg font-semibold text-purple-900/80">
                    Univercity
                  </span>{" "}
                  : {university.split("_").join(" ")}
                </div>
                <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                  <span className="text-lg font-semibold text-purple-900/80">
                    Degree
                  </span>{" "}
                  : {degree.split(/(?=[A-Z])/).join(" ")}
                </div>
                <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                  <span className="text-lg font-semibold text-purple-900/80">
                    Main Subject
                  </span>{" "}
                  : {mainSubject}
                </div>
                <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                  <span className="text-lg font-semibold text-purple-900/80">
                    Subject
                  </span>{" "}
                  : {subject}
                </div>
                <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                  <span className="text-lg font-semibold text-purple-900/80">
                    Semester
                  </span>{" "}
                  : {semester.split("_").join(" ")}
                </div>
                <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                  <span className="text-lg font-semibold text-purple-900/80">
                    Subject Code
                  </span>
                  : {subjectCode}
                </div>
              </center>
              <motion.button
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.9
              }}
              transition={{
                type:"spring"
              }}
                onClick={() => {
                  getDownloadURL(ref(storage, url))
                    .then((url) => {
                      const xhr = new XMLHttpRequest();
                      xhr.responseType = "blob";
                      xhr.onload = (event) => {
                        const blob = xhr.response;
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${fileName}.pdf`; // Set the desired file name and extension
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
                className="bg-blue-900 p-2 px-8 text-blue-200 rounded-full mt-8 mb-16 font-outfit tracking-wide hover:bg-blue-700 hover:text-blue-100"
              >
                Download
              </motion.button>
            </div>
            <div className="lg:col-span-8 min-[0px]:col-span-12 md:p-8 min-[0px]:p-0">
              <div className="relative overflow-hidden mx-2 shadow-2xl shadow-slate-500 rounded-3xl bg-black">
                <Pdfview fileurl={url} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
