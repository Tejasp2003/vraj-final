"use server";

import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model.ts";
import bcrypt from "bcryptjs";

type UserParams = {
  name: string;
  email: string;
  password: string;
};

export const isUserExists = async (email: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const registerUser = async (user: UserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveCourseAndModules = async (data: any) => {
  console.log("Data:", data.modules[0].lessons);
  try {
    await connectToDatabase();

    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      return null;
    }

    const course = {
      name: data.course.name,
      modules: data.modules,
    };

    user.selectedCourses.push(course);

    await user.save();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchUser = async (email: string) => {
  console.log("Email:", email);
  try {
    await connectToDatabase();

    const user = await User.findOne({
      email,
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isCourseAlreadySelected = (user:any, courseName:any) => {
  
  if (!user || !user.selectedCourses) {
    return false;
  }

  console.log("Selected Courses:", user.selectedCourses);
  console.log("Course Name:", courseName.name);


  console.log(user.selectedCourses.some(course => course.name === courseName.name));



  return user.selectedCourses.some(course => course.name === courseName.name);
};

