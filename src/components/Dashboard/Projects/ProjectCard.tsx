import { ProjectStatus } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  id: string;
  name: string;
  info: {
    description: string | null;
    documentsCount: number;
    translationsCount: number;
  };
  status: ProjectStatus;
  className?: string;
};

export default function ProjectCard({
  id,
  name,
  info: { description, documentsCount, translationsCount },
  status,
  className,
}: ProjectCardProps) {
  return (
    <Link to={`/app/projects/${id}/documents`} className="block h-full">
      <Card
        className={cn(
          "relative group transition-all group flex flex-col h-full shadow-md hover:-translate-y-1 hover:translate-x-0.5 hover:bg-muted hover:shadow-xl hover:border-muted-foreground/50 transition-all duration-300 ease-in-out",
          className
        )}
      >
        <CardHeader className="flex-row justify-between flex-grow">
          <Container className="space-y-1.5 flex flex-col">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex-grow">
              {description}
            </CardDescription>
          </Container>
          <ChevronRight className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-2 group-hover:transition-all duration-300 ease-out" />
        </CardHeader>
        <CardContent className="flex">
          <p className="text-sm pr-2 border-r border-r-gray-400">
            Documents: {documentsCount}
          </p>
          <p className="text-sm pl-2">Translations: {translationsCount}</p>
        </CardContent>
        <CardFooter className="text-sm">
          <Container>
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                status === "active" ? "bg-green-600" : "bg-muted"
              }`}
            />
            <span>{status}</span>
          </Container>
        </CardFooter>
      </Card>
    </Link>
  );
}
