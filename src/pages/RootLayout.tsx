import { Outlet } from "react-router";
import Container from "../components/ui/Container";

export default function RootLayout() {
  return (
    <Container className="min-h-screen bg-gray-50/50">
      <Outlet />
    </Container>
  );
}
