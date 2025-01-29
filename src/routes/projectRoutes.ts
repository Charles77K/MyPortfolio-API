import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  uploadProjectImages,
} from "../controllers/projectController";

const projectRouter = express.Router();

projectRouter
  .route("/")
  .get(getAllProjects)
  .post(uploadProjectImages, createProject);

projectRouter
  .route("/:id")
  .patch(uploadProjectImages, updateProject)
  .delete(deleteProject)
  .get(getSingleProject);

export default projectRouter;
