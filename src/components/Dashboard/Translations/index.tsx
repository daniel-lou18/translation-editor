import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import PageControls from "@/components/ui/PageControls";
import TranslationsTable from "@/components/ProjectDashboard/Translations/TranslationsTable";
import { useTranslations } from "@/hooks/useTranslations";
import { formatTranslationsToTable, shortenFileName } from "@/utils/helpers";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Globe, LayoutGrid, List } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import Container from "@/components/ui/Container";
import TranslationCard from "./TranslationCard";

type ViewMode = "table" | "grid";

const statusColors = {
  in_progress: "bg-yellow-500",
  completed: "bg-green-600",
  not_started: "bg-muted",
};

const toggleData = [
  { value: "table", icon: List },
  { value: "grid", icon: LayoutGrid },
];

const title = (
  <>
    <Globe size={22} strokeWidth={1.5} /> Translations
  </>
);

export default function DashboardTranslations() {
  const { translations } = useTranslations({ limit: 50 });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const filteredTranslations = useSearch(
    translations,
    searchQuery,
    (translation, query) =>
      translation.document.fileName
        .toLowerCase()
        .includes(query.trim().toLowerCase()) ||
      translation.document?.domain
        ?.toLowerCase()
        .includes(query.trim().toLowerCase()) ||
      translation.document?.sourceLang
        ?.toLowerCase()
        .includes(query.trim().toLowerCase()) ||
      translation?.targetLang
        ?.toLowerCase()
        .includes(query.trim().toLowerCase()) ||
      false
  );

  const toggleViewMode = (value: ViewMode) => {
    if (!value) return;
    setViewMode(value);
  };

  return (
    <>
      <PageTitle title={title}>
        <PageControls className="gap-4">
          <SearchForm
            placeholder="Search translations"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={toggleViewMode}
          >
            {toggleData.map(({ value, icon: Icon }) => (
              <ToggleGroupItem
                size="sm"
                key={value}
                value={value}
                aria-label={`Toggle ${value}`}
                className="data-[state=on]:bg-cat-accent/10"
              >
                {<Icon />}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </PageControls>
      </PageTitle>

      {viewMode === "table" ? (
        <TranslationsTable
          translations={formatTranslationsToTable(filteredTranslations)}
        />
      ) : (
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
          {filteredTranslations?.map((translation) => (
            <TranslationCard
              key={translation.id}
              data={{
                header: shortenFileName(translation.document.fileName),
                content: `${translation.document.sourceLang} > ${translation.targetLang}`,
                footerLeft: translation.document.domain,
                status: {
                  label: translation.status || "not_started",
                  color:
                    statusColors[
                      translation.status as keyof typeof statusColors
                    ],
                },
              }}
            />
          ))}
        </Container>
      )}
    </>
  );
}
