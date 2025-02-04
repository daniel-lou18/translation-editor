import TranslationsBreadcrumb from "./TranslationsBreadcrumb";
import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  formatTranslationsToTableRows,
  getAllTranslationsFromProject,
} from "@/utils/helpers";
import Container from "../ui/Container";
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
      <TranslationsBreadcrumb
        projectId={currentProject.id}
        projectName={currentProject.name}
        fileName={currentDocument?.fileName ?? null}
      />
      <Container className="px-12 py-6 bg-muted/20">
        <PageTitle title="Translations">
          <SearchForm />
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
      </Container>
    </>
  );
}
