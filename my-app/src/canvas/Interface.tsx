import { useState } from "react";
import { Html } from "@react-three/drei";
import { Playfield } from "./Playfield";

const buttonStyle = "rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"

export const Interface = () => {
    const [gameStart, setGameStart] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameReset, setGameReset] = useState<boolean>(false);
    const [gameMute, setGameMute] = useState<boolean>(false);
  
    const handleOnClickStart = () => {
      setGameStart(true);
    };
  
    const handleOnClickNewGame = () => {
      setGameStart(true);
      setGameReset((prev) => !prev);
      setGameOver(false);
    };
  
    const handleOnClickMute = () => {
      setGameMute((prev) => !prev);
    };
  
    const handleOnClickPause = () => {
      setGameStart(false);
    };
  
    const handleGameOver = () => {
      setGameStart(false);
      setGameOver(true);
    };
  
    return (
      <>
        <Html fullscreen>
          {!gameStart && (
            <>
              <button
                className={buttonStyle}
                onClick={handleOnClickStart}
                disabled={gameOver}
              >
                Start
              </button>
              <button className={buttonStyle} onClick={handleOnClickNewGame}>
                New Game
              </button>
              <button className={buttonStyle} onClick={handleOnClickMute}>
                {gameMute ? "Unmute" : "Mute"}
              </button>
            </>
          )}
          {gameStart && (
            <button className={buttonStyle} onClick={handleOnClickPause}>
              Pause
            </button>
          )}
        </Html>
        <Playfield
          gameStart={gameStart}
          gameReset={gameReset}
          handleGameOver={handleGameOver}
        />
      </>
    );
  };
  