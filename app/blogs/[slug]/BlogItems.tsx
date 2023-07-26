"use client";
import React, { useEffect } from "react";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "@/app/Firebase/Firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function BlogItem({id}:any) {
  const [BlogData, setBlogData] = React.useState<DocumentData[]>([]);
  useEffect(() => {
    GetBlogData();
  }, [id]);

  const GetBlogData = async () => {
    const ref = `/blogs/${id}`;
    const docRef = doc(db, ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBlogData((arr) => [...arr, docSnap.data()]);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <div>
      <div className="min-h-screen min-w-full bg-white py-8">
        <div className="lg:px-60 md:px-20 min-[0px]:px-2">
          <div
            className="bg-violet-50 md:p-8 min-[0px]:p-2 min-h-screen min-w-full rounded-3xl"
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            {BlogData.map((item) => (
              <div
                className="flex min-w-full justify-center font-outfit"
                key={item.id}
              >
                <ReactQuill
                  value={item.blogContent}
                  className="font-outfit"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"], // toggled buttons
                      ["blockquote", "code-block"],

                      [{ header: 1 }, { header: 2 }], // custom button values
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ script: "sub" }, { script: "super" }], // superscript/subscript
                      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                      [{ direction: "rtl" }], // text direction

                      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],

                      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                      [{ font: ["outfit"] }],
                      [{ align: [] }],

                      ["clean"],
                    ],
                  }}
                  readOnly={true}
                  theme={"bubble"}
                ></ReactQuill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
