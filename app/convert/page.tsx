'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function Home() {
  const [watermarkText, setWatermarkText] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWatermarkText(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!watermarkText || !pdfFile) {
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
          y: height - textHeight - 50,
          size: watermarkSize,
          font: font,
          color: watermarkColor,
          opacity: 0.3,
        });
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: 50,
          size: watermarkSize,
          font: font,
          color: watermarkColor,
          opacity: 0.3,
        });
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: height/2,
          size: watermarkSize,
          font: font,
          color: watermarkColor,
          opacity: 0.3,
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();

      const file = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'watermarked.pdf');
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
      <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Add Watermark to PDF</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="watermarkText" className="font-medium">
              Watermark Text:
            </label>
            <input
              type="text"
              id="watermarkText"
              name="watermarkText"
              className="mt-2 border border-gray-300 rounded-md p-2 w-full"
              value={watermarkText}
              onChange={handleTextChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pdfFile" className="font-medium">
              PDF File:
            </label>
            <input
              type="file"
              id="pdfFile"
              name="pdfFile"
              className="mt-2"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Add Watermark and Download
          </button>
        </form>
      </div>
    </div>
  );
}
