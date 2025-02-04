import TranslationsBreadcrumb from "./TranslationsBreadcrumb";
import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { formatTranslationsToTableRows } from "@/utils/helpers";

export default function TranslationsPage() {
  const { currentProject, currentDocument, currentTranslations } =
    useCurrentProject();
  const { navigateToTranslation } = useTranslationRoute();

  const translations = formatTranslationsToTableRows(currentTranslations);

  if (!currentProject || !currentDocument) return null;

  return (
    <>
      <TranslationsBreadcrumb
        projectId={currentProject.id}
        projectName={currentProject.name}
        fileName={currentDocument.fileName}
      />
      <TranslationsTable
        translations={translations}
        onClick={(translationId: string) => {
          navigateToTranslation({
            projectId: currentProject.id,
            documentId: currentDocument.id,
            translationId,
          });
        }}
      />
    </>
  );
}
