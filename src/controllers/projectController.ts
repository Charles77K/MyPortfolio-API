import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { upload } from "../utils/multer";
import APIFeatures from "../utils/apiFeatures";

export const getAllProjects = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = await new APIFeatures(Project.find(), req.query)
      .filter()
      .sort()
      .paginate()
      .limitFields();
    const projects = await features.query;

    res.status(200).json({
      message: "All Projects",
      status: "success",
      length: projects.length,
      projects,
    });
  }
);

export const uploadProjectImages = upload("../uploads/projects").array(
  "images",
  5
);

export const createProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, git, stack, link, developers } = req.body;

    const images = req.files
      ? (req.files as Express.Multer.File[]).map((file) => file.filename)
      : [];

    const newProject = new Project({
      title,
      images,
      description,
      git,
      stack,
      link,
      developers,
    });

    const project = await newProject.save();
    res.status(201).json({
      message: "Project created successfully",
      status: "success",
      project,
    });
  }
);

export const updateProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, git, stack, link, developers } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    let updatedImages = project.images;
    if (req.files) {
      updatedImages = (req.files as Express.Multer.File[]).map(
        (file) => file.filename
      );
    }
    project.title = title || project.title;
    project.description = description || project.description;
    project.git = git || project.git;
    project.stack = stack || project.stack;
    project.link = link || project.link;
    project.images = updatedImages || project.images;
    project.developers = developers || project.developers;

    const newProject = await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      status: "success",
      project: newProject,
    });
  }
);

export const deleteProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return next(new AppError("project not found", 404));
    }
    res.status(200).json({
      message: "Project deleted successfully",
      status: "success",
    });
  }
);

export const getSingleProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    res.status(200).json({
      message: "Project found",
      status: "success",
      project,
    });
  }
);
