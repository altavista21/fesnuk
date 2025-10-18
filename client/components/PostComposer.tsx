import { Image, Smile, MapPin } from "lucide-react";
import { Button } from "./ui/button";

export function PostComposer() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex gap-4 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex-shrink-0" />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      <div className="border-t border-gray-200 pt-3 flex gap-2">
        <Button variant="ghost" className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50">
          <Image className="w-5 h-5 text-primary" />
          <span className="text-sm">Photo</span>
        </Button>
        <Button variant="ghost" className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50">
          <Smile className="w-5 h-5 text-orange-400" />
          <span className="text-sm">Feeling</span>
        </Button>
        <Button variant="ghost" className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50">
          <MapPin className="w-5 h-5 text-red-500" />
          <span className="text-sm">Check In</span>
        </Button>
      </div>
    </div>
  );
}
