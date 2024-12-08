"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APIClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

export function LoginForm({ onSuccess, onCancel }: LoginFormProps) {
  const [nd, setNd] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const apiClient = new APIClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.login(nd, password);
      const token = response.meta_data.original.token;
      onSuccess(token);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
      
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="ND Number"
          value={nd}
          onChange={(e) => setNd(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}