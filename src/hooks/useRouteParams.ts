import { useLocation } from "react-router";

export function useRouteParams() {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard/documents/upload");

  return { isDashboard };
}
