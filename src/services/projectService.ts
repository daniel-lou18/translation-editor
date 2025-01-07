import { ProjectWithTranslations } from "@/types";
import { ApiService } from "./ApiService";

export class ProjectService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getProject(projectId: string): Promise<ProjectWithTranslations> {
    return await this.get(`/projects/${projectId}`);
  }
}

export const projectService = new ProjectService();
