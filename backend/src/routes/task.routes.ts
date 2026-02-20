import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

// POST /tasks - Create a new task
router.post("/tasks", createTask);

// GET /tasks - Get all tasks
router.get("/tasks", getTasks);

// GET /tasks/:id - Get a single task by ID
router.get("/tasks/:id", getTaskById);

// PUT /tasks/:id - Update a task
router.put("/tasks/:id", updateTask);

// DELETE /tasks/:id - Delete a task
router.delete("/tasks/:id", deleteTask);

export default router;
