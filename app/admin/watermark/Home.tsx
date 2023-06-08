'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function Home() {
  const [watermarkText, setWatermarkText] = useState('');
  const [fileName, setFileName] = useState('')
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
      alert('Please enter watermark text and select a PDF file');
      return;
    }

    try {
      const pdfBytes = await readFileAsArrayBuffer(pdfFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      const font = await pdfDoc.embedFont('Helvetica-Bold');
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

      const file = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the watermark');
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Unable to read file'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto px-16 py-8 bg-white shadow-lg rounded-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6 font-outfit">Add Watermark to PDF</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="watermarkText" className="font-medium font-outfit text-sm text-center">
              Watermark Text
            </label>
            <input
              type="text"
              id="watermarkText"
              name="watermarkText"
              className="flex h-10 w-full border-b border-slate-300 focus:border-black  bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none"
              value={watermarkText}
              onChange={handleTextChange}
              placeholder='Enter Yor watermark text'
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fileName" className="font-medium text-sm font-outfit">
              File Name
            </label>
            <input
              type="text"
              id="fileName"
              name="fileName"
              className="flex h-10 w-full border-b border-slate-300 focus:border-black  bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none"
              value={fileName}
              onChange={handleFileNameChange}
              placeholder='Enter Yor File Name text'
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pdfFile" className="font-medium text-sm font-outfit">
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
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-blue-800 text-blue-100 p-2 rounded-full font-outfit font-bold text-sm tracking-wider"
            >
            Add Watermark and Download
          </button>
        </form>
      </div>
    </div>
  );
}
