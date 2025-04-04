import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useRoute } from "@/hooks/useRoute";
import {
  getAllTranslationsFromProject,
  langArrayToComboItems,
  shortenFileName,
} from "@/utils/helpers";
import {
  languageToCodeMap as languages,
  languageToCodeMap,
} from "@/utils/constants";
import { Lang } from "@/types";
import { useAddTranslation } from "@/hooks/useAddTranslation";
import { useNavigate } from "react-router";
import { ComboDataElement } from "@/components/ui/Combobox";

export function useTranslationActions() {
  const { currentProject, currentDocument } = useCurrentProject();
  const { navigateToDocument, navigateToTranslation } = useRoute();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddTranslation();

  const allTranslations = getAllTranslationsFromProject(currentProject);
  const translations = allTranslations.filter(
    (trans) => trans.documentId === currentDocument?.id
  );
  const docSelectItems = [
    { value: "all", label: "All translations" },
    ...allTranslations.reduce<ComboDataElement<string>[]>(
      (acc, translation) => {
        const id = String(translation.documentId);

        if (!acc.find((el) => el.value === id)) {
          acc.push({
            value: id,
            label: shortenFileName(translation.document.fileName),
          });
        }

        return acc;
      },
      []
    ),
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

    navigateToDocument(documentId);
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
