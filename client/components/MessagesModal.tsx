import { useState } from "react";
import { useMessaging } from "@/context/MessagingContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessagesModal({ open, onOpenChange }: MessagesModalProps) {
  const { conversations, currentConversation, setCurrentConversation, sendMessage, markAsRead } = useMessaging();
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (currentConversation && messageText.trim()) {
      sendMessage(currentConversation.id, messageText);
      setMessageText("");
    }
  };

  const handleConversationClick = (conversationId: string) => {
    const conv = conversations.find((c) => c.id === conversationId);
    if (conv) {
      setCurrentConversation(conv);
      markAsRead(conversationId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        {currentConversation ? (
          <>
            <DialogHeader className="p-4 border-b border-gray-200 flex flex-row items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentConversation(null)}
                className="h-8 w-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <DialogTitle>{currentConversation.participantName}</DialogTitle>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentConversation.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.senderId === "you" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs px-4 py-2 rounded-lg",
                        message.senderId === "you"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-gray-100 text-gray-900 rounded-bl-none"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          message.senderId === "you" ? "text-blue-100" : "text-gray-500"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="p-4 border-b border-gray-200">
              <DialogTitle>Messages</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {conversations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No conversations yet</p>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {conv.participantAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">
                            {conv.participantName}
                          </div>
                          {conv.lastMessage && (
                            <p className="text-sm text-gray-600 truncate">
                              {conv.lastMessage.text}
                            </p>
                          )}
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
