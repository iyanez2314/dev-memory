"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitPullRequest, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data
const decisions = [
  {
    id: "1",
    title: "Switch from MongoDB to PostgreSQL",
    summary:
      "The team has decided to switch from MongoDB to PostgreSQL due to the need for better transaction support and relational data modeling.",
    reasoning:
      "MongoDB was initially chosen for its flexibility and document-oriented structure. However, as our application has evolved, we've encountered limitations with complex transactions and relational data. PostgreSQL offers robust transaction support, better query capabilities for our reporting needs, and maintains good performance with our current data volume.",
    createdAt: "2023-03-15T10:30:00Z",
    createdBy: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    actionItems: [
      "Create migration plan by end of month",
      "Update ORM layer to support PostgreSQL",
      "Set up new database servers",
    ],
    prIds: ["pr1", "pr2"],
    prs: [
      {
        id: "pr1",
        title: "Update ORM layer for PostgreSQL compatibility",
        url: "#",
        author: "chris",
      },
      {
        id: "pr2",
        title: "Add PostgreSQL connection pooling",
        url: "#",
        author: "taylor",
      },
    ],
  },
  {
    id: "2",
    title: "Adopt React Server Components",
    summary:
      "We've decided to adopt React Server Components for our frontend to improve performance and reduce client-side JavaScript.",
    reasoning:
      "Our application has been experiencing performance issues, especially on mobile devices. After evaluating several options, React Server Components offer the best balance of developer experience and performance improvements. This approach will allow us to render more components on the server, reducing the JavaScript bundle size sent to clients.",
    createdAt: "2023-03-10T14:45:00Z",
    createdBy: {
      id: "user2",
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    actionItems: [
      "Create proof of concept with Next.js App Router",
      "Benchmark performance improvements",
      "Plan migration strategy for existing components",
    ],
    prIds: ["pr3"],
    prs: [
      {
        id: "pr3",
        title: "POC: React Server Components implementation",
        url: "#",
        author: "alex",
      },
    ],
  },
  {
    id: "3",
    title: "Implement JWT-based authentication",
    summary: "We're moving from session-based auth to JWT tokens to better support our distributed architecture.",
    reasoning:
      "As we scale our services across multiple regions, session management has become increasingly complex. JWT tokens will allow us to implement stateless authentication, reducing database load and simplifying our architecture. This approach also better supports our API-first strategy and mobile applications.",
    createdAt: "2023-03-05T09:15:00Z",
    createdBy: {
      id: "user3",
      name: "Chris Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    actionItems: ["Update auth middleware", "Create token refresh mechanism", "Update client SDKs"],
    prIds: ["pr4", "pr5"],
    prs: [
      {
        id: "pr4",
        title: "Implement JWT authentication service",
        url: "#",
        author: "taylor",
      },
      {
        id: "pr5",
        title: "Update client libraries for JWT support",
        url: "#",
        author: "alex",
      },
    ],
  },
]

export function DecisionFeed() {
  const [selectedDecision, setSelectedDecision] = useState<(typeof decisions)[0] | null>(null)

  return (
    <div className="space-y-4">
      {decisions.map((decision) => (
        <Card key={decision.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{decision.title}</CardTitle>
                <CardDescription className="mt-1">
                  {new Date(decision.createdAt).toLocaleDateString()} by {decision.createdBy.name}
                </CardDescription>
              </div>
              <Avatar>
                <AvatarImage src={decision.createdBy.avatar} alt={decision.createdBy.name} />
                <AvatarFallback>{decision.createdBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">{decision.summary}</p>

            {decision.prs.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <GitPullRequest className="h-4 w-4" />
                  Linked Pull Requests
                </h4>
                <div className="space-y-2">
                  {decision.prs.map((pr) => (
                    <div key={pr.id} className="text-sm flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        PR
                      </Badge>
                      <a href={pr.url} className="hover:underline">
                        {pr.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => setSelectedDecision(decision)}
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                {selectedDecision && (
                  <>
                    <DialogHeader>
                      <DialogTitle>{selectedDecision.title}</DialogTitle>
                      <DialogDescription>
                        Decision made on {new Date(selectedDecision.createdAt).toLocaleDateString()} by{" "}
                        {selectedDecision.createdBy.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Summary</h3>
                        <p className="text-sm">{selectedDecision.summary}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Reasoning</h3>
                        <p className="text-sm">{selectedDecision.reasoning}</p>
                      </div>

                      {selectedDecision.actionItems.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Action Items</h3>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {selectedDecision.actionItems.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedDecision.prs.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                            <GitPullRequest className="h-4 w-4" />
                            Linked Pull Requests
                          </h3>
                          <div className="space-y-2">
                            {selectedDecision.prs.map((pr) => (
                              <div key={pr.id} className="text-sm flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  PR
                                </Badge>
                                <a href={pr.url} className="hover:underline">
                                  {pr.title}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

