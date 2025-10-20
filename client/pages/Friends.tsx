import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { UserPlus, MessageCircle } from "lucide-react";
import { useState } from "react";

const friendsList = [
  { id: 1, name: "Sarah Johnson", avatar: "SJ", mutualFriends: 12 },
  { id: 2, name: "Michael Chen", avatar: "MC", mutualFriends: 8 },
  { id: 3, name: "Emily Rodriguez", avatar: "ER", mutualFriends: 5 },
  { id: 4, name: "David Kim", avatar: "DK", mutualFriends: 15 },
  { id: 5, name: "Jessica Wang", avatar: "JW", mutualFriends: 9 },
];

export default function Friends() {
  const [friends] = useState(friendsList);

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Friends</h1>
          <p className="text-gray-600 mt-2">
            You have {friends.length} friends
          </p>
        </div>

        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {friend.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {friend.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {friend.mutualFriends} mutual friends
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
