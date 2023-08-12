import React, { useState, useEffect } from "react";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "@/app/Firebase/Firebase";
import { motion } from "framer-motion";
import Modal from "@/app/Reuseable/Model";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function Home() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [id, setid] = useState("");
  const [Degree, setDegree] = useState<"BachelorOfScience" | "MasterOfScience">(
    "BachelorOfScience"
  );
  const [docFileData, setdocFileData] = useState({
    semester: "",
    mainSubject: "",
    subSubject: "",
    category: "",
    degree: "",
    fileName: "",
  });

  const openModal = () => {
    setisModalOpen(true);
  };
  const closeModal = () => {
    setisModalOpen(false);
  };
  const [SubjectData, setSubjectData] = React.useState<DocumentData[]>([]);
  useEffect(() => {
    getOldPaperData();
  }, [Degree]);

  const getOldPaperData = async () => {
    while (SubjectData.length > 0) {
      SubjectData.pop();
    }
    const ref = `/allData/govind_guru/${Degree}`;
    const oldpaperInformation = collection(db, ref);
    const Mysnapshort = await getDocs(oldpaperInformation);
    Mysnapshort.forEach(async (doc) => {
      setSubjectData((arr) => [...arr, doc.data()]);
    });
  };

  const deleteNote = async () => {
    await deleteDoc(
      doc(db, `/allData/govind_guru/${docFileData.degree}`, id)
    ).then(() => {
      getOldPaperData();
      closeModal();
      setid("");
      setdocFileData({
        ...docFileData,
        semester: "",
        category: "",
        degree: "",
        mainSubject: "",
        subSubject: "",
        fileName: "",
      });
    });
  };

  const deleteFileFromStorage = async () => {
    const desertRef = ref(
      storage,
      `/${docFileData.degree}/${docFileData.semester}/${docFileData.category}/${docFileData.fileName}`
    );
    deleteObject(desertRef)
      .then(async () => {
        deleteNote();
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <div className="my-8">
        <div className="min-w-full flex justify-center py-8">
          <div className="inline-flex rounded-lg border gap-2 border-gray-100 bg-purple-200 p-1">
            <div>
              <button
                onClick={() => {
                  setDegree("BachelorOfScience");
                }}
                className={`inline-block ${
                  Degree === "BachelorOfScience" ? "bg-white" : "bg-purple-200"
                } rounded-md font-bold font-outfit tracking-wide px-4 py-2 md:text-sm min-[0px]:text-xs text-blue-900 hover:text-blue-900/75 hover:bg-purple-100 focus:relative`}
              >
                B.Sc
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setDegree("MasterOfScience");
                }}
                className={`inline-block ${
                  Degree !== "BachelorOfScience" ? "bg-white" : "bg-purple-200"
                } rounded-md font-bold font-outfit tracking-wide px-4 py-2 md:text-sm min-[0px]:text-xs text-blue-900 hover:text-blue-900/75 hover:bg-purple-100 focus:relative`}
              >
                M.Sc
              </button>
            </div>
          </div>
        </div>
        <div className="text-3xl font-outfit font-bold text-center">
          Remove of{" "}
          <span className="underline underline-offset-2">
            {Degree.split(/(?=[A-Z])/).join(" ")}
          </span>{" "}
          files
        </div>
        <div className="text-red-600 font-outfit text-center">
          warning: once you remove from here, it will permanently delete and it
          will not recover
        </div>
      </div>
      <div className="text-3xl my-6 font-outfit md:mx-16 mx-2 tracking-wider font-bold">
        Syllabus
      </div>
      <div className="mb-16 flex md:justify-start justify-center flex-row md:gap-2 gap-2 flex-wrap md:px-16 px-2">
        {SubjectData.filter(
          (arrayItem) => arrayItem.category === "syllabus"
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
            onClick={() => {
              openModal();
              setid(item.aDocid);
              setdocFileData({
                ...docFileData,
                semester: item.semester,
                category: item.category,
                degree: item.degree,
                mainSubject: item.mainSubject,
                subSubject: item.subject,
                fileName: item.fileName,
              });
            }}
            key={item.id}
            className="md:w-[18rem] w-[22rem] cursor-pointer min-h-auto p-4 rounded-2xl relative shadow-2xl shadow-slate-200 border border-purple-700 bg-purple-50/40"
          >
            <div
              onClick={() => {
                openModal();
                setid(item.aDocid);
                setdocFileData({
                  ...docFileData,
                  semester: item.semester,
                  category: item.category,
                  degree: item.degree,
                  mainSubject: item.mainSubject,
                  subSubject: item.subject,
                  fileName: item.fileName,
                });
              }}
              className="absolute right-4 top-4 group-hover:block cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 fill-blue-200"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </div>
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
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.university}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.degree}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.semester}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.mainSubject}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.subject}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.category}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.subjectCode}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.DocumentYear}
              </div>
              <div className="text-black break-all font-outfit font-bold tracking-wider">
                {item.fileName}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-3xl my-6 font-outfit md:mx-16 mx-2 tracking-wider font-bold">
        Notes
      </div>
      <div className="mb-16 flex md:justify-start justify-center flex-row md:gap-2 gap-2 flex-wrap md:px-16 px-2">
        {SubjectData.filter((arrayItem) => arrayItem.category === "notes").map(
          (item) => (
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
              onClick={() => {
                openModal();
                setid(item.aDocid);
                setdocFileData({
                  ...docFileData,
                  semester: item.semester,
                  category: item.category,
                  degree: item.degree,
                  mainSubject: item.mainSubject,
                  subSubject: item.subject,
                  fileName: item.fileName,
                });
              }}
              key={item.id}
              className="md:w-[18rem] w-[22rem] cursor-pointer min-h-auto p-4 rounded-2xl relative shadow-2xl shadow-slate-200 border border-purple-700 bg-purple-50/40"
            >
              <div
                onClick={() => {
                  openModal();
                  setid(item.aDocid);
                  setdocFileData({
                    ...docFileData,
                    semester: item.semester,
                    category: item.category,
                    degree: item.degree,
                    mainSubject: item.mainSubject,
                    subSubject: item.subject,
                    fileName: item.fileName,
                  });
                }}
                className="absolute right-4 top-4 group-hover:block cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 fill-blue-200"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </div>
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
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.university}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.degree}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.semester}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.mainSubject}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.subject}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.category}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.subjectCode}
                </div>
                <div className="text-black font-outfit font-bold tracking-wider">
                  {item.DocumentYear}
                </div>
                <div className="text-black break-all font-outfit font-bold tracking-wider">
                  {item.fileName}
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
      <div className="text-3xl my-6 font-outfit md:mx-16 mx-2 tracking-wider font-bold">
        oldPaper
      </div>
      <div className="mb-16 flex md:justify-start justify-center flex-row md:gap-2 gap-2 flex-wrap md:px-16 px-2">
        {SubjectData.filter(
          (arrayItem) => arrayItem.category === "oldPaper"
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
            onClick={() => {
              openModal();
              setid(item.aDocid);
              setdocFileData({
                ...docFileData,
                semester: item.semester,
                category: item.category,
                degree: item.degree,
                mainSubject: item.mainSubject,
                subSubject: item.subject,
                fileName: item.fileName,
              });
            }}
            key={item.id}
            className="md:w-[18rem] w-[22rem] min-h-auto cursor-pointer p-4 rounded-2xl relative shadow-2xl shadow-slate-200 border border-purple-700 bg-purple-50/40"
          >
            <div
              onClick={() => {
                openModal();
                setid(item.aDocid);
                setdocFileData({
                  ...docFileData,
                  semester: item.semester,
                  category: item.category,
                  degree: item.degree,
                  mainSubject: item.mainSubject,
                  subSubject: item.subject,
                  fileName: item.fileName,
                });
              }}
              className="absolute right-4 top-4 group-hover:block cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 fill-blue-200"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </div>
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
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.university}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.degree}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.semester}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.mainSubject}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.subject}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.category}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.subjectCode}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.DocumentYear}
              </div>
              <div className="text-black break-all font-outfit font-bold tracking-wider">
                {item.fileName}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-3xl my-6 font-outfit md:mx-16 mx-2 tracking-wider font-bold">
        assignment
      </div>
      <div className="mb-16 flex md:justify-start justify-center flex-row md:gap-2 gap-2 flex-wrap md:px-16 px-2">
        {SubjectData.filter(
          (arrayItem) => arrayItem.category === "assignment"
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
            onClick={() => {
              openModal();
              setid(item.aDocid);
              setdocFileData({
                ...docFileData,
                semester: item.semester,
                category: item.category,
                degree: item.degree,
                mainSubject: item.mainSubject,
                subSubject: item.subject,
                fileName: item.fileName,
              });
            }}
            key={item.id}
            className="md:w-[18rem] w-[22rem] min-h-auto p-4 cursor-pointer rounded-2xl relative shadow-2xl shadow-slate-200 border border-purple-700 bg-purple-50/40"
          >
            <div
              onClick={() => {
                openModal();
                setid(item.aDocid);
                setdocFileData({
                  ...docFileData,
                  semester: item.semester,
                  category: item.category,
                  degree: item.degree,
                  mainSubject: item.mainSubject,
                  subSubject: item.subject,
                  fileName: item.fileName,
                });
              }}
              className="absolute right-4 top-4 group-hover:block cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 fill-blue-200"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </div>
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
            <div className="flex flex-col gap-1 min-h-fit justify-start items-start mt-12 cursor-pointer">
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.university}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.degree}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.semester}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.mainSubject}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.subject}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.category}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.subjectCode}
              </div>
              <div className="text-black font-outfit font-bold tracking-wider">
                {item.DocumentYear}
              </div>
              <div className="text-black break-all font-outfit font-bold tracking-wider">
                {item.fileName}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        variants="custome"
        className="bg-white p-8"
      >
        <div className="min-h-full min-w-full flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <svg
              baseProfile="tiny"
              id="Layer_1"
              version="1.2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7"
            >
              <path
                className="fill-yellow-500"
                d="M21.171,15.398l-5.912-9.854C14.483,4.251,13.296,3.511,12,3.511s-2.483,0.74-3.259,2.031l-5.912,9.856  c-0.786,1.309-0.872,2.705-0.235,3.83C3.23,20.354,4.472,21,6,21h12c1.528,0,2.77-0.646,3.406-1.771  C22.043,18.104,21.957,16.708,21.171,15.398z M12,17.549c-0.854,0-1.55-0.695-1.55-1.549c0-0.855,0.695-1.551,1.55-1.551  s1.55,0.696,1.55,1.551C13.55,16.854,12.854,17.549,12,17.549z M13.633,10.125c-0.011,0.031-1.401,3.468-1.401,3.468  c-0.038,0.094-0.13,0.156-0.231,0.156s-0.193-0.062-0.231-0.156l-1.391-3.438C10.289,9.922,10.25,9.712,10.25,9.5  c0-0.965,0.785-1.75,1.75-1.75s1.75,0.785,1.75,1.75C13.75,9.712,13.711,9.922,13.633,10.125z"
              />
            </svg>
            <div className="text-2xl font-outfit tracking-wide font-bold">
              confirmation
            </div>
          </div>
          <hr className="border bottom-2 border-black/30 min-w-full" />
          <div className="text-base font-outfit font-bold tracking-wide">
            Are You Sure You want to Delete ?
          </div>

          <div className="flex min-w-full justify-end flex-row gap-4">
            <button
              onClick={() => {
                closeModal();
              }}
              className="bg-transparent text-black font-semibold outline outline-1 outline-black/10 p-2 px-5 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteFileFromStorage();
              }}
              className="bg-red-700 p-2 px-5 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
