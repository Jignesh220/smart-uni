import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { motion } from "framer-motion";
import Modal from "../Reuseable/Model";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NotesData() {
  const [user] = useAuthState(auth);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [MainNotesData, setMainNotesData] = React.useState<DocumentData[]>([]);

  const openModal = () => {
    setisModalOpen(true);
  };
  const closeModal = () => {
    setisModalOpen(false);
  };
  useEffect(() => {
    if (user) {
      getNotesData();
    }
  }, [db]);

  const getNotesData = async () => {
    setMainNotesData([]);
    const path = `/UserData/${auth.currentUser?.uid}/notes`;
    const bseInformation = collection(db, path);
    const mySnapshot: QuerySnapshot = await getDocs(bseInformation);
    mySnapshot.forEach((doc) => {
      setMainNotesData((arr) => [...arr, doc.data()]);
    });
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(
      doc(db, `/UserData/${auth.currentUser?.uid}/notes`, id)
    ).then(() => {
      getNotesData();
      closeModal();
    });
  };

  const richToPlainText = (text: any) => {
    const contentStateFromRaw = convertFromRaw(text);
    const previewEditorState =
      EditorState.createWithContent(contentStateFromRaw);
    return previewEditorState;
  };
  return (
    <div>
      <div className=" mx-auto">
        <motion.div className="mx-auto px-4 mt-8 sm:px-6 lg:px-40">
          <div className="[column-fill:_balance] sm:columns-2 sm:gap-4 lg:columns-4 lg:gap-4">
            {MainNotesData.map((item) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: item.index * 0.1,
                  ease: "easeInOut",
                }}
                className={`mb-4 group sm:break-inside-avoid bg-gray-50 rounded-2xl p-6 border border-blue-500 relative`}
                key={item.id}
              >
                <div className="my-2 font-outfit tracking-wide text-blue-700 text-xl">
                  {item.title}
                </div>
                <Editor
                  editorState={richToPlainText(item.note)}
                  readOnly={true}
                  onChange={() => {}}
                  blockStyleFn={(contentBlock) => "preview-content-block"}
                />
                <div
                  onClick={openModal}
                  className="absolute right-4 top-4 group-hover:block md:hidden block cursor-pointer"
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
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
