"use client";

import React, { useState, useEffect } from "react";
import { NavbarAdmin } from "@/app/Reuseable/NavbarAdmin";
import { motion } from "framer-motion";
import axios from "axios";

export default function SendMail() {
  const [buttonDisable, setbuttonDisable] = useState(true);
  const [uploaded, setuploaded] = useState(false);
  const [sendBackend, setsendBackend] = useState({
    email: ["jigneshpatel17777@gmail.com", "jigneshbaria1309@gmail.com"],
    htmltable: "",
    subject: "",
    name: "",
  });
  const PerviewHtml = `<table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
  <tbody>
    <tr>
      <td>
        <table style="border-collapse:collapse;width:100%">
          <tr>
            <th style="border:0.5px solid #FFE0FC;font-size:14px;text-align:center;padding:8px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">Degree</th>
            <th style="border:0.5px solid #FFE0FC;font-size:14px;text-align:center;padding:8px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">Subject</th>
            <th style="border:0.5px solid #FFE0FC;font-size:14px;text-align:center;padding:8px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">Sub Subjects</th>
          </tr>
          ${sendBackend.htmltable}
        </table>
      </td>
    </tr>
  </tbody>
</table>`;

  useEffect(() => {
    if (sendBackend.htmltable.length > 10 && sendBackend.email.length > 0) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  }, [sendBackend]);

  const sendEMailToUser = async () => {
    try {
      const response = await axios.post("/api/sendemail", sendBackend);
      console.log(response);
      setuploaded(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  if (uploaded) {
    return (
      <div
        className="min-h-screen min-w-full flex justify-center items-center"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="text-5xl font-outfit font-bold text-black">
          Email Sent
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="my-16 flex flex-col min-w-full justify-center items-center min-h-screen px-2">
        <div className="max-w-4xl md:min-w-[50rem] min-w-full my-4 flex flex-col gap-4">
        <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter senders Name(Your Name)"
            onChange={(e) => {
              setsendBackend({ ...sendBackend, name: e.target.value });
            }}
            className="w-full rounded-full px-6 h-10 bg-blue-100 border-gray-200 pe-10 shadow-sm sm:text-sm"
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter Subject for email"
            onChange={(e) => {
              setsendBackend({ ...sendBackend, subject: e.target.value });
            }}
            className="w-full rounded-full px-6 h-10 bg-blue-100 border-gray-200 pe-10 shadow-sm sm:text-sm"
          />
          <textarea
            id="OrderNotes"
            className="mt-2 p-8 w-full rounded-3xl bg-blue-100 border-gray-200 align-top shadow-sm sm:text-sm"
            rows={50}
            placeholder="Add updated file code..."
            onChange={(e) => {
              setsendBackend({ ...sendBackend, htmltable: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="text-4xl font-outfit font-bold mt-8">Perview</div>
        <div className="my-8">
          <div dangerouslySetInnerHTML={{ __html: PerviewHtml }}></div>
        </div>
        <div className="max-w-4xl md:min-w-[50rem] min-w-full">
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            whileHover={{
              scale: 1.02,
            }}
            transition={{
              type: "spring",
            }}
            disabled={buttonDisable}
            onClick={sendEMailToUser}
            className="p-2 w-full px-8 rounded-lg bg-blue-600 text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {buttonDisable ? "Fill details first!!" : "Send"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
