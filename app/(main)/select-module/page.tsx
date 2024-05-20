"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { saveCourseAndModules } from "@/app/lib/actions/auth.action";

const SelectModulePage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const router = useRouter();

  const getSelectedCourseFromLocalStorage = () => {
    const course = localStorage.getItem("selectedCourse");
    return course ? JSON.parse(course) : null;
  };

  const handleModuleToggle = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter((m) => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCourse || selectedModules.length === 0) {
      toast.error("Please select a course and at least one module");
      return;
    }

    try {
      const user = JSON.parse(localStorage?.getItem("user")!);
      const data = {
        email: user.email,
        course: {
          name: selectedCourse.name,
        },
        modules: selectedModules.map((module) => ({
          name: module.name,
          lessons: module.lessons.map((lesson) => ({
            name: lesson.name,
            content: lesson.content,
          })),
        })),
      };

      await saveCourseAndModules(data);

      toast.success("Course and modules saved successfully");
      router.push("/profile");
    } catch (error) {
      console.error("Error saving course and modules:", error);
      toast.error("Failed to save course and modules");
    }
  };

  useEffect(() => {
    const course = getSelectedCourseFromLocalStorage();
    if (!course) {
      router.push("/");
    } else {
      setSelectedCourse(course);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Select Modules</h1>
        {selectedCourse ? (
          <ul>
            {selectedCourse.modules.map((module) => (
              <li key={module.name} className="mb-4">
                <div className="flex justify-between items-center">
                  <button
                    className={`w-full ${selectedModules.includes(module) ? "bg-green-500" : "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    onClick={() => handleModuleToggle(module)}
                  >
                    {module.name}
                  </button>
                </div>
                {expandedModule === module.name && (
                  <div className="bg-gray-200 p-4 rounded mt-2">
                    <h2 className="text-lg font-semibold mb-2">Lessons</h2>
                    <ul>
                      {module.lessons.map((lesson) => (
                        <li key={lesson.name} className="mb-2">
                          <div className="bg-gray-500 p-2 rounded">
                            <h3 className="text-lg font-semibold text-white">{lesson.name}</h3>
                            <p className="text-white">{lesson.content}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={selectedModules.length === 0}
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectModulePage;
