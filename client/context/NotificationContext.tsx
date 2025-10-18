import React, { createContext, useContext, useState, useCallback } from "react";

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "message";
  message: string;
  postId?: number;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  notificationCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">,
  ) => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setNotifications((prev) => [
        {
          ...notification,
          id,
          timestamp: new Date(),
        },
        ...prev,
      ]);

      setTimeout(() => {
        clearNotification(id);
      }, 5000);
    },
    [],
  );

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationCount: notifications.length,
        addNotification,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
