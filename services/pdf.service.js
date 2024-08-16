import PDFDocument from "pdfkit";
import fs from "fs";

export const writeInPdf = (content)=>{
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream('next.pdf')
    doc.pipe(writeStream);
    doc.text(content);
    doc.end();
    writeStream.on('finish', function() {
      console.log('El PDF ha sido creado exitosamente.');
  });
  }
  