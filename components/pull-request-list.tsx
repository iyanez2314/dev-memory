"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitPullRequest, GitMerge, Calendar, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock data
const pullRequests = [
  {
    id: "pr1",
    title: "Update ORM layer for PostgreSQL compatibility",
    description: "This PR updates our ORM layer to support PostgreSQL as a database backend.",
    author: {
      name: "Chris Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "chrislee",
    },
    createdAt: "2023-03-14T10:30:00Z",
    mergedAt: "2023-03-16T15:20:00Z",
    url: "#",
    status: "merged",
    linkedDecisions: ["1"],
    filesChanged: ["src/database/orm.ts", "src/database/connection.ts", "src/models/user.ts", "src/models/product.ts"],
    discussions: [
      {
        author: "taylorsmith",
        comment: "Have we considered the performance implications of this change?",
        createdAt: "2023-03-14T11:45:00Z",
      },
      {
        author: "chrislee",
        comment:
          "Yes, I've included benchmarks in the PR description. PostgreSQL actually performs better for our query patterns.",
        createdAt: "2023-03-14T12:10:00Z",
      },
    ],
  },
  {
    id: "pr2",
    title: "Add PostgreSQL connection pooling",
    description: "Implements connection pooling for PostgreSQL to improve performance.",
    author: {
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "taylorsmith",
    },
    createdAt: "2023-03-15T14:45:00Z",
    url: "#",
    status: "open",
    linkedDecisions: ["1"],
    filesChanged: ["src/database/connection.ts", "src/config/database.ts"],
    discussions: [
      {
        author: "alexj",
        comment: "What's the optimal pool size for our workload?",
        createdAt: "2023-03-15T16:30:00Z",
      },
      {
        author: "taylorsmith",
        comment: "I've set it to 10 based on our current load, but we can adjust based on monitoring.",
        createdAt: "2023-03-15T16:45:00Z",
      },
    ],
  },
  {
    id: "pr3",
    title: "POC: React Server Components implementation",
    description: "Proof of concept for implementing React Server Components in our application.",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    createdAt: "2023-03-09T09:15:00Z",
    url: "#",
    status: "open",
    linkedDecisions: ["2"],
    filesChanged: ["src/components/Dashboard.tsx", "src/components/UserProfile.tsx", "src/app/layout.tsx"],
    discussions: [
      {
        author: "chrislee",
        comment: "This looks promising! Have you measured the bundle size reduction?",
        createdAt: "2023-03-09T10:20:00Z",
      },
      {
        author: "alexj",
        comment: "Yes, we're seeing about 30% reduction in the main bundle size.",
        createdAt: "2023-03-09T11:05:00Z",
      },
    ],
  },
  {
    id: "pr4",
    title: "Implement JWT authentication service",
    description: "Creates a new authentication service using JWT tokens.",
    author: {
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "taylorsmith",
    },
    createdAt: "2023-03-04T16:20:00Z",
    mergedAt: "2023-03-06T09:30:00Z",
    url: "#",
    status: "merged",
    linkedDecisions: ["3"],
    filesChanged: ["src/services/auth.ts", "src/middleware/auth.ts", "src/utils/jwt.ts"],
    discussions: [
      {
        author: "chrislee",
        comment: "What's the token expiration time?",
        createdAt: "2023-03-05T08:15:00Z",
      },
      {
        author: "taylorsmith",
        comment: "1 hour for access tokens, 7 days for refresh tokens.",
        createdAt: "2023-03-05T09:00:00Z",
      },
    ],
  },
  {
    id: "pr5",
    title: "Update client libraries for JWT support",
    description: "Updates client SDKs to support the new JWT authentication.",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    createdAt: "2023-03-05T11:10:00Z",
    url: "#",
    status: "open",
    linkedDecisions: ["3"],
    filesChanged: ["src/client/api.ts", "src/client/auth.ts"],
    discussions: [
      {
        author: "taylorsmith",
        comment: "Does this handle token refresh automatically?",
        createdAt: "2023-03-05T13:25:00Z",
      },
      {
        author: "alexj",
        comment: "Yes, it will automatically refresh tokens when they expire.",
        createdAt: "2023-03-05T14:10:00Z",
      },
    ],
  },
]

