import { z } from "zod";
import validator from "validator";
import { TaskStatus } from "../models/task.model";
import { VALIDATION_CONSTRAINTS } from "./constants";

/**
 * Sanitize string input (trim, remove extra whitespace, and escape HTML)
 */
const sanitizeString = (str: string): string => {
  // First trim and remove extra whitespace
  const trimmed = str.trim().replace(/\s+/g, " ");
  // Then escape HTML to prevent XSS
  return validator.escape(trimmed);
};

/**
 * Validation schema for task ID parameter
 */
export const taskIdSchema = z.object({
  id: z.string().min(1, "ID cannot be empty"),
});

/**
 * Zod schema for task creation with advanced validation
 */
export const createTaskSchema = z
  .object({
    title: z
      .string({ message: "is required" })
      .min(
        VALIDATION_CONSTRAINTS.TITLE_MIN_LENGTH,
        `must be at least ${VALIDATION_CONSTRAINTS.TITLE_MIN_LENGTH} characters long`,
      )
      .max(
        VALIDATION_CONSTRAINTS.TITLE_MAX_LENGTH,
        `must not exceed ${VALIDATION_CONSTRAINTS.TITLE_MAX_LENGTH} characters`,
      )
      .transform(sanitizeString),
    description: z
      .string({ message: "is required" })
      .min(
        VALIDATION_CONSTRAINTS.DESCRIPTION_MIN_LENGTH,
        `must be at least ${VALIDATION_CONSTRAINTS.DESCRIPTION_MIN_LENGTH} characters long`,
      )
      .max(
        VALIDATION_CONSTRAINTS.DESCRIPTION_MAX_LENGTH,
        `must not exceed ${VALIDATION_CONSTRAINTS.DESCRIPTION_MAX_LENGTH} characters`,
      )
      .transform(sanitizeString),
    status: z.nativeEnum(TaskStatus, {
      message: `must be one of: ${Object.values(TaskStatus).join(", ")}`,
    }),
    dueDate: z
      .string({ message: "is required" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "must be a valid date",
      })
      .transform((date) => new Date(date))
      .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
        message: "cannot be in the past",
      }),
  })
  .strict();

/**
 * Zod schema for task update (partial) with advanced validation
 */
export const updateTaskSchema = z
  .object({
    title: z
      .string({ message: "must be a string" })
      .min(
        VALIDATION_CONSTRAINTS.TITLE_MIN_LENGTH,
        `must be at least ${VALIDATION_CONSTRAINTS.TITLE_MIN_LENGTH} characters long`,
      )
      .max(
        VALIDATION_CONSTRAINTS.TITLE_MAX_LENGTH,
        `must not exceed ${VALIDATION_CONSTRAINTS.TITLE_MAX_LENGTH} characters`,
      )
      .transform(sanitizeString)
      .optional(),
    description: z
      .string({ message: "must be a string" })
      .min(
        VALIDATION_CONSTRAINTS.DESCRIPTION_MIN_LENGTH,
        `must be at least ${VALIDATION_CONSTRAINTS.DESCRIPTION_MIN_LENGTH} characters long`,
      )
      .max(
        VALIDATION_CONSTRAINTS.DESCRIPTION_MAX_LENGTH,
        `must not exceed ${VALIDATION_CONSTRAINTS.DESCRIPTION_MAX_LENGTH} characters`,
      )
      .transform(sanitizeString)
      .optional(),
    status: z
      .nativeEnum(TaskStatus, {
        message: `must be one of: ${Object.values(TaskStatus).join(", ")}`,
      })
      .optional(),
    dueDate: z
      .string({ message: "must be a string" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "must be a valid date",
      })
      .transform((date) => new Date(date))
      .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
        message: "cannot be in the past",
      })
      .optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.status !== undefined ||
      data.dueDate !== undefined,
    {
      message:
        "at least one field (title, description, status, or dueDate) must be provided",
    },
  );

/**
 * Type inference from schemas
 */
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

/**
 * Format Zod validation errors into a readable string
 */
export const formatZodError = (error: z.ZodError): string => {
  return error.issues
    .map((issue) => {
      const field = issue.path.join(".");
      return field ? `${field} ${issue.message}` : issue.message;
    })
    .join(", ");
};
