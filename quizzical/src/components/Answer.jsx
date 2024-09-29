import React from "react";

export default function Answer(props) {
  let className = "answer";

  if (props.showResults) {
    if (props.isCorrect) {
      className += " correct"; // Add 'correct' class if it's the right answer
    } else if (props.isWrong) {
      className += " wrong"; // Add 'wrong' class if it's the wrong selected answer
    }
  } else if (props.isSelected) {
    className += " selected"; // Highlight selected answer when no results shown
  }

  return (
    <div className={className} onClick={props.onSelect}>
      {props.answer}
    </div>
  );
}
