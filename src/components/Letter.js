import React, { useContext, useEffect } from "react";
import { Context } from "../App";

function Letter({ letterPosition, attemptValue }) {
  const { board, ANSWER, currentAttemp, setDisabledLetters, disabledLetters } =
    useContext(Context);
  const letter = board[attemptValue][letterPosition];

  const correct = ANSWER[letterPosition] === letter;
  const semiCorrect = !correct && letter !== "" && ANSWER.includes(letter);
  const letterState =
    currentAttemp.attemp > attemptValue &&
    (correct ? "correct" : semiCorrect ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !semiCorrect) {
      setDisabledLetters((prevState) => [...prevState, letter]);
    }
  }, [currentAttemp.attemp]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
