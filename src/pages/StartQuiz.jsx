//!StartQuiz.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    localStorage.setItem("quizUser", JSON.stringify({ name, email }));
    setIsSubmitted(true);
  };

  const startQuiz = () => {
    if (!isSubmitted) {
      alert("Please submit your details before starting the quiz.");
      return;
    }
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white  p-6 rounded-lg shadow-md h-100 w-100"
      >
        <label className="block text-lg font-medium">Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block text-lg font-medium">Email:</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md mb-8"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Submit
        </button>
        <div className="flex items-center justify-center mt-8 ">
          <button
            onClick={startQuiz}
            disabled={!isSubmitted}
            className={`px-4 py-2 text-white rounded-lg text-lg shadow-md transition ${
              isSubmitted ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Start Quiz
          </button>
        </div>

      </form>

    </div>
  );
};

export default StartQuiz;
