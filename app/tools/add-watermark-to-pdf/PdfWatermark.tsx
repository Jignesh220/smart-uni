"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { motion } from "framer-motion";

export default function PdfWatermark() {
  const [watermarkText, setWatermarkText] = useState("");
  const [fileName, setFileName] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWatermarkText(event.target.value);
  };
  const handleFileNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!watermarkText || !pdfFile || !fileName) {
      alert("Please enter watermark text and select a PDF file");
      return;
    }

    try {
      const pdfBytes = await readFileAsArrayBuffer(pdfFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      const font = await pdfDoc.embedFont("Helvetica-Bold");
      const watermarkSize = 80;
      const watermarkColor = rgb(0.5, 0.5, 0.5);

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, watermarkSize);
        const textHeight = font.heightAtSize(watermarkSize);

        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: height - textHeight - 200,
          size: watermarkSize,
          font: font,
          color: watermarkColor,
          opacity: 0.3,
        });
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: 200,
          size: watermarkSize,
          font: font,
          color: watermarkColor,
          opacity: 0.3,
        });
        // page.drawText(watermarkText, {
        //   x: (width - textWidth) / 2,
        //   y: height/2,
        //   size: watermarkSize,
        //   font: font,
        //   color: watermarkColor,
        //   opacity: 0.3,
        // });
      }

      const modifiedPdfBytes = await pdfDoc.save();

      const file = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the watermark");
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error("Unable to read file"));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="min-h-[95vh] flex items-center justify-center bg-gradient-to-b from-white to-blue-100 px-2">
      <div
        className="md:min-w-[45rem] min-w-full mx-auto md:px-8 px-6 py-8 bg-purple-50 rounded-3xl"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6 font-outfit tracking-wide">
          Add Watermark to PDF
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="watermarkText"
              className="font-medium font-outfit text-sm text-center"
            >
              Watermark Text
            </label>
            <input
              type="text"
              id="watermarkText"
              name="watermarkText"
              className="flex h-10 w-full border-b border-slate-300 focus:border-black  bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none"
              value={watermarkText}
              onChange={handleTextChange}
              placeholder="Enter watermark text"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fileName"
              className="font-medium text-sm font-outfit"
            >
              File Name (Rename)
            </label>
            <input
              type="text"
              id="fileName"
              name="fileName"
              className="flex h-10 w-full border-b border-slate-300 focus:border-black  bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none"
              value={fileName}
              onChange={handleFileNameChange}
              placeholder="Enter File Name text"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pdfFile"
              className="font-medium text-sm font-outfit"
            >
              PDF File
            </label>
            <input
              type="file"
              id="pdfFile"
              name="pdfFile"
              className="flex mt-2 w-full rounded-md appearance-none bg-transparent text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-300 file:w-full file:text-blue-700
                  hover:file:bg-blue-700 hover:file:text-blue-100"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
            {pdfFile && (
              <div className="text-sm text-green-800 font-outfit mt-2 font-semibold tracking-wide">
                {`${pdfFile?.name} ( ${
                  pdfFile ? (pdfFile.size / 1048576).toFixed(2) : null
                } MB  )`}
              </div>
            )}
          </div>

          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            type="submit"
            className="w-full mt-8 bg-blue-800 text-blue-100 p-2 rounded-lg font-outfit font-semibold text-sm tracking-wider"
          >
            Add Watermark and Download
          </motion.button>
        </form>
      </div>
    </div>
  );
}
