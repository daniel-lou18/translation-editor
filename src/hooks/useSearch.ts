import { useMemo } from "react";
import { useDebounce } from "./useDebounce";

export function useSearch<DataType>(
  data: DataType[],
  searchQuery: string,
  filterFn: (item: DataType, query: string) => boolean
) {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProjects = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return data;

    return data?.filter((item) => filterFn(item, debouncedSearchQuery));
  }, [data, debouncedSearchQuery, filterFn]);

  return filteredProjects;
}
