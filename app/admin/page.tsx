"use client";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { throws } from "assert";

export default function Page() {
  const route = useRouter();
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  if (user) {
    return route.push("/admin/home");
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
      <Login />
    </div>
  );
}
