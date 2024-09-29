import React from "react";
import "./App.css";
import Question from "./components/Question";
import data from "./dataSample.js";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = React.useState(() =>
    data.map((q) => ({
      ...q,
      id: nanoid(), // Add an `id` field to each question only once
    }))
  );
  const [selectedAnswers, setSelectedAnswers] = React.useState({});

  // React.useEffect(() => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setQuestions(data.results);
  //     });
  // }, [one]);

  const handleAnswerSelect = (questionId, a) => {
    console.log(questionId, a);
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: a,
    }));
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
      />
    );
  });

  return (
    <>
      <main>
        {allQuestions}
        <button className="button">Check answers</button>
      </main>
    </>
  );
}
