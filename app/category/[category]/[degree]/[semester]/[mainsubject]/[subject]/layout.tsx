import React from 'react'
export const metadata = {
    title: "UniSmart | Subject",
    description:
      "Discover a vast selection of high-quality notes and exam papers, tailored to meet your academic needs By Main Subject.",
  };
  export default function CategoryLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>
   
        {children}
      </section>
    );
  }
