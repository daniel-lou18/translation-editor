import { useMutation } from "@tanstack/react-query";
import { uploadService } from "@/services/uploadService";
import { DocumentPairId, FileMetadata } from "@/types/Dtos";

export type CreateTmVariables = {
  files: File[];
  fileMetadata: FileMetadata;
};

export function useCreateTm() {
  return useMutation({
    mutationFn: async (variables: CreateTmVariables): Promise<DocumentPairId> => {
      const { files, fileMetadata } = variables;
      return await uploadService.createTm(files, fileMetadata);
    },
  });
}
