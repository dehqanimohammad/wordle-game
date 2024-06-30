import React, { useCallback, useEffect, useContext } from "react";
import Cell from "./Cell";
import { Context } from "../App";

function Keyboards() {
  const { onEnter, onDelete, onSelectLetter, disabledLetters } =
    useContext(Context);

  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      firstRow.forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
      secondRow.forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
      thirdRow.forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line-one">
        {firstRow.map((key) => {
          return (
            <Cell cellValue={key} disabled={disabledLetters.includes(key)} />
          );
        })}
      </div>
      <div className="line-two">
        {secondRow.map((key) => {
          return (
            <Cell cellValue={key} disabled={disabledLetters.includes(key)} />
          );
        })}
      </div>
      <div className="line-three">
        <Cell cellValue={"ENTER"} bigCell />
        {thirdRow.map((key) => {
          return (
            <Cell cellValue={key} disabled={disabledLetters.includes(key)} />
          );
        })}
        <Cell cellValue={"DELETE"} bigCell />
      </div>
    </div>
  );
}

export default Keyboards;
