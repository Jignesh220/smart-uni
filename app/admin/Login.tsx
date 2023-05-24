"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import firebase from "firebase/compat/app";
import { error } from "console";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    try {
      signInWithEmailAndPassword(auth, Form.email, Form.password).then(() => {
        router.push("/admin/home");
      });
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen min-w-full flex justify-center items-center"
        style={{
          backgroundColor: "#000029",
        }}
      >
        <div className="text-3xl font-capriola font-bold text-white">
          <span className="loader"></span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <motion.svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute top-0 left-0 w-full h-full block"
        initial={{
          background: "linear-gradient(to right, #01657B, #003D51)",
        }}
        animate={{
          background: "linear-gradient(to right, #0D1645, #0E5150)",
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <defs>
          <linearGradient id="bg">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(130, 158, 249, 0.06)" }}
            ></stop>
            <stop
              offset="50%"
              style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}
            ></stop>
            <stop
              offset="100%"
              style={{ stopColor: "rgba(115, 209, 72, 0.2)" }}
            ></stop>
          </linearGradient>
          <motion.path
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            id="wave"
            fill="url(#bg)"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>
        <g>
          <use xlinkHref="#wave" opacity=".3">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="14s"
              calcMode="spline"
              values="270 230; -334 180; 270 230"
              keyTimes="0; .5; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity=".6">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="-270 230;243 220;-270 230"
              keyTimes="0; .6; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity=".9">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use xlinkHref="#wave" opacity=".4">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </motion.svg>
      <div className="absolute">
        <div className="min-h-screen w-screen flex justify-center items-center flex-col gap-3">
          <div className="bg-white min-h-fit py-8 lg:w-2/5 md:w-2/3 min-[0px]:w-11/12 rounded-3xl p-4 lg:px-24 md:px-14 min-[0px]:px-5">
            <div className="flex flex-col gap-3 justify-center">
              <div className="text-center font-outfit text-3xl tracking-wider font-bold">
                Login
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-capriola ms-1 text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-blue-500/75 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your Password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setForm({ ...Form, password: e.target.value });
                    }}
                    required
                  />
                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center mt-6">
                    <button
                      type="button"
                      className="rounded-full text-black"
                      onClick={() => {
                        setpasswordVisible(!passwordVisible);
                      }}
                    >
                      <span className="sr-only">Submit</span>
                      {passwordVisible ? (
                        <svg
                          className="feather feather-eye w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          className="feather feather-eye-off w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" x2="23" y1="1" y2="23" />
                        </svg>
                      )}
                    </button>
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 w-full text-center py-2 rounded-full text-white font-outfit font-bold tracking-wider mt-6 shadow-md shadow-slate-400"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
