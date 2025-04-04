import { glossaryService } from "@/services/glossaryService";
import { useQuery } from "@tanstack/react-query";

export function useSearchGlossary(searchQuery: string) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["glossary-search", searchQuery],
    queryFn: () => glossaryService.search(searchQuery),
    enabled: searchQuery.length > 0,
  });

  return { glossaryData: data, isLoading: isPending, isError, error };
}
