"use client"
import { fetchUser } from "@/app/lib/actions/auth.action";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [completeUser, setCompleteUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      if (user) {
        const userData = await fetchUser(user.email);
        setCompleteUser(userData);
        setLoading(false);
        console.log("User Data:", userData);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    console.log("User:", user);
    setUser(user);
  }, []);

  useEffect(() => {
    if (!completeUser && user) {
      fetchUserData();
    }
  }, [user, completeUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black p-4">
      <div className="bg-white p-8 rounded shadow-md w-[80vw]">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Profile</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {user && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">User Information</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        {completeUser && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Course Information</h2>
            {completeUser.selectedCourses.map((course, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                     {index + 1}: {" "}
                    {course.name}</h3>
                <ul>
                  {course.modules.map((module, moduleIndex) => (
                    <li key={moduleIndex}>
                      <h4 className="text-lg font-semibold mb-2 mt-2">
                        Module {moduleIndex + 1}: {module.name}
                      </h4>
                      <ul>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex}>
                            <h5 className="text-md font-semibold mb-2">
                              Lesson {lessonIndex + 1}: {lesson.name}
                            </h5>
                            <p>{lesson.content}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
