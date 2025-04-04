import TranslationsTable from "@/components/ProjectDashboard/Translations/TranslationsTable";
import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { Globe } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { formatTranslationsToTable } from "@/utils/helpers";

export default function WorkspaceTranslations() {
  const { translations, isLoading, error } = useTranslations();

  const title = (
    <>
      <Globe size={18} /> Recent translations
    </>
  );

  return (
    <Container className="flex flex-col space-y-4">
      <PageTitle
        title={title}
        level={2}
        classNames={{
          container: "mb-2",
          heading: "text-md text-muted-foreground",
        }}
      />
      <TranslationsTable
        translations={formatTranslationsToTable(translations)}
      />
    </Container>
  );
}
