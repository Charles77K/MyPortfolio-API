import { Schema, model, Document } from "mongoose";
import slugify from "slugify";

export interface BlogTypes extends Document {
  title: string;
  photo: string;
  content: string;
  slug: string;
  author: string;
  createdAt: Date;
}

const BlogSchema = new Schema({
  title: { type: String, required: true, unique: true },
  slug: String,
  photo: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

BlogSchema.pre("save", function (this: BlogTypes) {
  this.slug = slugify(this.title, { lower: true });
});

const Blog = model<BlogTypes>("Blog", BlogSchema);

export default Blog;
