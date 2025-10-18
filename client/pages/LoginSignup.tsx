import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        await signup(email, password, name);
        toast.success("Account created successfully!");
      } else {
        await login(email, password);
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Fesnuk</h1>
            <p className="text-gray-600">
              {isSignup ? "Create your account" : "Welcome back"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2"
            >
              {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setEmail("");
                  setPassword("");
                  setName("");
                }}
                className="text-primary font-semibold ml-2 hover:underline"
              >
                {isSignup ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Credentials:</p>
            <div className="bg-gray-50 rounded p-3 space-y-2 text-xs">
              <div>
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-gray-600">demo@fesnuk.com</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Password:</p>
                <p className="text-gray-600">demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
