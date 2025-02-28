import { uploadService } from "@/services/uploadService";
import { DocumentPairId } from "@/types/Dtos";

import { FileMetadata } from "@/types/Dtos";
import { useMutation } from "@tanstack/react-query";

export function useSubmitTm() {
  type SubmitTmVariables = {
    files: File[];
    fileMetadata: FileMetadata;
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables: SubmitTmVariables) => submitTm(variables),
  });

  async function submitTm(
    variables: SubmitTmVariables
  ): Promise<DocumentPairId> {
    const { files, fileMetadata } = variables;
    const tmResponse = await uploadService.submitTm(files, fileMetadata);
    return tmResponse;
  }

  return { mutate, isLoading: isPending, isError, error };
}
