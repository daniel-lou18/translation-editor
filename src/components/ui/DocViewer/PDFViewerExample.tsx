import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PDFViewerExample() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPdfUrl(inputUrl);
  };

  return (
    <Container className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">PDF Viewer</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="pdf-url">PDF URL</Label>
            <Input
              id="pdf-url"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter PDF URL"
              className="w-full"
            />
          </div>
          <Button type="submit" className="mt-auto">
            View PDF
          </Button>
        </form>
      </div>

      {pdfUrl && (
        <PDFViewer pdfUrl={pdfUrl} title="Viewed PDF" maxHeight="60vh" />
      )}
    </Container>
  );
}
