export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage
let tasks: Task[] = [];
let currentId = 1;

// Helper function to generate ID
const generateId = (): string => {
  return (currentId++).toString();
};

// Helper function to calculate priority based on due date
const calculatePriority = (dueDate: Date): TaskPriority => {
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return TaskPriority.HIGH;
  } else if (diffDays <= 14) {
    return TaskPriority.MEDIUM;
  } else {
    return TaskPriority.LOW;
  }
};

// Create a new task
export const createTask = (
  taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "priority">,
): Task => {
  const priority = calculatePriority(taskData.dueDate);
  const newTask: Task = {
    id: generateId(),
    ...taskData,
    priority,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  return newTask;
};

// Get all tasks with optional sorting
export const getAllTasks = (sortBy?: "dueDate"): Task[] => {
  if (sortBy === "dueDate") {
    return [...tasks].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }
  return tasks;
};

// Get task by ID
export const getTaskById = (id: string): Task | undefined => {
  return tasks.find((task) => task.id === id);
};

// Update task
export const updateTask = (
  id: string,
  taskData: Partial<Omit<Task, "id" | "createdAt" | "priority">>,
): Task | undefined => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return undefined;
  }

  // Recalculate priority if dueDate is being updated
  const priority = taskData.dueDate
    ? calculatePriority(taskData.dueDate)
    : tasks[taskIndex].priority;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...taskData,
    priority,
    updatedAt: new Date(),
  };

  return tasks[taskIndex];
};

// Delete task
export const deleteTask = (id: string): boolean => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
};
