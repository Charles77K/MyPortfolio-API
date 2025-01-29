import express from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  uploadBlogImage,
  getSingleBlog,
  deleteBlog,
} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.route("/").get(getAllBlogs).post(uploadBlogImage, createBlog);

blogRouter
  .route("/:id")
  .patch(uploadBlogImage, updateBlog)
  .get(getSingleBlog)
  .delete(deleteBlog);

export default blogRouter;
