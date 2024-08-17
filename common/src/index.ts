import { z } from "zod";

export const signupInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogSchema = z.object({
  postId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
});

export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type UpdateBlogType = z.infer<typeof updateBlogSchema>;
