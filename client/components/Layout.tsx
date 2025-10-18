import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";
import { useUser } from "@/context/UserContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { backgroundColor } = useUser();

  return (
    <div
      style={{ backgroundColor }}
      className="min-h-screen transition-colors duration-300"
    >
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-2xl mx-auto w-full lg:max-w-2xl">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
