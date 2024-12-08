"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { APIClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { NDFactResponse } from "@/types";

interface NDFactFormProps {
  onBack: () => void;
}

export function NDFactForm({ onBack }: NDFactFormProps) {
  const [nd, setNd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NDFactResponse | null>(null);
  const { toast } = useToast();
  const apiClient = new APIClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.checkNdFact(nd);
      setResult(response);
    } catch (error) {
      toast({
        title: "Check Failed",
        description: "Unable to retrieve ND information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">Check ND Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter ND Number"
          value={nd}
          onChange={(e) => setNd(e.target.value)}
          required
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
          >
            Back
          </Button>
        </div>
      </form>

      {result && (
        <Card className="p-4 mt-4">
          <h3 className="font-semibold mb-2">Results:</h3>
          <p>ND: {result.INFO.nd}</p>
          <p>Credit: {result.INFO.credit} DA</p>
        </Card>
      )}
    </div>
  );
}