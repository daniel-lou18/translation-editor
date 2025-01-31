import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, MoreHorizontal } from "lucide-react";
import Container from "../ui/Container";

const translations = [
  { language: "English", progress: 100, status: "Completed" },
  { language: "Spanish", progress: 75, status: "In Progress" },
  { language: "French", progress: 50, status: "In Progress" },
  { language: "German", progress: 25, status: "Started" },
  { language: "Italian", progress: 0, status: "Not Started" },
];

export default function TranslationsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Language</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {translations.map((translation) => (
          <TableRow key={translation.language}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {translation.language}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={translation.progress}
                  className="w-[60%] h-2"
                />
                <span className="text-sm text-muted-foreground">
                  {translation.progress}%
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  translation.status === "Completed"
                    ? "default"
                    : translation.status === "In Progress"
                    ? "secondary"
                    : translation.status === "Started"
                    ? "warning"
                    : "destructive"
                }
              >
                {translation.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Update progress</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete translation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
