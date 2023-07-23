import React, { useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import { motion } from "framer-motion";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NotesData() {
  const [user] = useAuthState(auth);
  const [MainNotesData, setMainNotesData] = React.useState<DocumentData[]>([]);
  useEffect(() => {
    if (user) {
      getNotesData();
    }
  }, [db]);

  const getNotesData = async () => {
    const path = `/UserData/${auth.currentUser?.uid}/notes`;
    const bseInformation = collection(db, path);
    const mySnapshot: QuerySnapshot = await getDocs(bseInformation);
    mySnapshot.forEach((doc) => {
      setMainNotesData((arr) => [...arr, doc.data()]);
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
          <div className="[column-fill:_balance] sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-4">
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
                className={`mb-4 sm:break-inside-avoid bg-gray-50 rounded-2xl p-6 border border-blue-500`}
                key={item.id}
              >
                <div className="my-2 font-outfit tracking-wide text-blue-700 text-xl">
                    {
                        item.title
                    }
                </div>
                <Editor
                  editorState={richToPlainText(item.note)}
                  readOnly={true}
                  onChange={() => {}}
                  blockStyleFn={(contentBlock) => "preview-content-block"}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
