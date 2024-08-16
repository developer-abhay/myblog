import { Context } from "hono";

type CustomContext = Context<{
  Bindings: { DATABASE_URL: string };
  Variables: { userId: string };
}>;

const createBlog = (c: CustomContext) => {
  return c.text("Blog created");
};

const updateBlog = (c: CustomContext) => {
  return c.text("Blog Updated");
};

const getBlog = (c: CustomContext) => {
  c.env.DATABASE_URL;
  const userId = c.get("userId");
  console.log(userId);
  return c.text("Fetch one blog");
};

const getAllBlogs = (c: CustomContext) => {
  return c.text("Fetch All blogs");
};

export { createBlog, updateBlog, getBlog, getAllBlogs };