interface PullRequestListProps {
  status?: "open" | "merged"
  withDecisions?: boolean
}

export function PullRequestList({ status, withDecisions }: PullRequestListProps) {
  const [selectedPR, setSelectedPR] = useState<(typeof pullRequests)[0] | null>(null)

  const filteredPRs = pullRequests.filter((pr) => {
    if (status && pr.status !== status) return false
    if (withDecisions && pr.linkedDecisions.length === 0) return false
    return true
  })

  return (
    <div className="space-y-4">
      {filteredPRs.map((pr) => (
        <Card key={pr.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">{pr.title}</CardTitle>
                </div>
                <CardDescription className="mt-1 flex items-center gap-2">
                  <span>#{pr.id.replace("pr", "")}</span>
                  <span>•</span>
                  <span>by {pr.author.username}</span>
                </CardDescription>
              </div>
              <Badge variant={pr.status === "merged" ? "default" : "outline"}>
                {pr.status === "merged" ? (
                  <GitMerge className="mr-1 h-3 w-3" />
                ) : (
                  <GitPullRequest className="mr-1 h-3 w-3" />
                )}
                {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">{pr.description}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(pr.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  <span>{pr.filesChanged.length} files</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPR(pr)}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  {selectedPR && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <GitPullRequest className="h-5 w-5" />
                          {selectedPR.title}
                        </DialogTitle>
                        <DialogDescription>
                          #{selectedPR.id.replace("pr", "")} opened by {selectedPR.author.username} on{" "}
                          {new Date(selectedPR.createdAt).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="mt-4">
                        <TabsList>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="files">Files Changed</TabsTrigger>
                          <TabsTrigger value="discussions">Discussions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4 pt-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Description</h3>
                            <p className="text-sm">{selectedPR.description}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src={selectedPR.author.avatar} alt={selectedPR.author.name} />
                                <AvatarFallback>{selectedPR.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{selectedPR.author.name}</p>
                                <p className="text-xs text-muted-foreground">@{selectedPR.author.username}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium">Status</p>
                              <Badge variant={selectedPR.status === "merged" ? "default" : "outline"}>
                                {selectedPR.status === "merged" ? (
                                  <GitMerge className="mr-1 h-3 w-3" />
                                ) : (
                                  <GitPullRequest className="mr-1 h-3 w-3" />
                                )}
                                {selectedPR.status.charAt(0).toUpperCase() + selectedPR.status.slice(1)}
                              </Badge>
                            </div>

                            {selectedPR.status === "merged" && selectedPR.mergedAt && (
                              <div>
                                <p className="text-sm font-medium">Merged</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(selectedPR.mergedAt).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>

                          {selectedPR.linkedDecisions.length > 0 && (
                            <div>
                              <h3 className="text-sm font-medium mb-2">Linked Decisions</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedPR.linkedDecisions.map((id) => (
                                  <Badge key={id} variant="secondary">
                                    Decision #{id}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="files" className="space-y-4 pt-4">
                          <h3 className="text-sm font-medium mb-2">Files Changed ({selectedPR.filesChanged.length})</h3>
                          <div className="space-y-2">
                            {selectedPR.filesChanged.map((file, index) => (
                              <div key={index} className="text-sm flex items-center gap-2 p-2 rounded-md bg-muted">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{file}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="discussions" className="space-y-4 pt-4">
                          <h3 className="text-sm font-medium mb-2">Discussions</h3>
                          <div className="space-y-4">
                            {selectedPR.discussions.map((discussion, index) => (
                              <div key={index} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">@{discussion.author}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(discussion.createdAt).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm">{discussion.comment}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {pr.linkedDecisions.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-1">Linked Decisions:</p>
                <div className="flex flex-wrap gap-2">
                  {pr.linkedDecisions.map((id) => (
                    <Badge key={id} variant="secondary" className="text-xs">
                      Decision #{id}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {filteredPRs.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <GitPullRequest className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No pull requests found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {status ? `No ${status} pull requests` : "No pull requests"}
            {withDecisions ? " with linked decisions" : ""} to display.
          </p>
        </div>
      )}
    </div>
  )
}

