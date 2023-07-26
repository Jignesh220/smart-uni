"use client";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { db } from "@/app/Firebase/Firebase";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { storage } from "@/app/Firebase/Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

export default function AddBlogs() {
  const [Form, setForm] = React.useState("");
  const [uploaded, setuploaded] = React.useState(false);
  const [RefrenceId, setRefrenceId] = useState("");
  const [CoverImage, setCoverImage] = useState<File | null>();
  const [loading, setloading] = useState(false)
  const [CoverImageError, setCoverImageError] = useState(true);
  const [percentage, setpercentage] = useState(0);
  const [BlogTitle, setBlogTitle] = useState("");
  const [BlogDescription, setBlogDescription] = useState("");

  const handleRichTextChange = (value: string) => {
    setForm(value);
  };

  const handleUploadData = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true)
    const uniqID = uuidv4();
    if (Form.length > 150 && CoverImage && BlogTitle !== "") {
      const ref = `blogs/${uniqID}`;
      const formData = doc(db, ref);
      const mySnapshot = await getDoc(formData);
      if (!mySnapshot.exists()) {
        await setDoc(formData, {
          id: uniqID,
          blogContent: Form,
          coverImage: await uploadAttechmentToStorage(CoverImage, uniqID),
          title: BlogTitle,
          description: BlogDescription,
        }).then(() => {
          setuploaded(true);
          setloading(false)
          setRefrenceId(uniqID);
        });
      }
    }else{
      setloading(false)
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCoverImage(file);

    if (file) {
      setCoverImageError(false);
    }
  };
  const uploadAttechmentToStorage = (attachmentFile: File, id: string) => {
    return new Promise((resolve, rejects) => {
      if (!attachmentFile) {
        rejects("file not atteched!");
      }
      const path = `blogs/${id}/coverImage`;
      const attachmentupload = ref(storage, path);
      const uploadTask = uploadBytesResumable(attachmentupload, attachmentFile);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setpercentage(percent > 2 ? percent - 2 : 0);
        },
        (err: Error) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  };

  // const UploadFileToStorage = async () => {
  //   try {
  //     if (CoverImage) {
  //       setfileUploading(true);
  //       const path = `blogs/${uniqID}/coverImage`;
  //       const adharcardupload = ref(storage, path);
  //       const uploadTask = uploadBytesResumable(adharcardupload, CoverImage);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot: any) => {
  //           const percent = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //           setpercentage(percent);
  //         },
  //         (err: Error) => console.log(err),
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //             setCoverImageLink(url);
  //             setfileUploading(false);
  //             setimageUploaded(true);
  //           });
  //         }
  //       );
  //     } else {
  //       alert("select the file or write name first!!");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred while adding the watermark");
  //   }
  // };
  const fontOptions = [
    "mainjari", // Your custom font name
    "varela_Round",
    "eb_Garamond",
  ];
  if (loading) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        {/* <span className="loader"></span> */}
        <div className="text-8xl font-outfit font-extrabold">
          {percentage} %
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center bg-gradient-to-b from-white to-red-100">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4 text-center font-outfit">
          {uploaded ? "Your Blog Data is Uploaded" : "Write A Blog"}
        </h1>
        {uploaded ? (
          <div className="">
            <div className="text-xl font-outfit font-bold tracking-wide text-black/60">
              Blog refrence Id : {RefrenceId}
            </div>
          </div>
        ) : (
          <div className="lg:px-60 md:px-20 px-0">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="block text-sm font-outfit font-bold tracking-wide ms-1 text-gray-700"
              >
                Blog Title
              </label>
              <input
                className="flex h-10 w-full rounded-md border focus:border-2 border-gray-300 focus:border-blue-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Blog Title"
                id="name"
                autoComplete="name"
                onChange={(e) => {
                  setBlogTitle(e.target.value);
                }}
                required
              />
              <div
                className={`text-sm ${
                  BlogTitle === "" ? "text-rose-600/75" : "text-green-600/75"
                } font-outfit font-bold tracking-wide`}
              >
                {BlogTitle === "" ? "Please Enter Blog Name !" : `Looks Good`}
              </div>
            </div>

            <div className="flex flex-col gap-1 my-2">
              <label
                htmlFor="description"
                className="block text-sm font-outfit font-bold tracking-wide ms-1 text-gray-700"
              >
                Blog Description
              </label>
              <textarea
                className="flex w-full rounded-md border focus:border-2 border-gray-300 focus:border-blue-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                rows={12}
                placeholder="Enter Blog Description"
                id="description"
                autoComplete="description"
                onChange={(e) => {
                  setBlogDescription(e.target.value);
                }}
                required
              />
              <div
                className={`text-sm ${
                  BlogDescription === ""
                    ? "text-rose-600/75"
                    : "text-green-600/75"
                } font-outfit font-bold tracking-wide`}
              >
                {BlogTitle === "" ? "Please Enter Blog Name !" : `Looks Good`}
              </div>
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label
                htmlFor="fileUpload"
                className="block text-sm font-varela_Round font-bold ms-1 text-gray-700"
              >
                Choose Cover Image (All formate of Image)
              </label>
              <div className="flex flex-row gap-2">
                <input
                  type="file"
                  name="file upload"
                  id="fileUpload"
                  className="flex w-full rounded-md appearance-none bg-transparent text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-300 file:w-full file:text-blue-700
                  hover:file:bg-blue-700 hover:file:text-blue-100"
                  onChange={handleFile}
                  accept="image/*"
                  required
                />
                {/* <button
                  type="button"
                  className="w-2/5 font-bold bg-rose-300 text-rose-700 hover:bg-rose-700 hover:text-rose-200 text-center rounded-lg font-varela_Round font-font-bold tracking-wider"
                  onClick={UploadFileToStorage}
                >
                  {imageUploaded
                    ? "Done"
                    : fileUploading
                    ? percentage + " % "
                    : "Upload"}
                </button> */}
              </div>

              <div
                className={`text-sm mt-1 tracking-wider font-bold ${
                  CoverImageError ? "text-red-500" : "text-green-500"
                } font-mainjari`}
              >
                {CoverImageError
                  ? "Please Select a Cover image"
                  : `${CoverImage?.name} ( ${
                      CoverImage
                        ? (CoverImage?.size / 1048576).toFixed(2)
                        : null
                    } MB  )`}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden mx-3 md:mx-8 lg:mx-0 shadow-2xl shadow-slate-400">
              <ReactQuill
                value={Form}
                onChange={handleRichTextChange}
                theme="snow"
                className="bg-white rounded-3xl border-none min-h-screen outline-none"
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
                    [{ font: ["krylon"] }],
                    [{ align: [] }],
                    ["link", "image"],
                    ["clean"],
                  ],
                  clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                  },
                }}
              />
            </div>
            <button
              disabled={Form.length < 100}
              onClick={handleUploadData}
              className="bg-blue-900 font-varela_Round font-bold tracking-wider p-2 px-4 mt-10 w-full text-white rounded-full shadow-xl disabled:shadow-md shadow-slate-400 disabled:bg-slate-400"
            >
              {Form.length < 100
                ? "Blog have to Contain 100 or more character"
                : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
