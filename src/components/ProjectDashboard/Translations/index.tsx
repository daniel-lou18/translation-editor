import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  getAllTranslationsFromProject,
  langArrayToComboItems,
} from "@/utils/helpers";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import TranslationCombobox from "./TranslationCombobox";
import {
  languageToCodeMap as languages,
  languageToCodeMap,
} from "@/utils/constants";
import { Lang } from "@/types";
import { useAddTranslation } from "@/hooks/useAddTranslation";
import PageControls from "@/components/ui/PageControls";
import Container from "@/components/ui/Container";
import Combobox from "@/components/ui/Combobox";
import { useNavigate } from "react-router";

export default function Translations() {
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
  const items = langArrayToComboItems(Object.keys(languages) as Lang[]);

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

  return (
    <>
      <Container className="flex justify-between mb-6">
        <PageTitle title="Translations"></PageTitle>
        <PageControls>
          <SearchForm placeholder="Search translations" />
          <Combobox
            name="document"
            items={docSelectItems}
            value={currentDocument?.fileName || "All translations"}
            onChange={handleSelectDocument}
            buttonVariant="default"
            className="h-8"
          />
          <TranslationCombobox
            name="language"
            items={items}
            isProcessing={isLoading}
            onSelectLang={handleAddTranslation}
          />
        </PageControls>
      </Container>
      <TranslationsTable
        translations={currentDocument ? translations : allTranslations}
        onClick={handleClickTranslation}
      />
    </>
  );
}
