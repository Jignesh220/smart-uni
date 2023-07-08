"use client";

import React from "react";
import { db } from "../Firebase/Firebase";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SmoothScrollbar from "../Reuseable/SmoothScrollbar";
import { Navbar } from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";

interface FormProps {
  name: string;
  email: string;
  type: string;
  message: string;
}
export default function Page() {
  const [Form, setForm] = React.useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [uploaded, setuploaded] = React.useState(false);

  const handleUploadData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Form.type !== "") {
      const uniqID = uuidv4();
      const ref = `ContactUs/${uniqID}`;
      const formData = doc(db, ref);
      const mySnapshot = await getDoc(formData);
      if (!mySnapshot.exists()) {
        await setDoc(formData, {
          fullName: Form.name,
          email: Form.email,
          type: Form.type,
          message: Form.message,
        }).then(() => {
          setuploaded(true);
        });
      }
    }
  };
  return (
    <SmoothScrollbar>
      <Navbar/>
      <div
        className="min-w-full"
        style={{
          minHeight: "50vh",
        }}
      >
        <div className="text-center text-3xl font-capriola mt-8 mb-4">
          Contact Us
        </div>
        <form
          action=""
          className=" flex flex-col gap-3 lg:px-60 md:px-24 md:mx-24 lg:mx-60 min-[0px]:mx-7"
          onSubmit={handleUploadData}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="block text-sm font-capriola ms-1 text-gray-700"
            >
              Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your Name"
              id="name"
              autoComplete="name"
              onChange={(e) => {
                setForm({ ...Form, name: e.target.value });
              }}
              required
            />
            <div
              className={`text-sm ${
                Form.name === "" ? "text-rose-600" : "text-green-600"
              } font-outfit`}
            >
              {Form.name === ""
                ? "Please Enter Your Name !"
                : `Hello! ${Form.name}`}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block text-sm font-capriola ms-1 text-gray-700"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="xyz@abc.com"
              id="email"
              autoComplete="email"
              onChange={(e) => {
                setForm({ ...Form, email: e.target.value });
              }}
              required
            />
            <div
              className={`text-sm ${
                Form.email === "" ? "text-rose-600" : "text-green-600"
              } font-outfit`}
            >
              {Form.email === ""
                ? "Please Enter Your Email!"
                : `We Will Contact on ${Form.email}`}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="request"
              className="block text-sm font-capriola ms-1 text-gray-700"
            >
              Request Type
            </label>
            <select
              id="request"
              name="request"
              required
              onChange={(e) => {
                setForm({ ...Form, type: e.target.value });
              }}
              className="flex w-full rounded-md border appearance-none border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Please Select one option</option>
              <option value="request_document">Request a Document</option>
              <option value="website_related_query">
                Website related Query
              </option>
              <option value="complaint">Register Complaint</option>
            </select>
            <div
              className={`text-sm ${
                Form.type === "" ? "text-rose-600" : "text-green-600"
              } font-outfit`}
            >
              {Form.type === ""
                ? "Please Select any one option"
                : `Looks Good...`}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="block text-sm font-capriola ms-1 text-gray-700"
            >
              Message
            </label>
            <textarea
              className="resize flex w-full rounded-md border border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your message"
              id="message"
              rows={10}
              autoComplete="message"
              onChange={(e) => {
                setForm({ ...Form, message: e.target.value });
              }}
              required
            />
            <div
              className={`text-sm ${
                Form.message === "" ? "text-rose-600" : "text-green-600"
              } font-outfit`}
            >
              {Form.message === ""
                ? "Please Enter Your Message!"
                : `Looks Good...`}
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 bg-blue-600 w-full p-1 rounded-full text-lg text-white font-outfit"
          >
            {uploaded
              ? "Your Message is Saved.We will contact you soon!"
              : "Submit"}
          </button>
        </form>
      </div>
      <Footer/>
    </SmoothScrollbar>
  );
}
