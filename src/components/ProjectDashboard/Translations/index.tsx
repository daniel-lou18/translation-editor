import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  formatTranslationsToTableRows,
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

export default function Translations() {
  const { currentProject, currentDocument, currentTranslations } =
    useCurrentProject();
  const { navigateToTranslation } = useTranslationRoute();
  const { mutate, isLoading } = useAddTranslation();

  if (!currentProject) return null;

  const allTranslations = getAllTranslationsFromProject(currentProject);
  const translations = formatTranslationsToTableRows(currentTranslations);
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

  return (
    <>
      <PageTitle title="Translations">
        <SearchForm placeholder="Search translations" />
        <TranslationCombobox
          name="language"
          items={items}
          isProcessing={isLoading}
          onSelectLang={handleAddTranslation}
        />
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
