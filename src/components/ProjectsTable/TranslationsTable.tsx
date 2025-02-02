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
import { Progress } from "@/components/ui/progress-bar";
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
import { LangCode } from "@/types";

type TranslationsTableProps = {
  translations: {
    lang: LangCode;
    progress: number;
    status: string | null;
    updatedAt: string;
  }[];
};

export default function TranslationsTable({
  translations,
}: TranslationsTableProps) {
  return (
    <Container className="px-12 py-6">
      <h1 className="font-bold text-2xl mb-2">Translations</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-0">Language</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last update</TableHead>

            <TableHead className="w-[100px] pr-0">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {translations.map(({ lang, progress, status, updatedAt }) => (
            <TableRow key={lang}>
              <TableCell className="pl-0">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" strokeWidth={1.5} />
                  {lang}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-[60%] h-2" />
                  <span className="text-xs text-muted-foreground">
                    {progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${
                    status === "Completed"
                      ? "bg-green-300"
                      : status === "In Progress"
                      ? "bg-yellow-300"
                      : ""
                  }`}
                >
                  {status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(updatedAt).toLocaleDateString()}</TableCell>
              <TableCell className="pr-0">
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
    </Container>
  );
}
