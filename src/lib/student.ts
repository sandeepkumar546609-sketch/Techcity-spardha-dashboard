import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    collegeName: { type: String, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type StudentPublic = {
  id: string;
  name: string;
  email: string;
  collegeName: string;
  batch: string;
};

export function toPublicStudent(student: {
  _id: { toString(): string };
  name: string;
  email: string;
  collegeName: string;
  batch: string;
}): StudentPublic {
  return {
    id: student._id.toString(),
    name: student.name,
    email: student.email,
    collegeName: student.collegeName,
    batch: student.batch,
  };
}

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
