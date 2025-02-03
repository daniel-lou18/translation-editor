import { ProjectStatus } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronRight, Circle } from "lucide-react";
import Container from "../ui/Container";
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
};

export default function ProjectCard({
  id,
  name,
  info: { description, documentsCount, translationsCount },
  status,
}: ProjectCardProps) {
  return (
    <Link to={id}>
      <Card className="hover:bg-muted hover:cursor-pointer transition-all group">
        <CardHeader className="flex-row justify-between">
          <Container className="space-y-1.5">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>
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
