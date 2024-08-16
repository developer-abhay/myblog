import { Hono } from "hono";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blog";

import { authorize } from "../Middleware";

export const blogRouter = new Hono();

// Authorization Middleware
blogRouter.use("/*", authorize);

// Blog Routes
blogRouter.get("/:id", getBlog);
blogRouter.get("/bulk", getAllBlogs);
blogRouter.post("/", createBlog);
blogRouter.put("/", updateBlog);
