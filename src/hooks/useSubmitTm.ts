import { uploadService } from "@/services/uploadService";
import { DocumentPairId, AddTmPairsDTO } from "@/types/Dtos";

import { FileMetadata } from "@/types/Dtos";
import { useMutation } from "@tanstack/react-query";

export function useSubmitTm() {
  type CreateTmVariables = {
    files: File[];
    fileMetadata: FileMetadata;
  };

  type AddTmPairsVariables = {
    files: File[];
    fileMetadata: AddTmPairsDTO;
  };

  const { mutate: createTm, isPending, isError, error } = useMutation({
    mutationFn: (variables: CreateTmVariables) => createTranslationMemory(variables),
  });

  const { mutate: addTmSegments, isPending: isAddingTmPairs, isError: isAddingTmPairsError, error: addingTmPairsError } = useMutation({
    mutationFn: (variables: AddTmPairsVariables) => addTmPairs(variables),
  });

  async function createTranslationMemory(
    variables: CreateTmVariables
  ): Promise<DocumentPairId> {
    const { files, fileMetadata } = variables;
    const tmResponse = await uploadService.createTm(files, fileMetadata);
    return tmResponse;
  }

  async function addTmPairs(
    variables: AddTmPairsVariables
  ): Promise<DocumentPairId> {
    const { files, fileMetadata } = variables;
    const tmResponse = await uploadService.addTmPairs(files, fileMetadata);
    return tmResponse;
  }

  return { createTm, addTmSegments, isLoading: isPending, isError, error };
}
