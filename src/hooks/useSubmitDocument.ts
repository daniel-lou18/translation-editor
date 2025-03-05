import { useMutation } from "@tanstack/react-query";
import { uploadService } from "@/services/uploadService";
import { FileMetadata } from "@/types/Dtos";
import { getIdsFromTranslation } from "@/utils/helpers";

export type SubmitDocumentResult = {
  projectId: string;
  documentId: string;
  translationId: string;
};

type SubmitDocumentVariables = {
  file: File;
  fileMetadata: FileMetadata;
  newProject: boolean;
};

export function useSubmitDocument() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables: SubmitDocumentVariables) =>
      submitDocument(variables),
  });

  async function submitDocument(
    variables: SubmitDocumentVariables
  ): Promise<SubmitDocumentResult> {
    const { file, fileMetadata, newProject } = variables;

    const translation =
      file.type === "text/plain"
        ? await uploadService.submitSourceText(file, fileMetadata, newProject)
        : await uploadService.submitDocumentFile(
            file,
            fileMetadata,
            newProject
          );

    return getIdsFromTranslation(translation);
  }

  return { mutate, isLoading: isPending, isError, error };
}
