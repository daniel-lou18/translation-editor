import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import PageControls from "@/components/ui/PageControls";
import TranslationsTable from "@/components/ProjectDashboard/Translations/TranslationsTable";
import { useTranslations } from "@/hooks/useTranslations";
import { formatTranslationsToTable } from "@/utils/helpers";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Globe, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import DashboardCard from "../Workspace/DashboardCard";

const toggleData = [
  { value: "table", icon: List },
  { value: "grid", icon: LayoutGrid },
];

type ViewMode = "table" | "grid";

const title = (
  <>
    <Globe size={22} strokeWidth={1.5} /> Translations
  </>
);

export default function DashboardTranslations() {
  const { translations } = useTranslations({ limit: 50 });
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const toggleViewMode = (value: ViewMode) => {
    if (!value) return;
    setViewMode(value);
  };

  return (
    <>
      <PageTitle title={title}>
        <PageControls className="gap-4">
          <SearchForm placeholder="Search translations" />
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
          translations={formatTranslationsToTable(translations)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
          {translations?.map((translation) => {
            return (
              <DashboardCard
                key={translation.id}
                title={`${translation.document.sourceLang} > ${translation.targetLang}`}
                description={translation.document.domain}
                cardClassName="w-full h-44"
              >
                <div className="text-sm font-medium">
                  {translation.document.fileName}
                </div>
              </DashboardCard>
            );
          })}
        </div>
      )}
    </>
  );
}
