import { useState, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bgColorOptions = [
  { name: "Light Gray", value: "#f3f4f6" },
  { name: "White", value: "#ffffff" },
  { name: "Light Blue", value: "#dbeafe" },
  { name: "Light Green", value: "#dcfce7" },
  { name: "Light Purple", value: "#f3e8ff" },
  { name: "Light Pink", value: "#fce7f3" },
  { name: "Light Yellow", value: "#fef3c7" },
  { name: "Light Orange", value: "#fed7aa" },
];

export function ProfileSettings({ open, onOpenChange }: ProfileSettingsProps) {
  const {
    username,
    setUsername,
    backgroundColor,
    setBackgroundColor,
    profilePhoto,
    setProfilePhoto,
  } = useUser();
  const [tempUsername, setTempUsername] = useState(username);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only images (JPG, PNG, GIF, WebP) are supported");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePhoto(event.target?.result as string);
      toast.success("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUsername(tempUsername);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Customize your profile, username, and background color.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                {profilePhoto ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={profilePhoto}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {tempUsername
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                {profilePhoto && (
                  <button
                    onClick={() => setProfilePhoto(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm"
                >
                  {profilePhoto ? "Change Photo" : "Upload Photo"}
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Max 5MB, JPG/PNG/GIF
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">
              Background Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {bgColorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBackgroundColor(option.value)}
                  className="p-4 rounded-lg border-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: option.value,
                    borderColor:
                      backgroundColor === option.value ? "#ff8c00" : "#e5e7eb",
                    borderWidth:
                      backgroundColor === option.value ? "2px" : "1px",
                  }}
                  title={option.name}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
