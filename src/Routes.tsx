import { Routes, Route } from "react-router";
import EditorPage from "./pages/Editor";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import Upload from "./components/Upload";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<RootLayout />}>
        <Route path="upload" element={<Upload />} />
        <Route
          path="projects/:projectId/documents/:documentId/translations/:translationId"
          element={<EditorPage />}
        />
      </Route>
    </Routes>
  );
}
