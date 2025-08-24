import React, { useState } from "react";
import { Input } from "./Inputs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter resume title.");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleCreateResume}
      className="w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Resume</h3>
      <p className="text-gray-600 mb-6">
        Give your resume a title to get started. You can customize everything later.
      </p>

      <Input
        label="Resume Title"
        placeholder="e.g. Frontend Developer Resume"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl shadow-md"
      >
        Create Resume
      </button>
    </form>
  );
};

export default CreateResumeForm;
