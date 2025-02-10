import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  getAllTranslationsFromProject,
  langArrayToComboItems,
} from "@/utils/helpers";
import {
  languageToCodeMap as languages,
  languageToCodeMap,
} from "@/utils/constants";
import { Lang } from "@/types";
import { useAddTranslation } from "@/hooks/useAddTranslation";
import { useNavigate } from "react-router";

export function useTranslationActions() {
  const { currentProject, currentDocument } = useCurrentProject();
  const { navigateToDocument, navigateToTranslation } = useTranslationRoute();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddTranslation();

  const allTranslations = getAllTranslationsFromProject(currentProject);
  const translations = allTranslations.filter(
    (trans) => trans.documentId === currentDocument?.id
  );
  const docSelectItems = [
    { value: "all", label: "All translations" },
    ...allTranslations.map((trans) => ({
      value: String(trans.documentId),
      label: trans.document.fileName,
    })),
  ];
  const langItems = langArrayToComboItems(Object.keys(languages) as Lang[]);

  function handleAddTranslation(langCode: Lang) {
    if (currentDocument?.id) {
      mutate({
        language: languageToCodeMap[langCode],
        documentId: currentDocument?.id,
      });
    } else {
      console.log("Document is missing");
    }
  }

  function handleClickTranslation(documentId: number, translationId: number) {
    if (!currentProject) return;

    navigateToTranslation({
      projectId: currentProject.id,
      documentId,
      translationId,
    });
  }

  function handleSelectDocument(documentId: string) {
    if (!currentProject) return;

    if (documentId === "all") {
      return navigate(`/app/projects/${currentProject.id}/translations`);
    }

    navigateToDocument(currentProject.id, documentId);
  }

  return {
    isLoading,
    currentDocument,
    allTranslations,
    translations,
    docSelectItems,
    langItems,
    handleAddTranslation,
    handleClickTranslation,
    handleSelectDocument,
  };
}
