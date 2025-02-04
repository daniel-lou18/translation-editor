import TranslationsBreadcrumb from "./TranslationsBreadcrumb";
import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  formatTranslationsToTableRows,
  getAllTranslationsFromProject,
} from "@/utils/helpers";

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
