/**
 * HTTP Status Code Constants
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Validation Constants
 */
export const VALIDATION_CONSTRAINTS = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  TASK_NOT_FOUND: "Task not found",
  TASK_COMPLETED: "Cannot update a completed task",
} as const;
