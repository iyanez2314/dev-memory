import { DecisionSearchResults } from "@/components/decision-search-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search Decisions</h1>
        <p className="text-muted-foreground">Search through past technical decisions using natural language.</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle>Natural Language Search</CardTitle>
          <CardDescription>
            Ask questions like "Why did we change the database layer?" or "What decisions were made about
            authentication?"
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search decisions..." className="pl-8" />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Searches</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Why did we switch to PostgreSQL?
          </Button>
          <Button variant="outline" size="sm">
            Authentication decisions
          </Button>
          <Button variant="outline" size="sm">
            Frontend framework change
          </Button>
          <Button variant="outline" size="sm">
            API versioning
          </Button>
        </div>
      </div>

      <DecisionSearchResults />
    </div>
  )
}

