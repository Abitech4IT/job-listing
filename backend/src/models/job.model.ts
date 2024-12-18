import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please enter the job title"],
  },
  type: {
    type: String,
    require: [true, "please enter the job type"],
  },
  tags: {
    type: [String],
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Job = mongoose.model("Job", jobSchema);
