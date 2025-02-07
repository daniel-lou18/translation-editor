import { Outlet } from "react-router";
import Container from "../components/ui/Container";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <Container className="min-h-screen bg-gray-50">
      <Outlet />
      <Toaster />
    </Container>
  );
}
