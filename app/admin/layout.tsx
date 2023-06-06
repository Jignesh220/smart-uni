import React from 'react'
import Page from './page';
export const metadata = {
    title: "UniSol | Admin",
    description:
      "Admin Section Of Unisol",
  };
  
  export default function AdminLayout({
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
