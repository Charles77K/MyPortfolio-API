import { model, Schema, Document } from "mongoose";
import { z } from "zod";

export const zodMessageSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message must be at least 10 characters"),
});

interface IMessage extends Document {
  firstname: string;
  lastname: string;
  subject: string;
  message: string;
  email: string;
}

const messageSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
