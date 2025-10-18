import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-md">Page not found. This page might have been removed or you don't have permission to view it.</p>
            <Button className="bg-primary hover:bg-primary/90">
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
