"use client";

import { useState } from "react";
import { Check, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

const fetchRepositories = async () => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("App URL not found");
  }
  const res = await fetch(`${appUrl}/api/github/github-repos`);
  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return res.json();
};

export function GitHubRepoList() {
  const {
    data: repositories,
    isLoading,
    isError,
    isPending,
  } = useQuery({ queryKey: ["github-repos"], queryFn: fetchRepositories });

  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <div>Loading repositories...</div>;
  }

  if (isError) {
    return <div>Error loading repositories.</div>;
  }

  // Filter repositories based on searchQuery
  const filteredRepos = repositories.data.filter(
    (repo: any) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const toggleRepo = (repoId: string) => {
    setSelectedRepos((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId],
    );
  };

  const selectAll = () => {
    setSelectedRepos(filteredRepos.map((repo: any) => repo.id));
  };

  const deselectAll = () => {
    setSelectedRepos([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={selectAll}>
          Select All
        </Button>
        <Button variant="outline" size="sm" onClick={deselectAll}>
          Deselect All
        </Button>
      </div>

      <ScrollArea className="h-[300px] rounded-md border">
        <div className="p-4 space-y-4">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo: any) => (
              <div
                key={repo.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted"
              >
                <Checkbox
                  id={repo.id}
                  checked={selectedRepos.includes(repo.id)}
                  onCheckedChange={() => toggleRepo(repo.id)}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={repo.id}
                      className="font-medium cursor-pointer"
                    >
                      {repo.owner.login}/{repo.name}
                    </Label>
                    {repo.private && (
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated:{" "}
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Github className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No repositories found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search query.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex justify-between items-center pt-2">
        <p className="text-sm text-muted-foreground">
          {selectedRepos.length} repositories selected
        </p>
        <Button>
          <Check className="mr-2 h-4 w-4" />
          Save Selection
        </Button>
      </div>
    </div>
  );
}
