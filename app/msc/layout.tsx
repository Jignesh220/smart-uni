import React from 'react'
export const metadata = {
    title: "UniSmart | M.Sc",
    description:
      "Discover a vast selection of high-quality MSc notes and exam papers, tailored to meet your academic needs.",
  };
  export default function MScLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
   
        {children}
      </section>
    );
  }
