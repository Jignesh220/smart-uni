"use client";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDocs,
  collection,
  DocumentData,
  deleteDoc,
  Index,
} from "firebase/firestore";
import { db } from "@/app/Firebase/Firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Image from "next/image";
import Link from "next/link";
import { delay, motion } from "framer-motion";
import Modal from "@/app/Reuseable/Model";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function DeleteBlog() {
  const storage = getStorage();
  const [BlogData, setBlogData] = React.useState<DocumentData[]>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const openModal = () => {
    setisModalOpen(true);
  };
  const closeModal = () => {
    setisModalOpen(false);
  };
  useEffect(() => {
    handleGetData();
  }, [db]);

  const handleGetData = async () => {
    setBlogData([]);
    const ref = `/blogs`;
    const contactInformation = collection(db, ref);
    const Mysnapshort = await getDocs(contactInformation);
    Mysnapshort.forEach(async (doc) => {
      setBlogData((arr) => [...arr, doc.data()]);
    });
  };

  const deleteNote = async (id: string) => {
    const desertRef = ref(storage, `blogs/${id}/coverImage`);
    deleteObject(desertRef)
      .then(async () => {
        // File deleted successfully
        await deleteDoc(doc(db, `/blogs`, id)).then(() => {
          handleGetData();
          closeModal();
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="min-w-full min-h-screen mb-16">
      <div className="flex flex-row justify-center gap-6 flex-wrap">
        {BlogData.map((item) => (
          <div key={item.id}>
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                delay: (BlogData.findIndex((i) => i.id === item.id) + 1) * 0.2,
              }}
              className="w-auto group md:w-[28rem] min-[0px]:w-[22rem] pb-4 h-auto p-1 bg-purple-100 shadow-xl shadow-slate-300 rounded-2xl min-w-full justify-center flex flex-wrap flex-col gap-4"
            >
              <div className="md:w-[28rem] min-[0px]:w-[22rem] md:h-60 h-52 relative">
                <Image
                  src={item.coverImage}
                  alt="coverImage"
                  fill
                  className="rounded-2xl"
                />
              </div>
              <div className="px-4">
                <div className="font-outfit text-base text-center font-bold">
                  {item.title}
                </div>
                <div
                  className="my-8 flex justify-center cursor-pointer"
                  onClick={openModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </div>
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
                        deleteNote(item.id);
                      }}
                      className="bg-red-700 p-2 px-5 rounded-md text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
