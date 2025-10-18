import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Placeholder({ title, description, icon }: PlaceholderProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4 opacity-30">{icon}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-6 max-w-md">{description}</p>
            <Button onClick={() => navigate("/")} className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
