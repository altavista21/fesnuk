import { Layout } from "@/components/Layout";
import { PostComposer } from "@/components/PostComposer";
import { Post } from "@/components/Post";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface FeedPost {
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

const initialPosts: FeedPost[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "SJ",
    timestamp: "2 hours ago",
    content:
      "Just finished an amazing project! So excited to share it with everyone. Check out what we've been working on! 🚀",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    likes: 234,
    comments: 28,
    shares: 15,
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "MC",
    timestamp: "4 hours ago",
    content:
      "Beautiful sunset at the beach today. Nature never ceases to amaze me! 🌅",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    likes: 512,
    comments: 67,
    shares: 42,
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "ER",
    timestamp: "6 hours ago",
    content:
      "Coffee and code, my favorite combination on a Monday morning! Who else is a coffee addict? ☕💻",
    likes: 189,
    comments: 31,
    shares: 8,
  },
  {
    id: 4,
    author: "David Kim",
    avatar: "DK",
    timestamp: "8 hours ago",
    content:
      "Excited to announce that I've joined a new team! Looking forward to this new adventure and growing with amazing people. 🎉",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    likes: 458,
    comments: 92,
    shares: 67,
  },
  {
    id: 5,
    author: "Jessica Wang",
    avatar: "JW",
    timestamp: "10 hours ago",
    content:
      "Weekend plans: reading, hiking, and spending time with loved ones. Simple but meaningful! 🏞️📚",
    likes: 321,
    comments: 44,
    shares: 22,
  },
];

export default function Index() {
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const { username } = useUser();

  const handleNewPost = (content: string, image?: string) => {
    const newPost: FeedPost = {
      id: posts.length + 1,
      author: username,
      avatar: username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      timestamp: "now",
      content,
      image,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <PostComposer onPost={handleNewPost} />
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
