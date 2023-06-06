import React from "react";

export default function page() {
  return (
    <div
      className="flex justify-center"
      style={{
        minHeight: "50vh",
      }}
    >
      <div className="min-h-full min-w-full px-64 flex justify-center">
        <center className="min-h-full min-w-full">
          <div className="text-5xl font-capriola my-5">About Us</div>
          <div className="flex flex-col gap-2 my-5 text-2xl font-outfit">
            Welcome to our college website, your ultimate destination for
            academic excellence and support. We are dedicated to providing a
            holistic educational experience that goes beyond the classroom. Our
            website offers a vast collection of subject notes, exam papers, and
            project guidance to enhance your understanding and preparation. We
            are committed to your success and strive to foster personal growth,
            critical thinking, and community engagement. Explore our website and
            unlock a world of resources to empower your academic journey and
            shape your future.
          </div>
        </center>
      </div>
    </div>
  );
}
