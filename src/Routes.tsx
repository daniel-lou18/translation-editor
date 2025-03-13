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

export default function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<RootLayout />}>
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="projects" element={<DashboardProjects />} />
          <Route path="documents/upload" element={<UploadDocumentPage />} />
        </Route>
        <Route path="projects/:projectId" element={<ProjectLayout />}>
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="documents/upload" element={<UploadDocumentPage />} />
          <Route
            path="documents/:documentId/translations"
            element={<TranslationsPage />}
          />
          <Route path="translations" element={<TranslationsPage />} />
          <Route path="tms" element={<TmsPage />} />
          <Route path="tms/create" element={<CreateTmPage />} />
          <Route path="tms/add-segments" element={<AddTmPairsPage />} />
          <Route path="settings" element={<ProjectSettings />} />
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
