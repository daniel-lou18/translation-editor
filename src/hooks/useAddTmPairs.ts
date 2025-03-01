import { useMutation } from "@tanstack/react-query";
import { uploadService } from "@/services/uploadService";
import { DocumentPairId, AddTmPairsDTO } from "@/types/Dtos";

export type AddTmPairsVariables = {
  files: File[];
  fileMetadata: AddTmPairsDTO;
};

export function useAddTmPairs() {
  return useMutation({
    mutationFn: async (variables: AddTmPairsVariables): Promise<DocumentPairId> => {
      const { files, fileMetadata } = variables;
      return await uploadService.addTmPairs(files, fileMetadata);
    },
  });
}
