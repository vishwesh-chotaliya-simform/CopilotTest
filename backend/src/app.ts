import express, { Application } from "express";
import healthRoutes from "./routes/health.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/errorHandler";
import { requestTimer, requestLogger } from "./middleware/logger";

const app: Application = express();

// Request logging middleware
app.use(requestTimer);
app.use(requestLogger);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", healthRoutes);
app.use("/api", taskRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
