import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function MobilePdfViewer({ url }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Loading document…"
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={window.innerWidth - 32}
          />
        ))}
      </Document>
    </div>
  );
}
