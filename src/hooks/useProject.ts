// import { projectService } from "@/services/projectService";
// import { ProjectWithTranslations, Translation } from "@/types";
// import { useQuery } from "@tanstack/react-query";

// type ProjectData = {
//   projectData: ProjectWithTranslations;
//   translationData: Translation;
// };

// export function useProject(
//   projectId: string | undefined,
//   translationId: string | undefined
// ) {
//   const { data, isPending, isError, error } = useQuery({
//     queryKey: ["project", projectId],
//     queryFn: () => getProjectData(projectId, translationId),
//     enabled: !!projectId && !!translationId,
//   });

//   async function getProjectData(
//     projectId: string | undefined,
//     translationId: string | undefined
//   ): Promise<ProjectData> {
//     if (!projectId || !translationId) {
//       throw new Error("Project or translation id is missing");
//     }

//     const projectData = await projectService.getProject(projectId);
//     if (!projectData) {
//       throw new Error("Could not find project");
//     }

//     if (!projectData.translations?.length) {
//       throw new Error("Project does not contain any translations");
//     }

//     const translationData = projectData.translations.find(
//       (translation) => translation.id === parseInt(translationId)
//     );
//     if (!translationData) {
//       throw new Error("Could not find translation");
//     }

//     return { projectData, translationData };
//   }

//   return {
//     projectData: data?.projectData || null,
//     translationData: data?.translationData || null,
//     isLoading: isPending,
//     isError,
//     error,
//   };
// }
