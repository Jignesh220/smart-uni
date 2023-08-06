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
  });

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
        <div className="max-w-4xl md:min-w-[50rem] min-w-full my-4">
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
