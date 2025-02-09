import { z } from "zod";

export const projectNameSchema = z
  .string()
  .trim()
  .min(1, "Project name cannot be empty")
  .max(36, "Project name must be at most 36 characters long");

export const projectDescriptionSchema = z
  .string()
  .trim()
  .min(3, "Project description must be at least 3 characters long")
  .max(100, "Project description must be at most 100 characters long");
