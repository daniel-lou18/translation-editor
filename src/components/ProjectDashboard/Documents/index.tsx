import DocumentsTable from "@/components/ProjectDashboard/Documents/DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import PageControls from "@/components/ui/PageControls";
import NoContent from "@/components/ui/Error/NoFileContent";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";

export default function Documents() {
  const { currentProject } = useCurrentProject();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredDocuments = useSearch(
    currentProject?.documents || [],
    searchQuery,
    (item, query) => {
      return (
        item.fileName.toLowerCase().includes(query.trim().toLowerCase()) ||
        item.sourceLang.toLowerCase().includes(query.trim().toLowerCase()) ||
        item?.domain?.toLowerCase().includes(query.trim().toLowerCase()) ||
        false
      );
    }
  );

  if (!currentProject) return <NoContent />;

  return (
    <>
      <PageTitle title="Documents">
        <PageControls>
          <SearchForm
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents"
          />
          <Button size="sm" asChild>
            <Link to={`/app/projects/${currentProject.id}/documents/upload`}>
              Upload Document
            </Link>
          </Button>
        </PageControls>
      </PageTitle>
      <DocumentsTable documents={filteredDocuments} />
    </>
  );
}
