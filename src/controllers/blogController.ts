import { NextFunction, Request, Response } from "express";
import Blog from "../models/blogModel";
import { catchAsync } from "../utils/catchAsync";
import { upload, uploadToCloudinary } from "../utils/multer";
import { AppError } from "../utils/AppError";
import APIFeatures from "../utils/apiFeatures";

export const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .paginate()
    .sort()
    .limitFields();

  const blogs = await features.query;

  res.status(200).json({
    message: "All Blogs",
    status: "success",
    length: blogs.length,
    blogs,
  });
});

export const uploadBlogImage = upload().single("photo");

export const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, author } = req.body;

    let imageURL = null;

    if (req.file) {
      const uploadedResult = await uploadToCloudinary(req.file);
      imageURL = uploadedResult.secure_url;
    }

    const newBlog = new Blog({
      title,
      content,
      author,
      photo: imageURL,
    });

    const blog = await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      status: "success",
      blog,
    });
  }
);

export const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    let updatedImage = blog.photo;
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file);
      updatedImage = uploadedImage.secure_url;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.photo = updatedImage;

    const updatedBlog = await blog.save();
    res.status(200).json({
      message: "Blog updated successfully",
      status: "success",
      blog: updatedBlog,
    });
  }
);

export const getSingleBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    res.status(200).json({
      message: "Blog found",
      status: "success",
      blog,
    });
  }
);

export const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }
    res.status(204).json({
      message: "Blog deleted successfully",
      status: "success",
    });
  }
);
