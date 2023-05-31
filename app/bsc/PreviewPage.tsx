import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/Firebase';
import Pdfview from '../Reuseable/Pdfview';
import { DocumentData } from 'firebase/firestore';

interface PreviewPageProps{
    university: string,
    degree: string,
    mainSubject: string,
    subject: string,
    semester: string,
    subjectCode: string,
    url: string,
    category: string,
    documentYear: string,
    fileName: string,
}

export default function PreviewPage({university,degree,mainSubject,subject,semester,subjectCode,url,category,documentYear,fileName}:PreviewPageProps) {
  return (
    <div>
      <div className="mt-8 min-w-screen">
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            whileInView={{
                    scale: 1,
                    opacity: 1,
                  }}
          >
            <div className="min-w-full grid grid-cols-12 gap-3 lg:px-32">
              <div className="lg:col-span-4 min-[0px]:col-span-12 flex bg-cyan-200 min-[0px]:mx-3 md:mx-0 shadow-2xl rounded-3xl shadow-slate-500 p-8 items-center justify-center relative flex-col">
                <div className="absolute top-3 right-4 flex flex-row gap-2">
                  <div className="font-capriola text-fuchsia-100 text-sm bg-fuchsia-700 p-1 px-4 rounded-full">
                    {documentYear}
                  </div>
                  <div className="font-capriola text-cyan-100 text-sm bg-cyan-900 p-1 px-4 rounded-full">
                    {category}
                  </div>
                </div>
                <center className="flex flex-col gap-3 text-cyan-900 mt-16">
                  
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Univercity
                    </span>{" "}
                    : {university.split("_").join(" ")}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Degree
                    </span>{" "}
                    : {degree.split(/(?=[A-Z])/).join(" ")}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Main Subject
                    </span>{" "}
                    : {mainSubject}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Subject
                    </span>{" "}
                    : {subject}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Semester
                    </span>{" "}
                    : {semester.split("_").join(" ")}
                  </div>
                  <div className="capitalize text-xl font-outfit font-bold tracking-wide">
                    <span className="text-lg font-semibold text-cyan-900/80">
                      Subject Code
                    </span>
                    : {subjectCode}
                  </div>
                </center>
                <button
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
                  className="bg-cyan-800 p-2 px-8 text-cyan-200 rounded-full mt-8 mb-16 font-outfit tracking-wide hover:bg-blue-950 hover:text-blue-200"
                >
                  Download
                </button>
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
  )
}
