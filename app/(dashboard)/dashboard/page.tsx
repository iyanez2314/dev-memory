import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingUploadSection } from "@/components/meeting-upload-section";
import { DecisionFeed } from "@/components/decision-feed";
import { RecentPullRequests } from "@/components/recent-pull-requests";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track and recall technical decisions made during development.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Decisions</CardTitle>
            <CardDescription>Tracked technical decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Connected PRs</CardTitle>
            <CardDescription>GitHub pull requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Meetings Processed</CardTitle>
            <CardDescription>Audio files analyzed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="decisions">
        <TabsList>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
          <TabsTrigger value="upload">Upload Meeting</TabsTrigger>
          <TabsTrigger value="pull-requests">Recent PRs</TabsTrigger>
        </TabsList>
        <TabsContent value="decisions" className="space-y-4 pt-4">
          <DecisionFeed />
        </TabsContent>
        <TabsContent value="upload" className="space-y-4 pt-4">
          <MeetingUploadSection />
        </TabsContent>
        <TabsContent value="pull-requests" className="space-y-4 pt-4">
          <RecentPullRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
}
