import React from "react";
import "./App.css";
import Question from "./components/Question";
import data from "./dataSample.js";
import { decode } from "html-entities";

export default function App() {
  const [questions, setQuestions] = React.useState(data);

  // React.useEffect(() => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setQuestions(data.results);
  //     });
  // }, [one]);

  const allQuestions = questions.map((q) => {
    return (
      <Question
        question={decode(q.question)}
        correctAnswer={decode(q.correct_answer)}
        incorrectAnswers={decode(q.incorrect_answers)}
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
