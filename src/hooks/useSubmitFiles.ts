import { useMutation } from "@tanstack/react-query";
import { FileInfo } from "./useFileManager";
import { uploadService } from "@/services/uploadService";

type SubmitFileResult = {
  projectId: string;
  documentId: string;
  translationId: string;
};

export function useSubmitFiles() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (files: FileInfo[]) => submitFiles(files),
  });

  async function submitFiles(files: FileInfo[]): Promise<SubmitFileResult> {
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
      const docResponse = await uploadService.submitSourceText(documentFile);
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
