import React from "react";

export default function Answer(props) {
  return (
    <div
      className={`answer ${props.isSelected ? "selected" : ""}`}
      onClick={props.onSelect}
    >
      {props.answer}
    </div>
  );
}
