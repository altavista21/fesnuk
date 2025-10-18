import { Image, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

interface PostComposerProps {
  onPost?: (content: string, image?: string) => void;
}

export function PostComposer({ onPost }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { username } = useUser();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Only images (JPG, PNG, GIF, WebP) and MP4 videos are supported",
      );
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      toast.success("Media added to your post");
    };
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    if (!content.trim() && !selectedImage) {
      toast.error("Please add some text or a photo/video to your post");
      return;
    }
    onPost?.(content, selectedImage || undefined);
    setContent("");
    setSelectedImage(null);
    toast.success("Post published!");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex gap-4 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {username
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handlePost()}
          placeholder="What's on your mind?"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {selectedImage && (
        <div className="mb-4 relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={selectedImage}
            alt="preview"
            className="w-full h-auto max-h-96 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white h-8 w-8"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="border-t border-gray-200 pt-3 flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          variant="ghost"
          className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="w-5 h-5 text-primary" />
          <span className="text-sm">Photo/Video</span>
        </Button>
        <Button
          className="flex-1 justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
          onClick={handlePost}
        >
          <span className="text-sm">Post</span>
        </Button>
      </div>
    </div>
  );
}
