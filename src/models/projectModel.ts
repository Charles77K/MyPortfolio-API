import { Schema, model, Document } from "mongoose";
import slugify from "slugify";

interface ProjectType extends Document {
  title: string;
  images: string[];
  description: string;
  git: string;
  slug: string;
  stack: string[];
  link: string;
  developers: {
    name: string;
    github: string;
    email: string;
    link: string;
    role: string;
  }[];
  createdAt: Date;
}

const ProjectSchema = new Schema({
  title: { type: String, required: true, unique: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  git: { type: String, required: true },
  stack: [{ type: String }],
  link: String,
  slug: String,
  developers: [
    {
      name: { type: String, required: true },
      github: { type: String, required: true },
      email: { type: String, required: true },
      link: { type: String },
      role: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

ProjectSchema.pre("save", function (this: ProjectType) {
  this.slug = slugify(this.title, { lower: true });
});

const Project = model<ProjectType>("Project", ProjectSchema);

export default Project;
