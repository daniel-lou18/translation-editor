import { FormEvent } from "react";
import { useRoute } from "@/hooks/useRoute";
import { toast } from "sonner";
import { useUploadSingle } from "./useUploadSingle";
import { uploadService } from "@/services/uploadService";
import { FileMetadata } from "@/types/Dtos";
import { getIdsFromTranslation } from "@/utils/helpers";
import { useBaseMutation } from "./useBaseMutation";
import { FullLangsDomain } from "@/types";
import { useLocation } from "react-router";

export type SubmitDocumentResult = {
  projectId: string;
  documentId: string;
  translationId: string;
};

type SubmitDocumentVariables = {
  file: File | null;
  fileMetadata: FileMetadata;
  newProject: boolean;
};

type DocumentUploadConfig = {
  newProject?: boolean;
  tmId?: string;
} & FullLangsDomain;

export function useDocumentUpload(config: DocumentUploadConfig) {
  const { sourceLang, targetLang, domain, newProject = true, tmId } = config;
  const { navigateToTranslation, projectId: urlProjectId } = useRoute();
  const location = useLocation();
  const { file, setFile, removeFile } = useUploadSingle();

  const isDashboard = location.pathname.includes("/dashboard/documents/upload");
  const projectId = isDashboard ? "1" : urlProjectId;

  const { mutate, isPending: isLoading } = useBaseMutation({
    mutationFn: submitDocument,
    onSuccess: (params: SubmitDocumentResult) => {
      return navigateToTranslation(params);
    },
    onError: (error: Error) => {
      toast.error(`Could not upload document: ${error}`, {
        classNames: {
          toast: "bg-red-200",
        },
      });
    },
  });

  async function submitDocument(
    variables: SubmitDocumentVariables
  ): Promise<SubmitDocumentResult> {
    const { file, fileMetadata, newProject } = variables;

    if (!file) {
      throw new Error("File is required");
    }

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({
      file,
      fileMetadata: { sourceLang, targetLang, domain, projectId, tmId },
      newProject,
    });
  }

  return {
    file,
    setFile,
    removeFile,
    isLoading,
    handleSubmit,
  };
}
