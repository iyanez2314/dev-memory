"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitPullRequest, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock search results
const searchResults = [
  {
    id: "1",
    title: "Switch from MongoDB to PostgreSQL",
    summary:
      "The team has decided to switch from MongoDB to PostgreSQL due to the need for better transaction support and relational data modeling.",
    relevance: "High match - Database change",
    createdAt: "2023-03-15T10:30:00Z",
    createdBy: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    linkedPRs: ["pr1", "pr2"],
  },
  {
    id: "2",
    title: "Implement database sharding strategy",
    summary: "To improve scalability, we'll implement database sharding based on customer ID.",
    relevance: "Medium match - Database architecture",
    createdAt: "2023-02-10T14:45:00Z",
    createdBy: {
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    linkedPRs: ["pr6"],
  },
  {
    id: "3",
    title: "Add database read replicas",
    summary: "To improve read performance, we'll add read replicas for our database.",
    relevance: "Medium match - Database performance",
    createdAt: "2023-01-05T09:15:00Z",
    createdBy: {
      name: "Chris Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    linkedPRs: ["pr7", "pr8"],
  },
]

export function DecisionSearchResults() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Search Results</h2>
        <p className="text-sm text-muted-foreground">3 results for "database change"</p>
      </div>

      <div className="space-y-4">
        {searchResults.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{result.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {new Date(result.createdAt).toLocaleDateString()} by {result.createdBy.name}
                  </CardDescription>
                </div>
                <Badge variant="outline">{result.relevance}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{result.summary}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <GitPullRequest className="h-3 w-3" />
                    <span>{result.linkedPRs.length} PRs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={result.createdBy.avatar} alt={result.createdBy.name} />
                    <AvatarFallback>{result.createdBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

