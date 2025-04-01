import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GitPullRequest, GitMerge, Calendar, FileText, LinkIcon } from "lucide-react"

// Mock data - in a real app, this would come from an API
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
  // ... other PRs
]

export default function PullRequestDetailPage({ params }: { params: { id: string } }) {
  const pr = pullRequests.find((p) => p.id === params.id)

  if (!pr) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pr.title}</h1>
          <p className="text-muted-foreground">
            #{pr.id.replace("pr", "")} opened by {pr.author.username} on {new Date(pr.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={pr.status === "merged" ? "default" : "outline"} className="text-base py-1 px-3">
          {pr.status === "merged" ? <GitMerge className="mr-2 h-4 w-4" /> : <GitPullRequest className="mr-2 h-4 w-4" />}
          {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={pr.author.avatar} alt={pr.author.name} />
                <AvatarFallback>{pr.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{pr.author.name}</p>
                <p className="text-sm text-muted-foreground">@{pr.author.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p>{new Date(pr.createdAt).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {pr.status === "merged" && pr.mergedAt && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Merged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <GitMerge className="h-4 w-4 text-muted-foreground" />
                <p>{new Date(pr.mergedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{pr.description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="files">
        <TabsList>
          <TabsTrigger value="files">Files Changed</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="decisions">Linked Decisions</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Files Changed ({pr.filesChanged.length})</CardTitle>
              <CardDescription>Files modified in this pull request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pr.filesChanged.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Discussions</CardTitle>
              <CardDescription>Comments and discussions on this pull request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pr.discussions.map((discussion, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">@{discussion.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(discussion.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{discussion.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Linked Decisions</CardTitle>
              <CardDescription>Technical decisions linked to this pull request</CardDescription>
            </CardHeader>
            <CardContent>
              {pr.linkedDecisions.length > 0 ? (
                <div className="space-y-4">
                  {pr.linkedDecisions.map((id) => (
                    <div key={id} className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Decision #{id}</Badge>
                        <span className="font-medium">Switch from MongoDB to PostgreSQL</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <LinkIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No linked decisions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This pull request doesn't have any linked decisions yet.
                  </p>
                  <Button className="mt-4">Link a Decision</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

