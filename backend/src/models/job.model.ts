import { Schema, Document, model } from "mongoose";

export interface IJob extends Document {
  title: string;
  type: string;
  tags: string[];
  location: string;
  imageUrl?: string;
  createdAt?: string;
}

const jobSchema: Schema<IJob> = new Schema({
  title: {
    type: String,
    require: [true, "please enter the job title"],
  },
  type: {
    type: String,
    require: [true, "please enter the job type"],
  },
  location: {
    type: String,
    require: [true, "please enter the job location"],
  },
  tags: {
    type: [String],
  },
  imageUrl: {
    type: String,
    default: "jobdp.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Job = model<IJob>("Job", jobSchema);
