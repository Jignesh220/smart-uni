import React from "react";
import { auth, db, storage } from "@/app/Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { PDFDocument, rgb } from "pdf-lib";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { error } from "console";

interface FormProps {
  university: string;
  degree: string;
  semester: string;
  mainSubject: string;
  subSubject: string;
  category: string;
  documentPdf: File | null;
  subjectCode: string;
  docYear: string;
  fileName: string;
  Tag_1: string;
  Tag_2: string;
  Tag_3: string;
  Tag_4: string;
  Tag_5: string;
  fileURL: string;
}

export default function Home() {
  const [user] = useAuthState(auth);
  const [percentage, setpercentage] = React.useState(0);
  const [fileUploading, setfileUploading] = React.useState(false);
  const [dataUploading, setdataUploading] = React.useState(false);
  const [uploadSuccessfull, setuploadSuccessfull] = React.useState({
    pdfUpload: false,
    dataUpload: false,
  });
  const [form, setForm] = React.useState<FormProps>({
    university: "",
    degree: "",
    semester: "",
    mainSubject: "",
    subSubject: "",
    category: "",
    documentPdf: null,
    subjectCode: "",
    docYear: "",
    fileName: "",
    Tag_1: "",
    Tag_2: "",
    Tag_3: "",
    Tag_4: "",
    Tag_5: "",
    fileURL: "",
  });
  const [formError, setFormError] = React.useState({
    university: true,
    degree: true,
    semester: true,
    mainSubject: true,
    subSubject: true,
    category: true,
    documentPdf: true,
    subjectCode: true,
    docYear: true,
    fileName: true,
    Tag_1: true,
    Tag_2: true,
    Tag_3: true,
    Tag_4: true,
    Tag_5: true,
  });
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const fileURL = file ? URL.createObjectURL(file) : null;
    const blobpdf = new Blob(file ? [file] : []);
    setForm({ ...form, documentPdf: file });

    if (file) {
      setFormError({ ...formError, documentPdf: false });
      console.log(file);
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error("Unable to read file"));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const UploadFileToStorage = async () => {
    try {
      if (form.documentPdf) {
        const pdfBytes = await readFileAsArrayBuffer(form.documentPdf);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();

        const font = await pdfDoc.embedFont("Helvetica-Bold");
        const watermarkSize = 80;
        const watermarkColor = rgb(0.5, 0.5, 0.5);

        for (const page of pages) {
          const { width, height } = page.getSize();
          const textWidth = font.widthOfTextAtSize("UniSmart", watermarkSize);
          const textHeight = font.heightAtSize(watermarkSize);

          page.drawText("UniSmart", {
            x: (width - textWidth) / 2,
            y: height - textHeight - 200,
            size: watermarkSize,
            font: font,
            color: watermarkColor,
            opacity: 0.3,
          });
          page.drawText("UniSmart", {
            x: (width - textWidth) / 2,
            y: 200,
            size: watermarkSize,
            font: font,
            color: watermarkColor,
            opacity: 0.3,
          });
        }
        // const watermarkFile = await pdfDoc.save();
        if (
          form.documentPdf &&
          form.degree &&
          form.semester &&
          form.category &&
          form.fileName
        ) {
          setfileUploading(true);
          const path = `${form.degree}/${form.semester}/${form.category}/${form.fileName}`;
          const adharcardupload = ref(storage, path);
          const metadata = {
            contentType: "application/pdf",
          };
          const uploadTask = uploadBytesResumable(
            adharcardupload,
            await pdfDoc.save(),
            metadata
          );

          uploadTask.on(
            "state_changed",
            (snapshot: any) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setpercentage(percent);
            },
            (err: Error) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setForm({ ...form, fileURL: url });
                setfileUploading(false);
                setuploadSuccessfull({ ...uploadSuccessfull, pdfUpload: true });
              });
            }
          );
        } else {
          alert("select the file or write name first!!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the watermark");
    }
  };

  const handleSendToServer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.fileURL) {
      setdataUploading(true);
      const uniqID = uuidv4();
      const path = `university/${form.university}/${form.degree}/${form.semester}/${form.mainSubject}/${form.subSubject}/${form.category}/${uniqID}`;
      const docInformation = doc(db, path);
      const mySnapshot = await getDoc(docInformation);
      if (!mySnapshot.exists()) {
        await setDoc(docInformation, {
          id: uniqID,
          university: form.university,
          degree: form.degree,
          semester: form.semester,
          mainSubject: form.mainSubject,
          subject: form.subSubject,
          category: form.category,
          subjectCode: form.subjectCode,
          DocumentYear: form.docYear,
          fileName: form.fileName,
          fileURL: form.fileURL,
          tag1: form.Tag_1,
          tag2: form.Tag_2,
          tag3: form.Tag_3,
          tag4: form.Tag_4,
          tag5: form.Tag_5,
        }).then(async () => {
          const uid = uuidv4();
          const MainSubjectPath = `university/${form.university}/${form.degree}_${form.semester}/${form.mainSubject}`;
          const MainSubjectInfomation = doc(db, MainSubjectPath);
          await setDoc(MainSubjectInfomation, {
            id: uid,
            dataID: uniqID,
            university: form.university,
            degree: form.degree,
            semester: form.semester,
            mainSubject: form.mainSubject,
            url: form.mainSubject,
          })
            .then(async () => {
              const uniqId = uuidv4();
              const SubjectPath = `university/${form.university}/${form.degree}/${form.semester}/${form.mainSubject}/${form.subSubject}`;
              const SubjectInformation = doc(db, SubjectPath);
              await setDoc(SubjectInformation, {
                id: uniqId,
                dataID: uniqID,
                university: form.university,
                degree: form.degree,
                semester: form.semester,
                mainSubject: form.mainSubject,
                subject: form.subSubject,
                url: form.subSubject,
              }).then((error) => {
                console.log(error);
                setdataUploading(false);
                setuploadSuccessfull({
                  ...uploadSuccessfull,
                  dataUpload: true,
                });
              });
            })
            .then(async () => {
              const unqId = uuidv4();
              const allDataPath = `allData/${form.university}/${form.degree}/${uniqID}`;
              const allData = doc(db, allDataPath);
              await setDoc(allData, {
                aDocid: uniqID,
                id: unqId,
                university: form.university,
                degree: form.degree,
                semester: form.semester,
                mainSubject: form.mainSubject,
                subject: form.subSubject,
                category: form.category,
                subjectCode: form.subjectCode,
                DocumentYear: form.docYear,
                fileName: form.fileName,
                fileURL: form.fileURL,
                tag1: form.Tag_1,
                tag2: form.Tag_2,
                tag3: form.Tag_3,
                tag4: form.Tag_4,
                tag5: form.Tag_5,
              }).then((error) => {
                console.log(error);
              });
            })
            .then((error) => {
              console.log(error);
            });
        });
      }
    } else {
      alert("first Upload File!!");
    }
  };

  return (
    <div>
      <div className={`min-h-screen pt-2`}>
        <div className="text-center font-bold font-capriola text-3xl text-black mt-24 mb-8">
          Add Somthing
        </div>
        <div className="flex justify-center min-w-full">
          <div className="lg:w-2/5 md:w-3/4 min-[0px]:w-11/12 min-h-screen flex flex-col">
            <form
              className="flex flex-col gap-5 mt-8"
              onSubmit={handleSendToServer}
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="uniName"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  University Name
                </label>
                <select
                  onChange={(e) => {
                    setForm({ ...form, university: e.target.value });
                    if (e.target.value.length > 0) {
                      setFormError({ ...formError, university: false });
                    }
                  }}
                  id="uniName"
                  name="uniName"
                  required
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Please Select one option</option>
                  <option value="govind_guru">
                    Shri Govind Guru University Godhra
                  </option>
                  <option value="gujarat_university">Gujarat University</option>
                  <option value="gtu">Gujarat Technological University</option>
                </select>
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.university ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.university
                    ? "Please Select one option"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="degree"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Degree
                </label>
                <select
                  onChange={(e) => {
                    setForm({ ...form, degree: e.target.value });
                    if (e.target.value.length > 0) {
                      setFormError({ ...formError, degree: false });
                    }
                  }}
                  id="degree"
                  name="degree"
                  required
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Please Select Degree</option>
                  <option value="BachelorOfScience">
                    Bachelor of Science (B.Sc)
                  </option>
                  <option value="MasterOfScience">
                    Master Of Science (M.Sc)
                  </option>
                  <option value="BachelorOfEngineering">
                    Bachelor of Engineering (B.E)
                  </option>
                </select>
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.degree ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.degree ? "Please Select one option" : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="semester"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Semester
                </label>
                <select
                  onChange={(e) => {
                    setForm({ ...form, semester: e.target.value });
                    if (e.target.value.length > 0) {
                      setFormError({ ...formError, semester: false });
                    }
                  }}
                  id="semester"
                  name="semester"
                  disabled={!(form.degree.length > 0)}
                  required
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Please Select Semester</option>
                  <option value="semester_1">Semester 1</option>
                  <option value="semester_2">Semester 2</option>
                  <option value="semester_3">Semester 3</option>
                  <option value="semester_4">Semester 4</option>
                  {form.degree == "BachelorOfScience" ||
                  form.degree == "BachelorOfEngineering" ? (
                    <option value="semester_5">Semester 5</option>
                  ) : null}
                  {form.degree == "BachelorOfScience" ||
                  form.degree == "BachelorOfEngineering" ? (
                    <option value="semester_6">Semester 6</option>
                  ) : null}
                  {form.degree == "BachelorOfEngineering" && (
                    <option value="semester_7">Semester 7</option>
                  )}
                  {form.degree == "BachelorOfEngineering" && (
                    <option value="semester_8">Semester 8</option>
                  )}
                </select>
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.semester ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {!(form.degree.length > 0)
                    ? "please select degree first"
                    : formError.semester
                    ? "Please Select one option"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="MainSubject"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Main Subject
                </label>
                <input
                  type="text"
                  name="main subject"
                  id="MainSubject"
                  placeholder="Enter Main Subject"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      mainSubject: e.target.value.split(" ").join(""),
                    });
                    if (e.target.value.length > 2) {
                      setFormError({ ...formError, mainSubject: false });
                    } else {
                      setFormError({ ...formError, mainSubject: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.mainSubject ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.mainSubject
                    ? "Please Enter Main subject Name (at least 3 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="SubSubject"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="sub subject"
                  id="SubSubject"
                  placeholder="Enter Subject"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      subSubject: e.target.value.split(" ").join(""),
                    });
                    if (e.target.value.length > 2) {
                      setFormError({ ...formError, subSubject: false });
                    } else {
                      setFormError({ ...formError, subSubject: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.subSubject ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.subSubject
                    ? "Please Enter Sub subject Name (at least 3 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Category
                </label>
                <select
                  onChange={(e) => {
                    setForm({ ...form, category: e.target.value });
                    if (e.target.value.length > 0) {
                      setFormError({ ...formError, category: false });
                    } else {
                      setFormError({ ...formError, category: true });
                    }
                  }}
                  id="category"
                  name="category"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Please Select Category</option>
                  <option value="oldPaper">Old Paper</option>
                  <option value="assignment">Assignment</option>
                  <option value="notes">Notes</option>
                  <option value="syllabus">syllabus</option>
                  <option value="projectGuide">Project Guide</option>
                </select>
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.category ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.category
                    ? "Please Select one option"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="SubjectCode"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Subject Code
                </label>
                <input
                  type="text"
                  name="Subject Code"
                  id="SubjectCode"
                  placeholder="Enter Subject Code"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, subjectCode: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, subjectCode: false });
                    } else {
                      setFormError({ ...formError, subjectCode: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.subjectCode ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.subjectCode
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="docYear"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Document Year
                </label>
                <input
                  type="text"
                  name="Document Year"
                  id="docYear"
                  placeholder="Enter Document Year"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, docYear: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, docYear: false });
                    } else {
                      setFormError({ ...formError, docYear: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.docYear ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.docYear
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="fileName"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  File Name
                </label>
                <input
                  type="text"
                  name="File Name"
                  id="fileName"
                  placeholder="Enter File Name"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, fileName: e.target.value });
                    if (e.target.value.length > 2) {
                      setFormError({ ...formError, fileName: false });
                    } else {
                      setFormError({ ...formError, fileName: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.fileName ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.fileName
                    ? "Please Enter Subject code Name (at least 4 characters)  -   Exmaple : Dec-2022"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="fileUpload"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Choose File (*.pdf)
                </label>
                <div className="flex flex-row gap-2">
                  <input
                    type="file"
                    name="file upload"
                    id="fileUpload"
                    accept=".pdf"
                    className="flex w-full rounded-md appearance-none bg-transparent text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-300 file:w-full file:text-blue-700
                  hover:file:bg-blue-700 hover:file:text-blue-100"
                    onChange={handleFile}
                    required
                  />
                  <button
                    type="button"
                    className="w-2/5 bg-rose-300 text-rose-700 hover:bg-rose-700 hover:text-rose-200 text-center rounded-lg font-outfit font-font-bold tracking-wider"
                    onClick={UploadFileToStorage}
                  >
                    {uploadSuccessfull.pdfUpload
                      ? "Done"
                      : fileUploading
                      ? percentage + " % "
                      : "Upload"}
                  </button>
                </div>

                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.documentPdf ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.documentPdf
                    ? "Please Select a File"
                    : `${form.documentPdf?.name} ( ${
                        form.documentPdf
                          ? (form.documentPdf?.size / 1048576).toFixed(2)
                          : null
                      } MB  )`}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tag1"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Tag 1
                </label>
                <input
                  type="text"
                  name="Tag1"
                  id="tag1"
                  placeholder="Enter Tag 1"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, Tag_1: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, Tag_1: false });
                    } else {
                      setFormError({ ...formError, Tag_1: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.Tag_1 ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.Tag_1
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tag2"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Tag 2
                </label>
                <input
                  type="text"
                  name="Tag2"
                  id="tag2"
                  placeholder="Enter Tag 2"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, Tag_2: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, Tag_2: false });
                    } else {
                      setFormError({ ...formError, Tag_2: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.Tag_2 ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.Tag_2
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tag3"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Tag 3
                </label>
                <input
                  type="text"
                  name="Tag3"
                  id="tag3"
                  placeholder="Enter Tag 3"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, Tag_3: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, Tag_3: false });
                    } else {
                      setFormError({ ...formError, Tag_3: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.Tag_3 ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.Tag_3
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tag4"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Tag 4
                </label>
                <input
                  type="text"
                  name="Tag4"
                  id="tag4"
                  placeholder="Enter Tag 4"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, Tag_4: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, Tag_4: false });
                    } else {
                      setFormError({ ...formError, Tag_4: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.Tag_4 ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.Tag_4
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tag5"
                  className="block text-sm font-capriola ms-1 text-gray-700"
                >
                  Tag 5
                </label>
                <input
                  type="text"
                  name="Tag5"
                  id="tag5"
                  placeholder="Enter Tag 5"
                  className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    setForm({ ...form, Tag_5: e.target.value });
                    if (e.target.value.length > 1) {
                      setFormError({ ...formError, Tag_5: false });
                    } else {
                      setFormError({ ...formError, Tag_5: true });
                    }
                  }}
                  required
                />
                <div
                  className={`text-sm mt-1 tracking-wider font-bold ${
                    formError.Tag_5 ? "text-red-500" : "text-green-500"
                  } font-outfit`}
                >
                  {formError.Tag_5
                    ? "Please Enter Subject code Name (at least 2 characters)"
                    : "Looks Good"}
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-blue-100 p-2 rounded-full font-outfit font-bold text-sm tracking-wider"
                >
                  {uploadSuccessfull.dataUpload
                    ? "Data Successfully uploaded !!"
                    : dataUploading
                    ? "Uploading..."
                    : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-48"></div>
    </div>
  );
}
