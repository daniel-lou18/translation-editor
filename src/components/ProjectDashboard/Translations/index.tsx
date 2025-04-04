import TranslationsTable from "./TranslationsTable";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import TranslationCombobox from "./TranslationCombobox";
import PageControls from "@/components/ui/PageControls";
import Combobox from "@/components/ui/Combobox";
import { useTranslationActions } from "@/hooks/useTranslationActions";
import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";
import { shortenFileName } from "@/utils/helpers";
import NoContent from "@/components/ui/Error/NoFileContent";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTranslations = useSearch(
    currentDocument ? translations : allTranslations,
    searchQuery,
    (item, query) => {
      return (
        item.fileName.toLowerCase().includes(query.trim().toLowerCase()) ||
        item.targetLang.toLowerCase().includes(query.trim().toLowerCase())
      );
    }
  );

  if (!filteredTranslations.length)
    return (
      <NoContent
        title="Translations not found"
        description="The translations you are looking for have been removed or do not exist"
      />
    );

  return (
    <>
      <PageTitle
        title={`${
          currentDocument
            ? shortenFileName(currentDocument.fileName) + " > "
            : ""
        } Translations`}
      >
        <PageControls>
          <SearchForm
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search translations"
          />
          <Combobox
            name="document"
            items={docSelectItems}
            value={String(currentDocument?.id) || ""}
            onChange={handleSelectDocument}
            defaultLabel="All translations"
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
      <TranslationsTable translations={filteredTranslations} />
    </>
  );
}
