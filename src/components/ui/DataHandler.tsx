import { ReactNode } from "react";

type DataHandlerProps = {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
};

export default function DataHandler({
  children,
  isLoading,
  isError,
  error,
  loadingComponent = <div>Loading...</div>,
  errorComponent = (
    <div>Error: {error?.message || "An unknown error occurred"}</div>
  ),
}: DataHandlerProps) {
  if (isLoading) {
    return <>{loadingComponent} </>;
  }

  if (isError) {
    return <>{errorComponent} </>;
  }
  return children;
}
