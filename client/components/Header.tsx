import { Search, MessageCircle, Bell, Users, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ProfileSettings } from "./ProfileSettings";
import { MessagesModal } from "./MessagesModal";
import { useUser } from "@/context/UserContext";
import { useNotifications } from "@/context/NotificationContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const { username } = useUser();
  const { notifications, notificationCount, clearAllNotifications } = useNotifications();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            <div className="font-bold text-2xl text-primary">Fesnuk</div>

            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-xs">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search Fesnuk"
                className="bg-transparent ml-2 outline-none w-full text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setMessagesOpen(true)}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {notificationCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllNotifications}
                        className="text-xs"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-600 text-center py-4">No notifications yet</p>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon">
              <Users className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <span className="text-sm font-medium text-gray-700">{username}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <ProfileSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
      <MessagesModal open={messagesOpen} onOpenChange={setMessagesOpen} />
    </>
  );
}
