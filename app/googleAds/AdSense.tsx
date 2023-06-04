"use client"
import React from "react";
import { useEffect } from "react";
import Head from "next/head";

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export default function AdSense() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      </Head>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="YOUR_ADSENSE_CLIENT_ID"
        data-ad-slot="YOUR_ADSENSE_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
