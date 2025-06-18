import { Search, Plus, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockCompetitors, getCountryFlag } from "@/lib/mock-data";

export default function Competitors() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
          <p className="text-muted-foreground">
            Manage registered competitors and their information
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Competitor
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search competitors..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Competitors Table */}
      <div className="admin-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>WCA ID</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompetitors.map((competitor) => (
              <TableRow key={competitor.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div>
                    <p>{competitor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {competitor.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{getCountryFlag(competitor.country)}</span>
                    <span>{competitor.country}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {competitor.wcaId || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {competitor.events.slice(0, 3).map((event) => (
                      <Badge
                        key={event}
                        variant="secondary"
                        className="text-xs"
                      >
                        {event}
                      </Badge>
                    ))}
                    {competitor.events.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{competitor.events.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(competitor.registrationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
