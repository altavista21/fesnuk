import { useState } from "react";
import { useUser } from "@/context/UserContext";
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
  const { username, setUsername, backgroundColor, setBackgroundColor } = useUser();
  const [tempUsername, setTempUsername] = useState(username);

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
            Customize your username and background color.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Username</label>
            <input
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">Background Color</label>
            <div className="grid grid-cols-4 gap-2">
              {bgColorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBackgroundColor(option.value)}
                  className="p-4 rounded-lg border-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: option.value,
                    borderColor: backgroundColor === option.value ? "#0066ff" : "#e5e7eb",
                    borderWidth: backgroundColor === option.value ? "2px" : "1px",
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
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
