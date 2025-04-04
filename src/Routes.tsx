import { Routes, Route } from "react-router";
import EditorPage from "./pages/Editor";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import TranslationsPage from "./pages/Translations";
import DashboardPage from "./pages/Dashboard";
import ProjectLayout from "./pages/ProjectLayout";
import DocumentsPage from "./pages/Documents";
import UploadDocumentPage from "./pages/UploadDocument";
import ProjectSettings from "./components/ProjectDashboard/Settings";
import TmsPage from "./pages/Tms";
import CreateTmPage from "./pages/CreateTm";
import AddTmPairsPage from "./pages/AddTmPairs";
import TmEditorPage from "./pages/TmEditor";
import DashboardProjects from "./components/Dashboard/Projects";
import CreateProjectPage from "./pages/CreateProject";
import DocumentDetailsPage from "./pages/DocumentDetails";
import TranslationDetailsPage from "./pages/TranslationDetails";
import TranslationPreviewPage from "./pages/TranslationPreview";
import DocumentViewerPage from "./pages/DocumentViewer";
import WorkspacePage from "./pages/Workspace";
import DashboardTms from "./components/Dashboard/TMs";
import DashboardTranslationsPage from "./pages/DashboardTranslations";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<RootLayout />}>
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="projects" element={<DashboardProjects />} />
          <Route path="projects/create" element={<CreateProjectPage />} />
          <Route path="translations" element={<DashboardTranslationsPage />} />
          <Route path="tms" element={<DashboardTms />} />
          <Route path="tms/create" element={<CreateTmPage />} />
          <Route path="tms/add-segments" element={<AddTmPairsPage />} />
          <Route
            path="documents/upload/ai"
            element={<UploadDocumentPage mode="ai" />}
          />
          <Route
            path="documents/upload/manual"
            element={<UploadDocumentPage mode="manual" />}
          />
        </Route>
        <Route path="projects/:projectId" element={<ProjectLayout />}>
          <Route path="documents" element={<DocumentsPage />} />
          <Route
            path="documents/:documentId"
            element={<DocumentDetailsPage />}
          />
          <Route
            path="documents/:documentId/preview"
            element={<DocumentViewerPage />}
          />
          <Route
            path="documents/upload"
            element={<UploadDocumentPage mode="ai" />}
          />
          <Route
            path="documents/:documentId/translations"
            element={<TranslationsPage />}
          />
          <Route path="translations" element={<TranslationsPage />} />
          <Route path="tms" element={<TmsPage />} />
          <Route path="tms/create" element={<CreateTmPage />} />
          <Route path="tms/add-segments" element={<AddTmPairsPage />} />
          <Route path="settings" element={<ProjectSettings />} />
          <Route
            path="documents/:documentId/translations/:translationId/details"
            element={<TranslationDetailsPage />}
          />
          <Route
            path="documents/:documentId/translations/:translationId/preview"
            element={<TranslationPreviewPage />}
          />
        </Route>
        <Route
          path="projects/:projectId/documents/:documentId/translations/:translationId"
          element={<EditorPage />}
        />
        <Route path="tms/:tmId" element={<TmEditorPage />} />
      </Route>
    </Routes>
  );
}
