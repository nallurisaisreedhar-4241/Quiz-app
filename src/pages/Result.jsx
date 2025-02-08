//! Result.jsx
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { score = 0, total = 0 } = location.state || {};
  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0;

  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("quizUser")); 
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    if (userData) {
        setCurrentUserName(userData.name); 
  
        const newEntry = {
          name: userData.name,
          email: userData.email,
          score,
          percentage: parseFloat(percentage), 
          date: new Date().toLocaleString(),
        };

      const existingUserIndex = storedLeaderboard.findIndex(
        (entry) => entry.email === userData.email
      );

      if (existingUserIndex !== -1) {
   
        if (storedLeaderboard[existingUserIndex].score < score) {
          storedLeaderboard[existingUserIndex] = newEntry;
        }
      } else {
 
        storedLeaderboard.push(newEntry);
      }

      const updatedLeaderboard = storedLeaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
      setLeaderboard(updatedLeaderboard);
    }
  }, [score, percentage]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 p-6">
      <h2 className="text-3xl font-bold">Quiz Completed!</h2>

      <p className="text-xl mt-4 font-semibold">
  {currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1)}, Your Score: {score} / {total}
</p>

      <p className="text-lg mt-2 text-gray-700">
        Percentage: <span className="font-bold">{percentage}%</span>
      </p>

      <div className="bg-white p-4 rounded-lg shadow-md mt-6 w-80">
        <h3 className="text-xl font-semibold text-center">Leaderboard 🏆</h3>
        <ul className="mt-3">
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <li key={index} className="text-lg border-b py-2">
                <span className="font-bold">{entry.name}</span> - {entry.score} pts
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No scores yet.</p>
          )}
        </ul>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
