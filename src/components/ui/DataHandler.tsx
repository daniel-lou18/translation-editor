import { ReactNode } from "react";

type DataHandlerProps = {
  children: ReactNode;
  loading: {
    isLoading: boolean;
    component?: ReactNode;
  };
  error: {
    isError: boolean;
    error: Error | null;
    component?: ReactNode;
  };
  empty?: {
    isEmpty: boolean;
    component?: ReactNode;
  };
};

export default function DataHandler({
  children,
  loading: { isLoading, component: loadingComponent = <div>Loading...</div> },
  error: {
    isError,
    error,
    component: errorComponent = (
      <div>Error: {error?.message || "An unknown error occurred"}</div>
    ),
  },
  empty = {
    isEmpty: false,
    component: <div>No data available</div>,
  },
}: DataHandlerProps) {
  const { isEmpty, component: emptyComponent } = empty;

  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (isError) {
    return <>{errorComponent}</>;
  }

  if (isEmpty) {
    return <>{emptyComponent}</>;
  }

  return <>{children}</>;
}
