import Container from "@/components/ui/Container";
import DashboardCard from "./DashboardCard";
import { Folder, Folders } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { useProjects } from "@/hooks/useProjects";
import { projectUrl } from "@/config/urls";

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
            href={projectUrl(item.id)}
            title={item.name}
            description={
              <Container>
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    item.status === "active" ? "bg-green-600" : "bg-muted"
                  }`}
                />
                <span>{item.status}</span>
              </Container>
            }
            className="h-40 w-56"
          >
            <Folder className="h-6 w-6 text-muted-foreground relative top-8 relative top-[72%] fill-card" />
          </DashboardCard>
        ))}
      </Container>
    </Container>
  );
}
