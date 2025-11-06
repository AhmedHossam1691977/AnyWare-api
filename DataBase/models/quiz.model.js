import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be greater than 0"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    state:{
      type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        lowercase: true
    }
  },
  {
    timestamps: true, 
  }
);

export const quizModel =   mongoose.model("Quiz", quizSchema);
