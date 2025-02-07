import { z } from "zod";

export const projectNameSchema = z
  .string()
  .trim()
  .min(1, "Project name cannot be empty")
  .max(36, "Project name must be at most 36 characters long");
