import { FormEvent } from "react";
import { useRoute } from "@/hooks/useRoute";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadDouble } from "./useUploadDouble";
import { useBaseMutation } from "./useBaseMutation";
import { DocumentPairId, FileMetadata } from "@/types/Dtos";
import { uploadService } from "@/services/uploadService";
import { FullLangsDomain } from "@/types";

export type CreateTmVariables = {
  files: File[];
  fileMetadata: FileMetadata;
};

type UploadConfig = {
  type: "create" | "add";
  tmId?: string;
} & FullLangsDomain;

export function useTmUpload(config: UploadConfig) {
  const { sourceLang, targetLang, domain, type, tmId } = config;
  const { sourceFile, targetFile, setSourceFile, setTargetFile } =
    useUploadDouble();
  const queryClient = useQueryClient();
  const { navigateToTms } = useRoute();

  const { mutate, isPending: isLoading } = useBaseMutation({
    mutationFn: async (
      variables: CreateTmVariables
    ): Promise<DocumentPairId> => {
      const { files, fileMetadata } = variables;

      if (type === "create") {
        return await uploadService.createTm(files, fileMetadata);
      }

      if (!tmId) {
        throw new Error("TM ID is required for adding segments to a TM");
      }

      return await uploadService.addTmPairs(files, {
        ...fileMetadata,
        tmId: tmId,
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

    if (!sourceFile || !targetFile) {
      toast.error("Please select both source and target files");
      return;
    }

    mutate({
      files: [sourceFile, targetFile],
      fileMetadata: { sourceLang, targetLang, domain, tmId },
    });
  }

  function removeSourceFile() {
    setSourceFile(null);
  }

  function removeTargetFile() {
    setTargetFile(null);
  }

  return {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
    removeSourceFile,
    removeTargetFile,
    isLoading,
    handleSubmit,
  };
}
