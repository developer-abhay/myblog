import { Hono } from "hono";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blog";

export const blogRouter = new Hono();

blogRouter.post("/", createBlog);
blogRouter.put("/", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.get("/bulk", getAllBlogs);
