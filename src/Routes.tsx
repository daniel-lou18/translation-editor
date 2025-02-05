import { Routes, Route } from "react-router";
import EditorPage from "./pages/Editor";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import UploadPage from "./components/Upload/UploadLanding";
import TranslationsPage from "./pages/Translations";
import DashboardPage from "./pages/Dashboard";
import ProjectLayout from "./pages/ProjectLayout";
import DocumentsPage from "./pages/Documents";
import UploadDocumentPage from "./pages/UploadDocument";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<RootLayout />}>
        <Route path="upload" element={<UploadPage />} />

        <Route path="projects" element={<DashboardPage />} />
        <Route path="projects/:projectId" element={<ProjectLayout />}>
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="documents/upload" element={<UploadDocumentPage />} />
          <Route
            path="documents/:documentId/translations"
            element={<TranslationsPage />}
          />
          <Route path="translations" element={<TranslationsPage />} />
        </Route>
        <Route
          path="projects/:projectId/documents/:documentId/translations/:translationId"
          element={<EditorPage />}
        />
      </Route>
    </Routes>
  );
}
