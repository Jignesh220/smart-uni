import React from "react";
export const metadata = {
  title: "UniSmart | Notes",
  description:
    "Add a new Notes anxplore a notes.",
};

export default function NotesLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {children}
      </section>
    );
  }
