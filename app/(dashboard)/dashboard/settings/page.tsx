import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GitHubRepoList } from "@/components/github-repo-list";
import { GitHubConnectButton } from "@/components/github-connect-button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and integrations.
        </p>
      </div>

      <Tabs defaultValue="github">
        <TabsList>
          <TabsTrigger value="github">GitHub Integration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="github" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Connection</CardTitle>
              <CardDescription>
                Connect your GitHub account to track repositories and pull
                requests.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GitHubConnectButton />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repository Selection</CardTitle>
              <CardDescription>
                Select which repositories to track for technical decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GitHubRepoList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to be notified about new decisions and
                updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-decisions">New Decisions</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when new decisions are added
                  </p>
                </div>
                <Switch id="new-decisions" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pr-updates">PR Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when PRs are linked to decisions
                  </p>
                </div>
                <Switch id="pr-updates" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-digest">Weekly Email Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of all new decisions
                  </p>
                </div>
                <Switch id="email-digest" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access to your decision data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Input
                    id="api-key"
                    value="••••••••••••••••••••••••••••••"
                    readOnly
                  />
                  <Button variant="outline">Copy</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Last used: Never
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Your API key has full access to your organization's data. Keep
                it secure!
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
