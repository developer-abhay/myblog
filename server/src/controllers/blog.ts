import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

type CustomContext = Context<{
  Bindings: { DATABASE_URL: string };
  Variables: { userId: string };
}>;

// Create New Blog route
const createBlog = async (c: CustomContext) => {
  const userId = c.get("userId");
  const { title, content } = await c.req.json();

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
      data: {
        content,
        title,
        authorId: userId,
      },
    });

    return c.json({ postId: post.id });
  } catch (error) {
    return c.json({ message: "Invalid Inputs" });
  }
};

// Update New Blog Route
const updateBlog = async (c: CustomContext) => {
  const { postId, title, content } = await c.req.json();
  const userId = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        content,
        title,
      },
    });

    return c.text("Post Updated");
  } catch (error) {
    return c.json({ message: "Invalid Inputs" });
  }
};

// Get blog from blogId
const getBlog = async (c: CustomContext) => {
  const postId = c.req.param("id");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (post) {
      return c.json({ post });
    }
    return c.json({ message: "No such post found" });
  } catch (error) {
    return c.json({ message: "Something Went wrong" });
  }
};

//
const getAllBlogs = async (c: CustomContext) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const allPosts = await prisma.post.findMany({});
    return c.json({ allPosts });
  } catch (error) {
    return c.json({ message: "Something Went wrong" });
  }
};

export { createBlog, updateBlog, getBlog, getAllBlogs };
