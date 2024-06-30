import React, { useContext } from "react";
import { Context } from "../App";

function GameOver() {
  const { gameOver, ANSWER } = useContext(Context);
  return (
    <div className="gameOver">
      <h1>{gameOver.guessedWord ? "you are correct" : "you lost"}</h1>
      <h1>the word was {ANSWER}</h1>
    </div>
  );
}

export default GameOver;
