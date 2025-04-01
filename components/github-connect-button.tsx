"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import useGetUser from "@/hooks/use-get-user";
import { useUser } from "@clerk/nextjs";

export function GitHubConnectButton() {
  const { user: clerkUser } = useUser();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const searchParams = useSearchParams();

  const { isLoading, user } = useGetUser(clerkUser?.id || "");

  useEffect(() => {
    const code = searchParams.get("code");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!code || !appUrl) return;

    async function connectGitHub() {
      const response = await fetch(`${appUrl}/api/github/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        toast("Connected to GitHub successfully");
        // Remove the code from the URL
        window.history.replaceState({}, document.title, "/dashboard/settings");
        setIsConnected(true);
      } else {
        toast("Failed to connect to GitHub. Please try again.");
      }
    }

    connectGitHub();
  }, [searchParams]);

  const handleConnect = async () => {
    setIsConnecting(true);

    try {
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      if (!clientId) {
        throw new Error("GitHub client ID not found");
      }
      const redirectUri = encodeURIComponent(
        "http://localhost:3456/dashboard/settings",
      );
      const scope = "repo user";
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    } catch (error) {
      console.error("Error connecting to GitHub:", error);
      toast("Failed to connect to GitHub. Please try again.");
      setIsConnecting(false);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting || isConnected || isLoading || user?.githubToken}
      className="flex items-center gap-2"
    >
      {isConnecting || isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Github className="h-4 w-4" />
      )}
      {isConnecting
        ? "Connecting..."
        : isConnected || user?.githubToken
          ? "Connected"
          : "Connect GitHub"}
    </Button>
  );
}
