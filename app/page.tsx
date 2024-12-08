"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/LoginForm";
import { NDFactForm } from "@/components/NDFactForm";
import { UserDashboard } from "@/components/UserDashboard";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [view, setView] = useState<"main" | "login" | "ndFact" | "dashboard">("main");
  const [userToken, setUserToken] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = (token: string) => {
    setUserToken(token);
    setView("dashboard");
    toast({
      title: "Login Successful",
      description: "Welcome to your dashboard",
    });
  };

  const handleLogout = () => {
    setUserToken(null);
    setView("main");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          {view === "main" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center mb-6">Algeria Telecom Services</h1>
              <div className="grid gap-4">
                <Button 
                  onClick={() => setView("login")}
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setView("ndFact")}
                  variant="outline"
                  className="w-full"
                >
                  Check ND
                </Button>
              </div>
            </div>
          )}

          {view === "login" && (
            <LoginForm 
              onSuccess={handleLogin}
              onCancel={() => setView("main")}
            />
          )}

          {view === "ndFact" && (
            <NDFactForm 
              onBack={() => setView("main")}
            />
          )}

          {view === "dashboard" && userToken && (
            <UserDashboard 
              token={userToken}
              onLogout={handleLogout}
            />
          )}
        </Card>
      </div>
    </main>
  );
}