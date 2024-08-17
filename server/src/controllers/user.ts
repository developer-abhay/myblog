import { signinInput, signupInput } from "@developerabhay/common-myblog";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { sign } from "hono/jwt";

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

// SignUp Handler
const signup = async (c: Context<{ Bindings: Env }>) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    return c.json({ message: "Enter valid Values" });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (e: unknown) {
    return c.json({ error: "Internal Server Error" });
  }
};

// Signin Route
const signin = async (c: Context<{ Bindings: Env }>) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    return c.json({ message: "Invalid Inputs" });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Internal Server Error" });
  }
};

export { signup, signin };
