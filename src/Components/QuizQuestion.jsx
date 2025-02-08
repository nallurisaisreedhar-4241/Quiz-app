//!QuizQuestions

import React from 'react';

const QuizQuestion = ({ question, selectedOptions, handleAnswer }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full h-auto">
      <h2 className="text-xl font-semibold mb-4">{question.description}</h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            <input
              type="radio"
              className="w-5 h-5 accent-blue-600"
              checked={selectedOptions.some((selected) => selected.id === option.id)} // ✅ Multiple selections
              onChange={() => handleAnswer(option)}
            />
            <span>{option.description}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
