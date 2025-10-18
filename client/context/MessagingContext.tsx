import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

interface MessagingContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  setCurrentConversation: (conversation: Conversation | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  createConversation: (participantName: string, participantAvatar: string) => void;
  markAsRead: (conversationId: string) => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

const defaultContacts = [
  { name: "Sarah Johnson", avatar: "SJ" },
  { name: "Michael Chen", avatar: "MC" },
  { name: "Emily Rodriguez", avatar: "ER" },
  { name: "David Kim", avatar: "DK" },
];

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const savedConversations = localStorage.getItem("fesnuk_conversations");
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      const withDates = parsed.map((conv: any) => ({
        ...conv,
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
        lastMessage: conv.lastMessage
          ? { ...conv.lastMessage, timestamp: new Date(conv.lastMessage.timestamp) }
          : undefined,
      }));
      setConversations(withDates);
    } else {
      const initialConversations: Conversation[] = defaultContacts.map((contact) => ({
        id: contact.name.toLowerCase().replace(/\s+/g, "_"),
        participantName: contact.name,
        participantAvatar: contact.avatar,
        messages: [],
        unreadCount: 0,
      }));
      setConversations(initialConversations);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fesnuk_conversations", JSON.stringify(conversations));
  }, [conversations]);

  const sendMessage = useCallback((conversationId: string, text: string) => {
    if (!text.trim()) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: "you",
            text,
            timestamp: new Date(),
          };
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage,
          };
        }
        return conv;
      })
    );

    if (currentConversation?.id === conversationId) {
      setCurrentConversation((prev) => {
        if (!prev) return null;
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          senderId: "you",
          text,
          timestamp: new Date(),
        };
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
          lastMessage: newMessage,
        };
      });

      setTimeout(() => {
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              const replyMessage: Message = {
                id: Math.random().toString(36).substr(2, 9),
                senderId: conv.participantName,
                text: "Thanks for your message! 👋",
                timestamp: new Date(),
              };
              return {
                ...conv,
                messages: [...conv.messages, replyMessage],
                lastMessage: replyMessage,
              };
            }
            return conv;
          })
        );

        setCurrentConversation((prev) => {
          if (!prev) return null;
          const replyMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: prev.participantName,
            text: "Thanks for your message! 👋",
            timestamp: new Date(),
          };
          return {
            ...prev,
            messages: [...prev.messages, replyMessage],
            lastMessage: replyMessage,
          };
        });
      }, 1000);
    }
  }, [currentConversation]);

  const createConversation = useCallback(
    (participantName: string, participantAvatar: string) => {
      const id = participantName.toLowerCase().replace(/\s+/g, "_");
      const exists = conversations.some((conv) => conv.id === id);

      if (!exists) {
        const newConversation: Conversation = {
          id,
          participantName,
          participantAvatar,
          messages: [],
          unreadCount: 0,
        };
        setConversations((prev) => [newConversation, ...prev]);
      }
    },
    [conversations]
  );

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  }, []);

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        currentConversation,
        setCurrentConversation,
        sendMessage,
        createConversation,
        markAsRead,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error("useMessaging must be used within a MessagingProvider");
  }
  return context;
}
