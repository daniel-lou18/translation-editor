import {
  NewProject,
  OptionalProjectWithId,
  Project,
  ProjectWithDocsAndTrans,
  ProjectWithDocsAndTransWithDoc,
} from "@/types";
import { ApiService } from "./ApiService";

export class ProjectService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getProject(projectId: string): Promise<ProjectWithDocsAndTrans> {
    return this.get(`/projects/${projectId}`);
  }

  async getProjects(): Promise<ProjectWithDocsAndTransWithDoc[]> {
    return this.get("/projects");
  }

  async createProject(project: NewProject): Promise<Project> {
    return this.post("/projects", { project });
  }

  async updateProject(project: OptionalProjectWithId): Promise<Project> {
    return this.post(`/projects/${project.id}`, { project });
  }

  async deleteProject(projectId: number): Promise<void> {
    return this.delete(`/projects/${projectId}`, { timeout: 60000 });
  }
}

export const projectService = new ProjectService();
