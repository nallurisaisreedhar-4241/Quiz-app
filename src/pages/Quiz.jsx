// //?Quiz.jsx
//!2nd
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizData } from '../services/api';
import QuizQuestion from '../Components/QuizQuestion';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); 

  const finishQuiz = () => {
    const correctAnswers = selectedOptions.filter((option) => option.is_correct);
    setScore(score + correctAnswers.length);
    navigate('/results', { state: { score, total: quizData.questions.length } });
  };

  useEffect(() => {
    const getQuizData = async () => {
      const data = await fetchQuizData();
      if (data?.questions?.length > 0) {
        setQuizData(data);
      }
    };
    getQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex, quizData]);

  const handleAnswer = (option) => {
    setSelectedOptions((prev) => {
      if (prev.some((selected) => selected.id === option.id)) {
        return prev.filter((selected) => selected.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const clearSelection = () => {
    setSelectedOptions([]);
  };

  const nextQuestion = () => {
    const correctAnswers = selectedOptions.filter((option) => option.is_correct);
    setScore(score + correctAnswers.length);
    setSelectedOptions([]);
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeLeft(30); 
  };

  if (!quizData || !quizData.questions.length) return <div>Loading...</div>;

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">{quizData.title}</h1>

      <div className="flex justify-between items-center mt-4 mb-4" >
        <h2 className="text-lg font-semibold">
          Question {currentQuestionIndex + 1}/{quizData.questions.length}
        </h2>
        <div className="text-red-500 text-lg font-semibold">
          Time Left: {timeLeft} seconds
        </div>
      </div>

      <QuizQuestion 
        question={currentQuestion} 
        selectedOptions={selectedOptions} 
        handleAnswer={handleAnswer} 
      />

      <div className="mt-6 flex justify-between">
        <button
          onClick={clearSelection}
          disabled={selectedOptions.length === 0}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition disabled:bg-gray-300"
        >
          Clear Selection
        </button>

        {currentQuestionIndex < quizData.questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            disabled={selectedOptions.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            Next
          </button>
        ) : (
          <button
            onClick={finishQuiz}
            disabled={selectedOptions.length === 0}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-gray-300"
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
