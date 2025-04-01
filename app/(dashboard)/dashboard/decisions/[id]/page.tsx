import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GitPullRequest, FileText, MessageSquare, LinkIcon } from "lucide-react"

// Mock data - in a real app, this would come from an API
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
    meetingId: "meeting1",
    meeting: {
      id: "meeting1",
      name: "Architecture Review - March 15",
      uploadedAt: "2023-03-15T09:00:00Z",
      duration: "45 minutes",
    },
  },
  // ... other decisions
]

export default function DecisionDetailPage({ params }: { params: { id: string } }) {
  const decision = decisions.find((d) => d.id === params.id)

  if (!decision) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{decision.title}</h1>
        <p className="text-muted-foreground">
          Decision made on {new Date(decision.createdAt).toLocaleDateString()} by {decision.createdBy.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Created By</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={decision.createdBy.avatar} alt={decision.createdBy.name} />
                <AvatarFallback>{decision.createdBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{decision.createdBy.name}</p>
                <p className="text-sm text-muted-foreground">
                  Created on {new Date(decision.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <p>{decision.meeting.name}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Linked PRs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
              <p>{decision.prs.length} pull requests</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{decision.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reasoning</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{decision.reasoning}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="action-items">
        <TabsList>
          <TabsTrigger value="action-items">Action Items</TabsTrigger>
          <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
          <TabsTrigger value="meeting">Meeting Source</TabsTrigger>
        </TabsList>

        <TabsContent value="action-items" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>Tasks to be completed based on this decision</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {decision.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 bg-muted flex items-center justify-center text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pull-requests" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Linked Pull Requests</CardTitle>
              <CardDescription>GitHub pull requests related to this decision</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {decision.prs.map((pr) => (
                  <div key={pr.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center gap-2">
                      <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{pr.title}</span>
                      <span className="text-sm text-muted-foreground">by @{pr.author}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meeting" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Source</CardTitle>
              <CardDescription>Details about the meeting where this decision was made</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Meeting Name</p>
                    <p className="text-sm text-muted-foreground">{decision.meeting.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(decision.meeting.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{decision.meeting.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Uploaded</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(decision.meeting.uploadedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Original Recording
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

