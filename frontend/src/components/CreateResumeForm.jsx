import React, { useState } from "react";
import { Input } from "./Inputs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";  // ✅ missing import
import { API_PATHS } from "../utils/apiPath";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");   // ✅ fixed typo
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter a title for your resume");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });
      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError("Resume with this title already exists. Please choose a different title.");
      } else {
        setError("An error occurred while creating the resume. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Resume</h3>
      <p className="text-gray-600 mb-8">
        Give your resume a name and start building it with the sections you need.
      </p>

      <form onSubmit={handleCreateResume} className="space-y-4">
        <Input value={title} onChange={({target})=> setTitle(target.value)}
        label='Resume title' placeholder='EXAMPLE VINOD ' type='text'/>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type='submit' className='w-full py-3 bg-gradient-to-r from -rose-500 to-pink-600 text-white font-black  rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 tarnsition-all'>
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
