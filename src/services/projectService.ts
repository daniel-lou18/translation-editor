import { ProjectWithDocsAndTrans } from "@/types";
import { ApiService } from "./ApiService";

export class ProjectService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getProject(projectId: string): Promise<ProjectWithDocsAndTrans> {
    return await this.get(`/projects/${projectId}`);
  }

  async getProjects(): Promise<ProjectWithDocsAndTrans[]> {
    return await this.get("/projects");
  }
}

export const projectService = new ProjectService();
