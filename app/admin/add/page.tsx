"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NavbarAdmin } from "@/app/Reuseable/NavbarAdmin";
import { signOut, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "@/app/Firebase/Firebase";
import Login from "../Login";
import Home from "./Home";


export default function page() {
  const route = useRouter();
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  const [loading2, setloading2] = React.useState(false);
  if (error) {
    return route.push("/admin");
  }

  if (loading || loading2) {
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
  if (user) {
    return (
      <div className="relative">
        <NavbarAdmin />
        <Home/>
      </div>
    );
  }
  return (
    <div>
      <Login />
    </div>
  );
}
