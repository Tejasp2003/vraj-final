"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COURSES } from "./lib/constant";
import { isCourseAlreadySelected } from "./lib/actions/auth.action";
import toast from "react-hot-toast";

const Page = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const user = getUserFromLocalStorage();

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.push("/login");
    }
  }, []);

  const handleCourseSelect = async (course) => {
   
const alreadySelected =await  isCourseAlreadySelected(user, course);

    if (alreadySelected) {
      toast.error("You have already enrolled in this course");
      return;
    }


    console.log("Selected course:", course);
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    router.push("/select-module");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-white p-8 rounded shadow-md w-[80vw] flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Select a Course
        </h1>
        <ul>
          {COURSES.map((course) => (
            <li key={course.id} className="mb-4">
              <div className="bg-gray-800 p-4 rounded w-[60vw] flex justify-center items-center flex-col">
                <h2 className="text-lg font-semibold mb-2 text-white ">
                  {course.name}
                </h2>

                <button
                  className={`mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  
                 
                  `}
                  onClick={() => handleCourseSelect(course)}
                  
                >
                  Select Course
                </button>
                <div className="mt-2">
                  <details className="text-white">
                    <summary className="cursor-pointer">View Modules</summary>
                    <ul>
                      {course.modules.map((module, index) => (
                        <li key={index}>
                          <h3 className="text-lg font-semibold mt-4">
                            {module.name}
                          </h3>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
