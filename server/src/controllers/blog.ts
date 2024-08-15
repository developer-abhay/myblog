const createBlog = (c: any) => {
  return c.text("Blog created");
};

const updateBlog = (c: any) => {
  return c.text("Blog Updated");
};

const getBlog = (c: any) => {
  return c.text("Fetch one blog");
};

const getAllBlogs = (c: any) => {
  return c.text("Fetch All blogs");
};

export { createBlog, updateBlog, getBlog, getAllBlogs };
