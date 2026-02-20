import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {
  createTask as createTaskModel,
  getAllTasks,
  getTaskById as getTaskByIdModel,
  updateTask as updateTaskModel,
  deleteTask as deleteTaskModel,
} from "../models/task.model";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  formatZodError,
} from "../utils/validation";
import { sendErrorResponse, sendNotFoundResponse } from "../utils/response";
import { HTTP_STATUS, ERROR_MESSAGES } from "../utils/constants";

// Create a new task
export const createTask = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Validate request body with Zod
    const validatedData = createTaskSchema.parse(req.body);

    const task = createTaskModel(validatedData);
    res.status(HTTP_STATUS.CREATED).json(task);
  } catch (error) {
    if (error instanceof ZodError) {
      sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, formatZodError(error));
      return;
    }
    next(error);
  }
};

// Get all tasks
export const getTasks = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const { sortBy } = req.query;
    const tasks = getAllTasks(sortBy === "dueDate" ? "dueDate" : undefined);
    res.status(HTTP_STATUS.OK).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get a single task by ID
export const getTaskById = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Validate ID parameter
    const { id } = taskIdSchema.parse(req.params);
    const task = getTaskByIdModel(id);

    if (!task) {
      sendNotFoundResponse(res, ERROR_MESSAGES.TASK_NOT_FOUND);
      return;
    }

    res.status(HTTP_STATUS.OK).json(task);
  } catch (error) {
    if (error instanceof ZodError) {
      sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, formatZodError(error));
      return;
    }
    next(error);
  }
};

// Update a task
export const updateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const { id } = req.params;

    // Check if task exists and is not completed
    const existingTask = getTaskByIdModel(id);
    if (!existingTask) {
      sendNotFoundResponse(res, ERROR_MESSAGES.TASK_NOT_FOUND);
      return;
    }

    // Prevent editing completed tasks
    if (existingTask.status === "completed") {
      sendErrorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.TASK_COMPLETED,
      );
      return;
    }

    // Validate request body with Zod
    const validatedData = updateTaskSchema.parse(req.body);

    const updatedTask = updateTaskModel(id, validatedData);

    if (!updatedTask) {
      sendNotFoundResponse(res, ERROR_MESSAGES.TASK_NOT_FOUND);
      return;
    }

    res.status(HTTP_STATUS.OK).json(updatedTask);
  } catch (error) {
    if (error instanceof ZodError) {
      sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, formatZodError(error));
      return;
    }
    next(error);
  }
};

// Delete a task
export const deleteTask = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Validate ID parameter
    const { id } = taskIdSchema.parse(req.params);
    const deleted = deleteTaskModel(id);

    if (!deleted) {
      sendNotFoundResponse(res, ERROR_MESSAGES.TASK_NOT_FOUND);
      return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof ZodError) {
      sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, formatZodError(error));
      return;
    }
    next(error);
  }
};
