import { FormEvent } from "react";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadSingle } from "./useUploadSingle";
import { useBaseMutation } from "./useBaseMutation";
import { DocumentPairId, FileMetadata } from "@/types/Dtos";
import { uploadService } from "@/services/uploadService";
import { FullLangsDomain } from "@/types";
export type CreateTmExcelVariables = {
  file: File;
  fileMetadata: FileMetadata;
};

type UploadConfig = {
  type: "create" | "add";
  tmId?: string;
} & FullLangsDomain;

export function useTmExcelUpload(config: UploadConfig) {
  const { sourceLang, targetLang, domain, type, tmId } = config;
  const { file, setFile } = useUploadSingle();
  const queryClient = useQueryClient();
  const { navigateToTms } = useTranslationRoute();

  const { mutate, isPending: isLoading } = useBaseMutation({
    mutationFn: async (
      variables: CreateTmExcelVariables
    ): Promise<DocumentPairId> => {
      const { file, fileMetadata } = variables;

      if (type === "create") {
        return await uploadService.createTm([file], fileMetadata);
      }

      if (!config.tmId) {
        throw new Error("TM ID is required for adding segments to a TM");
      }

      return await uploadService.addTmPairs([file], {
        ...fileMetadata,
        tmId: config.tmId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      toast.success(
        type === "create"
          ? "Successfully created translation memory"
          : "Successfully added segments to translation memory"
      );
      return navigateToTms();
    },
    onError: (error: Error) => {
      toast.error(`Could not upload translation memory: ${error}`, {
        classNames: {
          toast: "bg-red-200",
        },
      });
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an Excel file");
      return;
    }

    mutate({
      file,
      fileMetadata: { sourceLang, targetLang, domain, tmId },
    });
  }

  function removeFile() {
    setFile(null);
  }

  return {
    file,
    setFile,
    removeFile,
    isLoading,
    handleSubmit,
  };
}
