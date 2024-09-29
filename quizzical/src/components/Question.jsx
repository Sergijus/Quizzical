import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  const shuffledAnswers = React.useMemo(() => {
    let allAnswers = [...props.incorrectAnswers, props.correctAnswer];
    return allAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, []);

  return (
    <div className="question">
      <h2>{props.question}</h2>
      <div className="answers-container">
        {shuffledAnswers.map((a) => (
          <Answer
            key={a}
            answer={a}
            isSelected={props.selectedAnswer === a}
            isCorrect={a === props.correctAnswer}
            isWrong={
              props.selectedAnswer === a &&
              props.selectedAnswer !== props.correctAnswer
            }
            showResults={props.showResults} // Use this to trigger color change
            onSelect={() => props.onAnswerSelect(props.id, a)}
          />
        ))}
      </div>
    </div>
  );
}
