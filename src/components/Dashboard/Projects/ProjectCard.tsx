import { ProjectStatus } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Circle } from "lucide-react";
import Container from "@/components/ui/Container";
import { Link } from "react-router";

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
        className={`hover:bg-muted hover:cursor-pointer transition-all group flex flex-col h-full ${
          className || ""
        }`}
      >
        <CardHeader className="flex-row justify-between flex-grow">
          <Container className="space-y-1.5 flex flex-col">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex-grow">
              <p>{description}</p>
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
          <Circle
            size={10}
            fill={`${status === "active" ? "green" : "grey"}`}
            color={`${status === "active" ? "green" : "grey"}`}
            className="mr-1"
          />{" "}
          {status}
        </CardFooter>
      </Card>
    </Link>
  );
}
