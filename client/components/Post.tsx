import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface PostProps {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

export function Post({ author, avatar, timestamp, content, image, likes, comments, shares }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {avatar}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            <div className="text-xs text-gray-600">{timestamp}</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4">
        <p className="text-gray-900 text-sm leading-relaxed">{content}</p>
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden bg-gray-100">
            <img src={image} alt="post" className="w-full h-auto" />
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-y border-gray-100 text-xs text-gray-600 flex gap-4">
        <span className="cursor-pointer hover:underline">{likes} likes</span>
        <span className="cursor-pointer hover:underline">{comments} comments</span>
        <span className="cursor-pointer hover:underline">{shares} shares</span>
      </div>

      <div className="px-4 py-2 flex gap-2">
        <Button
          variant="ghost"
          className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          <span className="text-sm">Like</span>
        </Button>
        <Button variant="ghost" className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Comment</span>
        </Button>
        <Button variant="ghost" className="flex-1 justify-center gap-2 text-gray-700 hover:bg-gray-50">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </Button>
      </div>
    </div>
  );
}
