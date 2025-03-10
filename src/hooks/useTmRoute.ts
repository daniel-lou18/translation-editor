import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export function useTmRoute() {
  const { tmId } = useParams<{ tmId: string }>();
  const navigate = useNavigate();

  const navigateToTm = useCallback(
    (id?: number) => {
      if (id) {
        return navigate(`/app/tms/${id}`);
      }

      if (!tmId) {
        throw new Error("Tm id is missing");
      }

      navigate(`/app/tms/${tmId}`);
    },
    [navigate, tmId]
  );

  return {
    tmId,
    navigateToTm,
  };
}
