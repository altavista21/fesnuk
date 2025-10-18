import { MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const contacts = [
  { id: 1, name: "Sarah Johnson", online: true, avatar: "SJ" },
  { id: 2, name: "Michael Chen", online: true, avatar: "MC" },
  { id: 3, name: "Emily Rodriguez", online: false, avatar: "ER" },
  { id: 4, name: "David Kim", online: true, avatar: "DK" },
  { id: 5, name: "Jessica Wang", online: false, avatar: "JW" },
];

const suggestions = [
  { id: 1, name: "Alex Turner", mutualFriends: 12, avatar: "AT" },
  { id: 2, name: "Taylor Swift", mutualFriends: 8, avatar: "TS" },
  { id: 3, name: "Jordan Lee", mutualFriends: 5, avatar: "JL" },
];

function AvatarBadge({
  initials,
  online,
}: {
  initials: string;
  online?: boolean;
}) {
  return (
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-xs font-bold">
        {initials}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}

export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Contacts</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
            >
              <div className="flex items-center gap-3 flex-1">
                <AvatarBadge
                  initials={contact.avatar}
                  online={contact.online}
                />
                <span className="text-sm text-gray-800">{contact.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Suggestions For You
        </h3>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <AvatarBadge initials={suggestion.avatar} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {suggestion.mutualFriends} mutual friends
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full h-8 text-sm bg-primary hover:bg-primary/90">
                Add Friend
              </Button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
