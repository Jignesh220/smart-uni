"use client";
import React from 'react'

export default function error() {
  return (
    <div
        className="min-h-screen min-w-full flex justify-center items-center"
        style={{
          backgroundColor: "#000029",
        }}
      >
        <div className="text-3xl font-capriola font-bold text-white">
          Somthing went wrong!!
        </div>
      </div>
  )
}
