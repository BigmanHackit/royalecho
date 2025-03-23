import PDFDownloader from "@/components/forms/BrochureDownload";
import PDFPreview from "@/components/forms/PDFPreview";


export default function PDFViewerPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">PDF Document Viewer</h1>
      <PDFDownloader />
    </div>
  );
}