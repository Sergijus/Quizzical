import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(null); // Track number of correct answers
  const [showResults, setShowResults] = useState(false); // To trigger the check

  // Function to fetch new questions from the API
  const fetchQuestions = () => {
    fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        // Add unique IDs to the questions
        const formattedQuestions = data.results.map((q) => ({
          ...q,
          id: nanoid(),
        }));
        setQuestions(formattedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  // Fetch questions when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []); // Run once on mount

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const checkAnswers = () => {
    let count = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === decode(q.correct_answer)) {
        count++;
      }
    });

    setCorrectCount(count); // Set the correct count
    setShowResults(true); // Trigger results display and color change
  };

  const resetQuiz = () => {
    setSelectedAnswers({}); // Reset selected answers
    setCorrectCount(null); // Reset the score
    setShowResults(false); // Hide results
    fetchQuestions(); // Fetch new questions when starting again
  };

  const allQuestions = questions.map((q) => {
    return (
      <Question
        key={q.id}
        question={decode(q.question)}
        correctAnswer={decode(q.correct_answer)}
        incorrectAnswers={q.incorrect_answers.map(decode)}
        onAnswerSelect={handleAnswerSelect}
        selectedAnswer={selectedAnswers[q.id]} // Track the selected answer by question ID
        id={q.id} // Pass unique ID
        showResults={showResults} // Pass the state to trigger color change
      />
    );
  });

  return (
    <>
      <main>
        {allQuestions}
        <div className="result-container">
          {correctCount !== null ? (
            <h2>
              You got {correctCount} out of {questions.length} correct!
            </h2>
          ) : (
            <h2>Check answers when you're done.</h2>
          )}
        </div>
        {showResults ? (
          <button className="button reset" onClick={resetQuiz}>
            Start again
          </button>
        ) : (
          <button className="button" onClick={checkAnswers}>
            Check answers
          </button>
        )}
      </main>
    </>
  );
}
