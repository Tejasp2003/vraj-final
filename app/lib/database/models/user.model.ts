import { Schema, model, models } from "mongoose";

const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lessons: [LessonSchema],
});

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  modules: [ModuleSchema],
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    selectedCourses: [CourseSchema],
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User;
