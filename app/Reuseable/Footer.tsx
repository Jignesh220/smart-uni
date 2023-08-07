"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon";
import { motion } from "framer-motion";
import Instagram from "../ContactSVG/Instagram";
import Facebook from "../ContactSVG/Facebook";
import Mail from "../ContactSVG/Mail";
import Twitter from "../ContactSVG/Twitter";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

export default function Footer() {
  const [DegreeViewPoint, setDegreeViewPoint] = React.useState(false);
  const [emailForSubscription, setemailForSubscription] = useState("");
  const [notification, setnotification] = useState("please enter valid email");
  const [isNotificationVisible, setisNotificationVisible] = useState(true);
  const handleUploadData = async (e: React.FormEvent) => {
    e.preventDefault();
    const uniqID = uuidv4();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForSubscription)) {
      const ref = `Subscription/${uniqID}`;
      const formData = doc(db, ref);
      await setDoc(formData, {
        id: uniqID,
        email: emailForSubscription,
      }).then(() => {
        setisNotificationVisible(true);
        setnotification("You email is saved!");
      });
    }
  };
  useEffect(() => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForSubscription)) {
      setisNotificationVisible(false);
    }
  }, [emailForSubscription]);

  return (
    <motion.footer
      initial={{
        scale: 0,
        opacity: 0,
      }}
      onViewportEnter={() => {
        setDegreeViewPoint(true);
      }}
      animate={
        DegreeViewPoint
          ? {
              scale: 1,
              opacity: 1,
            }
          : {}
      }
      transition={{
        type: "spring",
      }}
      aria-label="Site Footer"
      className="mt-24 my-3 mx-3 rounded-3xl"
    >
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={
          DegreeViewPoint
            ? {
                scale: 1,
                opacity: 1,
              }
            : {}
        }
        transition={{
          delay: 0.3,
          type: "spring",
        }}
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* update subscription button */}
        <center className="md:min-w-[80rem] min-w-full flex justify-center">
          <div className="flex md:flex-row flex-col md:gap-0 gap-2 md:min-w-[30rem] min-w-full bg-purple-200 md:rounded-full rounded-xl overflow-hidden p-2">
            <input
              type="text"
              id="Subscribe"
              placeholder="abc@xyz.com"
              onChange={(e) => {
                setemailForSubscription(e.target.value);
              }}
              className="w-full px-4 rounded-full bg-transparent outline-none border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            />
            <button
              type="button"
              onClick={handleUploadData}
              className="bg-purple-800 md:py-0 py-3 md:tracking-normal tracking-wide text-white rounded-full px-4 md:text-xs text-sm hover:text-white/75"
            >
              <span className="sr-only">Search</span>
              subscribe for updates
            </button>
          </div>
        </center>
        {isNotificationVisible && (
          <div
            className={`text-sm mt-2 text-center font-outfit ${
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForSubscription)
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {notification}
          </div>
        )}

        {/* About senction */}
        <p className="mx-auto mt-6 max-w-6xl text-center font-outfit font-bold tracking-wider leading-relaxed text-blue-800 text-opacity-50">
          Welcome to our college website, a comprehensive platform designed to
          support your academic journey, offering subject notes, old exam
          papers, and project guidance. Access well-organized resources, prepare
          for exams effectively, and get step-by-step instructions to excel in
          academic projects. Visit our website today and enrich your learning
          experience.
        </p>

        <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/#Category"
              >
                Category
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="#"
              >
                Q&A
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/about-us"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                className="text-blue-800 font-bold tracking-wide font-outfit hover:text-opacity-75"
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="mt-12 flex justify-center gap-5">
          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <motion.div
                whileHover={{
                  scale: 1.2,
                  color: "rgb(185 28 28)",
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                className="w-fit rounded-full bg-red-100 p-2"
              >
                <span className="sr-only">EMail</span>
                <Mail />
              </motion.div>
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <motion.div
                whileHover={{
                  scale: 1.2,
                  color: "rgb(30 64 175)",
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                className="w-fit rounded-full bg-blue-100 p-2"
              >
                <span className="sr-only">Facebook</span>
                <Facebook />
              </motion.div>
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <motion.div
                whileHover={{
                  scale: 1.2,
                  color: "rgb(219 39 119)",
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                className="w-fit rounded-full bg-pink-100 p-2"
              >
                <span className="sr-only">Instagram</span>
                <Instagram />
              </motion.div>
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <motion.div
                whileHover={{
                  scale: 1.2,
                  color: "rgb(29 78 216)",
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                className="w-fit rounded-full bg-blue-100 p-2"
              >
                <span className="sr-only">Twitter</span>
                <Twitter />
              </motion.div>
            </Link>
          </li>
        </ul>
      </motion.div>
      <div className="flex justify-center flex-row gap-2 font-outfit -mt-4 pb-8">
        Design and Develop By
        <span className="text-blue-800">
          {"  "}
          <Link href="https://jignesh-baria.vercel.app/" target="_blank">
            Jignesh Baria
          </Link>
        </span>
      </div>
      <div className="flex justify-center flex-row gap-2 font-outfit -mt-4 pb-8">
        Copyright &copy;2023{" "}
        <span className="text-blue-800">
          {"  "}
          <Link href="/">UniSmart</Link>
        </span>
      </div>
    </motion.footer>
  );
}
