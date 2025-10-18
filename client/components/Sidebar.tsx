import { Home, Users, Watch, Store, Users2, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors",
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="space-y-2">
        <SidebarItem
          icon={<Home className="w-6 h-6" />}
          label="Home"
          href="/"
          active
        />
        <SidebarItem
          icon={<Users className="w-6 h-6" />}
          label="Friends"
          href="/friends"
        />
        <SidebarItem
          icon={<Watch className="w-6 h-6" />}
          label="Watch"
          href="/watch"
        />
        <SidebarItem
          icon={<Store className="w-6 h-6" />}
          label="Marketplace"
          href="/marketplace"
        />
        <SidebarItem
          icon={<Users2 className="w-6 h-6" />}
          label="Groups"
          href="/groups"
        />
        <SidebarItem
          icon={<Flag className="w-6 h-6" />}
          label="Pages"
          href="/pages"
        />
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase">
          Your Pages
        </h3>
        <div className="space-y-2 mt-4">
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            Fesnuk Dev
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            Design Studio
          </div>
        </div>
      </div>
    </aside>
  );
}
