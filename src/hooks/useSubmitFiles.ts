import { useMutation } from "@tanstack/react-query";
import { FileInfo } from "./useFileManager";
import { uploadService } from "@/services/uploadService";
import { FileMetadata } from "@/types/Dtos";

type SubmitFileResult = {
  projectId: string;
  documentId: string;
  translationId: string;
};

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
    const { files, fileMetadata } = variables;
    const documentFile = files.find((file) => file.type === "document")?.file;
    const tmFiles = files
      .filter((file) => file.type === "memory")
      ?.map((item) => item.file);
    const result: SubmitFileResult = {
      projectId: "",
      documentId: "",
      translationId: "",
    };

    if (documentFile) {
      const docResponse = await uploadService.submitSourceText(
        documentFile,
        fileMetadata
      );
      result.projectId = docResponse.document.projectId.toString();
      result.documentId = docResponse.document.id.toString();
      result.translationId = docResponse.id.toString();
    }

    if (tmFiles.length > 0) {
      const tmResponse = await uploadService.submitTmTexts(tmFiles);
      console.log({ tmResponse });
    }

    return result;
  }

  return { mutate, isLoading: isPending, isError, error };
}
