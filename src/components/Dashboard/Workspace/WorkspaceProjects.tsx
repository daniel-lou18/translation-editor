import Container from "@/components/ui/Container";
import DashboardCard from "./DashboardCard";
import { Circle, Folder, Folders } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { useProjects } from "@/hooks/useProjects";

export default function WorkspaceProjects() {
  const { data: projects } = useProjects();

  return (
    <Container className="flex flex-col space-y-4">
      <PageTitle
        title={
          <>
            <Folders size={18} /> My Projects
          </>
        }
        level={2}
        classNames={{
          container: "mb-2",
          heading: "text-md text-muted-foreground",
        }}
      />
      <Container className="flex gap-6">
        {projects?.map((item) => (
          <DashboardCard
            key={item.id}
            title={item.name}
            description={
              <>
                {" "}
                <Circle
                  size={10}
                  fill={`${item.status === "active" ? "green" : "grey"}`}
                  color={`${item.status === "active" ? "green" : "grey"}`}
                  className="mr-1"
                />{" "}
                {item.status}
              </>
            }
            cardClassName="h-40 w-56"
          >
            <Folder className="h-6 w-6 text-muted-foreground relative top-8 relative top-[72%] fill-card" />
          </DashboardCard>
        ))}
      </Container>
    </Container>
  );
}
