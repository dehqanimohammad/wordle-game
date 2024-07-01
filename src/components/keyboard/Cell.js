import React, { useContext } from "react";
import { Context } from "../../App";
function Cell({ cellValue, bigCell, disabled }) {
  const { onEnter, onDelete, onSelectLetter } = useContext(Context);
  const selectCell = () => {
    if (cellValue === "ENTER") {
      onEnter();
    } else if (cellValue === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(cellValue);
    }
  };

  return (
    <div
      className="cell"
      id={bigCell ? "big" : disabled && "disabled"}
      onClick={selectCell}
    >
      {cellValue}
    </div>
  );
}

export default Cell;
