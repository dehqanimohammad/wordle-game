import { createContext, useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import Keyboards from "./components/keyboard/Keyboards";
import { initialBoard, ANSWER } from "./util";
import GameOver from "./components/GameOver";
import Title from "./components/Title";

export const Context = createContext();

function App() {
  // answer is hardcoded ("PORSS") and imported from Util.js

  const [board, setBoard] = useState(initialBoard);
  const [currentAttemp, setCurrentAttemp] = useState({
    attemp: 0,
    letterPosition: 0,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const onSelectLetter = (cellValue) => {
    if (currentAttemp.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttemp.attemp][currentAttemp.letterPosition] = cellValue;
    setBoard(newBoard);
    setCurrentAttemp({
      ...currentAttemp,
      letterPosition: currentAttemp.letterPosition + 1,
    });
  };
  const onDelete = () => {
    if (currentAttemp.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttemp.attemp][currentAttemp.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttemp({
      ...currentAttemp,
      letterPosition: currentAttemp.letterPosition - 1,
    });
  };
  const onEnter = () => {
    if (currentAttemp.letterPosition !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttemp.attemp][i];
    }

    setCurrentAttemp({ attemp: currentAttemp.attemp + 1, letterPosition: 0 });
    if (currWord === ANSWER) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttemp.attemp === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };
  return (
    <Context.Provider
      value={{
        ANSWER,
        board,
        setBoard,
        currentAttemp,
        setCurrentAttemp,
        onDelete,
        onEnter,
        onSelectLetter,
        setDisabledLetters,
        disabledLetters,
        gameOver,
        setGameOver,
      }}
    >
      <div className="App">
        <nav>
          <Title />
        </nav>
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboards />}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
