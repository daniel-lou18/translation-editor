import { useMutation } from "@tanstack/react-query";
import { FileInfo } from "./useFileManager";
import { uploadService } from "@/services/uploadService";
import { FileMetadata, DocumentPairId } from "@/types/Dtos";
import { getIdsFromTranslation } from "@/utils/helpers";

type SubmitDocumentResult = {
  projectId: string;
  documentId: string;
  translationId: string;
};

export type SubmitFileResult = SubmitDocumentResult | DocumentPairId;

type SubmitVariables = {
  files: FileInfo[];
  fileMetadata: FileMetadata;
  newProject: boolean;
};

export function useSubmitFiles() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables: SubmitVariables) => submitFiles(variables),
  });

  async function submitFiles(
    variables: SubmitVariables
  ): Promise<SubmitFileResult> {
    const { files, fileMetadata, newProject } = variables;
    const documentFile = files.find((file) => file.type === "document")?.file;
    const tmFiles = files
      .filter((file) => file.type === "memory")
      ?.map((item) => item.file);

    if (tmFiles.length > 0) {
      const tmResponse = await uploadService.submitDocPair(tmFiles, fileMetadata);
      console.log({ tmResponse });

      return tmResponse;
    }

    if (documentFile) {
      const translation =
        documentFile.type === "text/plain"
          ? await uploadService.submitSourceText(
              documentFile,
              fileMetadata,
              newProject
            )
          : await uploadService.submitFile(
              documentFile,
              fileMetadata,
              newProject
            );

      return getIdsFromTranslation(translation);
    }

    throw new Error("Could not submit files");
  }

  return { mutate, isLoading: isPending, isError, error };
}
