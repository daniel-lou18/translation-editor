import { Routes, Route } from "react-router";
import EditorPage from "./pages/Editor";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import UploadPage from "./components/Upload";
import ProjectsPage from "./pages/Projects";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<RootLayout />}>
        <Route path="upload" element={<UploadPage />} />
        {/* <Route path="projects" element={<ProjectsPage />} /> */}
        <Route
          path="projects/:projectId/documents/:documentId"
          element={<ProjectsPage />}
        />
        <Route
          path="projects/:projectId/documents/:documentId/translations/:translationId"
          element={<EditorPage />}
        />
      </Route>
    </Routes>
  );
}
