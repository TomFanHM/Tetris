import { useState } from "react";
import { Html } from "@react-three/drei";
import { Playfield } from "./Playfield";

const buttonStyle = "rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"

export const Interface = () => {
    const [gameStart, setGameStart] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameReset, setGameReset] = useState<boolean>(false);
    const [gameMute, setGameMute] = useState<boolean>(false);

    return (
        <>
            <Html fullscreen>
                <button className={buttonStyle} onClick={() => setGameStart(true)}>Start</button>
                <button className={buttonStyle} onClick={() => setGameReset((prev) => !prev)}>New Game</button>
            </Html>
            <Playfield gameStart={gameStart} gameReset={gameReset} />
        </>

    )
}