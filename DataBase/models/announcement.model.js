import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: [true, "Created by is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const announcementModel = mongoose.model("Announcement", announcementSchema);
