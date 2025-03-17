import { useState } from "react";
import ImageViewer from "./ImageViewer";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImageViewerExample() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImageUrl(inputUrl);
  };

  return (
    <Container className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Image Viewer</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full"
            />
          </div>
          <Button type="submit" className="mt-auto">
            View Image
          </Button>
        </form>
      </div>

      {imageUrl && (
        <ImageViewer imageUrl={imageUrl} alt="Viewed image" maxHeight="60vh" />
      )}
    </Container>
  );
}
