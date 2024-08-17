import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authorize = async (
  c: Context<{
    Bindings: {
      JWT_SECRET: string;
    };
    Variables: {
      userId: string;
    };
  }>,
  next: Next
) => {
  const authorization = c.req.header("authorization");
  const token = authorization?.split(" ")[1];

  if (token) {
    try {
      const payload = await verify(token, c.env.JWT_SECRET);
      c.set("userId", `${payload.id}`);
      await next();
    } catch (error) {
      c.status(401);
      return c.json({ message: "Invalid credentials" });
    }
  } else {
    c.status(403);
    return c.json({ error: "Forbidden" });
  }
};
