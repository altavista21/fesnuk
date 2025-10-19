import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("You");
  const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("fesnuk_username");
    const savedBgColor = localStorage.getItem("fesnuk_bgColor");
    const savedProfilePhoto = localStorage.getItem("fesnuk_profilePhoto");

    if (savedUsername) setUsername(savedUsername);
    if (savedBgColor) setBackgroundColor(savedBgColor);
    if (savedProfilePhoto) setProfilePhoto(savedProfilePhoto);
  }, []);

  useEffect(() => {
    localStorage.setItem("fesnuk_username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("fesnuk_bgColor", backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    if (profilePhoto) {
      localStorage.setItem("fesnuk_profilePhoto", profilePhoto);
    } else {
      localStorage.removeItem("fesnuk_profilePhoto");
    }
  }, [profilePhoto]);

  return (
    <UserContext.Provider
      value={{ username, setUsername, backgroundColor, setBackgroundColor }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
