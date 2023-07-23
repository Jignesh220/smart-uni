"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarAdmin } from "@/app/Reuseable/NavbarAdmin";
import { signOut, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, firebaseApp } from "@/app/Firebase/Firebase";
import Login from "../Login";
import Home from "./Home";
import { doc, getDoc } from "firebase/firestore";

export default function Page() {
  const route = useRouter();
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  const [loading2, setloading2] = React.useState(false);
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
  if (user && !admin) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <div className="text-3xl text-red-700 font-bold font-outfit tracking-wide">
          You Are Not Admin.
        </div>
      </div>
    );
  }

  if (error) {
    return route.push("/admin");
  }
  const handleLogout = () => {
    setloading2(true);
    try {
      signOut(auth).then(() => {
        route.push("/admin");
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || loading2) {
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
  if (user && admin) {
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
