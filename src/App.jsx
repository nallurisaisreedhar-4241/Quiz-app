
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import StartQuiz from "./pages/StartQuiz"
import Quiz from "./pages/Quiz";
import Results from "./pages/Result";

function App() {
    return (
        <Router>
                {/* <h1 className="text-red-500 text-3xl font-bold">Hello Tailwind!</h1> */}

            <Routes>
                <Route path="/" element={<StartQuiz />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    );
}

export default App;
