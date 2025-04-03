import TranslationsTable from "./TranslationsTable";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import TranslationCombobox from "./TranslationCombobox";
import PageControls from "@/components/ui/PageControls";
import Combobox from "@/components/ui/Combobox";
import { useTranslationActions } from "@/hooks/useTranslationActions";

export default function Translations() {
  const {
    currentDocument,
    translations,
    allTranslations,
    isLoading,
    docSelectItems,
    langItems,
    handleAddTranslation,
    handleSelectDocument,
  } = useTranslationActions();

  return (
    <>
      <PageTitle title="Translations">
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
            items={langItems}
            isProcessing={isLoading}
            onSelectLang={handleAddTranslation}
          />
        </PageControls>
      </PageTitle>
      <TranslationsTable
        translations={currentDocument ? translations : allTranslations}
      />
    </>
  );
}
