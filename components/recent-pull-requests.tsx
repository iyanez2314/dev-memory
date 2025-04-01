"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitPullRequest, GitMerge, Calendar, Clock } from "lucide-react"

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
    url: "#",
    status: "merged",
    linkedDecisions: ["1"],
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
    url: "#",
    status: "merged",
    linkedDecisions: ["3"],
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
  },
]

export function RecentPullRequests() {
  return (
    <div className="space-y-4">
      {pullRequests.map((pr) => (
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
                  <Clock className="h-3 w-3" />
                  <span>{new Date(pr.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={pr.author.avatar} alt={pr.author.name} />
                  <AvatarFallback>{pr.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
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
    </div>
  )
}

