import React, { useState } from "react";
import { Outline } from "react-pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

interface Pdfviwer {
  fileUrl: string;
}

// pdfjs.GlobalWorkerOptions.workerPort = new Worker(
//   'node_modules/pdfjs-dist/build/pdf.worker.entry.js',
// );

export default function Pdfviwer({ fileUrl }: Pdfviwer) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="rounded-3xl"
      >
        <div className="md:block min-[0px]:hidden rounded-3xl">
          <Page pageNumber={pageNumber} className="rounded-3xl" />
        </div>
        <div className="md:hidden min-[0px]:block rounded-3xl">
          <Page pageNumber={pageNumber} scale="0.7" className="rounded-3xl" />
        </div>
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="flex flex-row gap-3 w-full justify-center">
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
          className="bg-blue-500 p-2 px-8 rounded-full text-white"
        >
          prev
        </button>
        <button
          onClick={() => {
            if (pageNumber < numPages) {
              setPageNumber(pageNumber + 1);
            }
          }}
          className="bg-blue-500 p-2 px-8 rounded-full text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
