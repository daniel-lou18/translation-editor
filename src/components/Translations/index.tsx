import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import {
  formatTranslationsToTableRows,
  getAllTranslationsFromProject,
  langArrayToComboItems,
} from "@/utils/helpers";
import PageTitle from "../ui/PageTitle";
import SearchForm from "../ui/SearchForm";
import TranslationCombobox from "./TranslationCombobox";
import { languageToCodeMap as languages } from "@/utils/constants";
import { Lang } from "@/types";

export default function Translations() {
  const { currentProject, currentDocument, currentTranslations } =
    useCurrentProject();
  const { navigateToTranslation } = useTranslationRoute();

  if (!currentProject) return null;

  const allTranslations = getAllTranslationsFromProject(currentProject);
  const translations = formatTranslationsToTableRows(currentTranslations);
  const items = langArrayToComboItems(Object.keys(languages) as Lang[]);

  return (
    <>
      <PageTitle title="Translations">
        <SearchForm placeholder="Search translations" />
        <TranslationCombobox name="language" items={items} />
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
