"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";
import Notes from "./Notes";
import Login from "../auth/Login";

export default function Page() {
  const route = useRouter();
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  if (user) {
    return (
      <div>
        <Navbar />
        <Notes />
        <Footer />
      </div>
    );
  }
  if (loading) {
    return (
      <div
        className="min-h-screen min-w-full flex justify-center items-center"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="text-3xl font-capriola font-bold text-white">
          <span className="loader"></span>
        </div>
      </div>
    );
  }
  if (error) {
    throw new Error("somthing went wrong!!");
  }
  return (
    <div>
      <Navbar/>
      <Login />
      <Footer/>
    </div>
  );
}
