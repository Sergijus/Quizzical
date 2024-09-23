import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  let allAnswers = [...props.incorrectAnswers, props.correctAnswer];

  let shuffledAnswers = allAnswers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return (
    <div className="question">
      <h2>{props.question}</h2>
      <div className="answers-container">
        {shuffledAnswers.map((a) => {
          return <Answer answer={a} />;
        })}
      </div>
    </div>
  );
}
