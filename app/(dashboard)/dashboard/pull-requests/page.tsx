import { PullRequestList } from "@/components/pull-request-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function PullRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pull Requests</h1>
        <p className="text-muted-foreground">View and manage GitHub pull requests linked to technical decisions.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search pull requests..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
        <Button>Refresh</Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All PRs</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="merged">Merged</TabsTrigger>
          <TabsTrigger value="with-decisions">With Decisions</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 pt-4">
          <PullRequestList />
        </TabsContent>
        <TabsContent value="open" className="space-y-4 pt-4">
          <PullRequestList status="open" />
        </TabsContent>
        <TabsContent value="merged" className="space-y-4 pt-4">
          <PullRequestList status="merged" />
        </TabsContent>
        <TabsContent value="with-decisions" className="space-y-4 pt-4">
          <PullRequestList withDecisions={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

