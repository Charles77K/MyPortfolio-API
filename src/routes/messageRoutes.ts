import express from "express";
import {
  createMessage,
  getAllMessages,
} from "../controllers/messageController";

const messageRouter = express.Router();

messageRouter.route("/").get(getAllMessages).post(createMessage);

export default messageRouter;
