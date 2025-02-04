import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  formatTranslationsToTableRows,
  getAllTranslationsFromProject,
} from "@/utils/helpers";
import PageTitle from "../ui/PageTitle";
import SearchForm from "../ui/SearchForm";
import { Button } from "../ui/button";

export default function Translations() {
  const { currentProject, currentDocument, currentTranslations } =
    useCurrentProject();
  const { navigateToTranslation } = useTranslationRoute();

  if (!currentProject) return null;

  const allTranslations = getAllTranslationsFromProject(currentProject);
  const translations = formatTranslationsToTableRows(currentTranslations);

  return (
    <>
      <PageTitle title="Translations">
        <SearchForm placeholder="Search translations" />
        <Button size="sm">New Translation</Button>
      </PageTitle>
      <TranslationsTable
        translations={currentDocument ? translations : allTranslations}
        onClick={(documentId: string, translationId: string) => {
          navigateToTranslation({
            projectId: currentProject.id,
            documentId,
            translationId,
          });
        }}
      />
    </>
  );
}
