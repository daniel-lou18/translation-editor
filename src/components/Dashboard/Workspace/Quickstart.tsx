import Container from "@/components/ui/Container";
import DashboardCard from "./DashboardCard";
import {
  Brain,
  FolderPlus,
  Globe,
  Layers,
  ListPlus,
  Rocket,
  CreditCard,
} from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import * as url from "@/config/urls";

const data = [
  {
    title: "Create a new project",
    description: "A project is a collection of documents and translations.",
    href: url.createProjectUrl(),
    icon: FolderPlus,
  },
  {
    title: "AI Translation",
    description: "Translate a document with AI",
    href: url.uploadDocumentAiUrl(),
    icon: Brain,
  },
  {
    title: "Start a new translation",
    description: "Upload a document and start translating",
    href: url.uploadDocumentManualUrl(),
    icon: Globe,
  },
  {
    title: "Create a new translation memory",
    description: "Enhance the quality of your translations",
    href: url.createTmUrl(),
    icon: Layers,
  },
  {
    title: "Add segments to an existing TM",
    description: "Enhance the quality of your translations",
    href: url.updateTmUrl(),
    icon: ListPlus,
  },
  {
    title: "Manage subscription",
    description: "View or upgrade your current plan",
    href: "",
    icon: CreditCard,
  },
];

export default function Quickstart() {
  return (
    <Container className="flex flex-col space-y-2">
      <PageTitle
        title={
          <>
            <Rocket size={18} className="relative top-0.5" /> Quickstart
          </>
        }
        level={2}
        classNames={{
          container: "mb-2",
          heading: "text-md text-muted-foreground",
        }}
      />
      <Container className="flex gap-6">
        {data.map((item) => (
          <DashboardCard
            key={item.title}
            href={item.href ?? ""}
            title={item.title}
            description={item.description}
          >
            <item.icon className="relative top-8 text-muted-foreground fill-card/30" />
          </DashboardCard>
        ))}
      </Container>
    </Container>
  );
}
