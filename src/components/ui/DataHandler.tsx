import { ReactNode } from "react";

type DataHandlerProps<DataType> = {
  data: DataType;
  children: (data: NonNullable<DataType>) => ReactNode;
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

export default function DataHandler<DataType>({
  children,
  data,
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
}: DataHandlerProps<DataType>) {
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

  return <>{children(data as NonNullable<DataType>)}</>;
}
