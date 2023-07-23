"use client";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { db, firebaseApp } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { throws } from "assert";
import { doc, getDoc } from "firebase/firestore";

export default function Page() {
  const route = useRouter();
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      getAdminInfo();
    }
  }, [user]);

  const getAdminInfo = async () => {
    const path = `Admin/${auth.currentUser?.uid}`;
    const AdminInfo = doc(db, path);
    const isAdmin = await getDoc(AdminInfo);
    if (isAdmin.exists()) {
      setAdmin(isAdmin.data().Admin);
    } else {
      setAdmin(false);
    }
  };

  if (user && admin) {
    return route.push("/admin/home");
  }
  if (user && !admin) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <div className="text-3xl text-red-700 font-bold font-outfit tracking-wide">
          You Are Not Admin.
        </div>
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
      <Login />
    </div>
  );
}
