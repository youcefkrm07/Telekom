"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIClient } from "@/lib/api-client";
import { AccountInfo } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface UserDashboardProps {
  token: string;
  onLogout: () => void;
}

export function UserDashboard({ token, onLogout }: UserDashboardProps) {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const apiClient = new APIClient();

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const info = await apiClient.getAccountInfo(token);
        setAccountInfo(info);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load account information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, [token, toast]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!accountInfo) {
    return <div className="text-center">No account information available</div>;
  }

  const availableSpeeds = accountInfo.listOffreDebit.split(",");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Welcome, {accountInfo.prenom} {accountInfo.nom}
        </h2>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
          <TabsTrigger value="speeds" className="flex-1">Available Speeds</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="p-4">
            <div className="space-y-2">
              <InfoRow label="ND" value={accountInfo.nd} />
              <InfoRow label="Address" value={accountInfo.adresse} />
              <InfoRow label="Current Offer" value={accountInfo.offre} />
              <InfoRow label="Speed" value={`${accountInfo.speed} Mbps`} />
              <InfoRow label="Credit" value={`${accountInfo.credit} DA`} />
              <InfoRow label="Balance" value={`${accountInfo.balance} DA`} />
              <InfoRow label="Expiry Date" value={accountInfo.dateexp} />
              <InfoRow label="Mobile" value={accountInfo.mobile} />
              <InfoRow label="Email" value={accountInfo.email} />
              <InfoRow label="Status" value={accountInfo.status} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="speeds">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Available Speeds</h3>
            <div className="space-y-2">
              {availableSpeeds.map((speed, index) => (
                <div
                  key={index}
                  className="p-2 bg-secondary rounded-md"
                >
                  {speed} Mbps
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}