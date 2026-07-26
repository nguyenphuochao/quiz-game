import React, { useEffect, useState } from 'react';
import styles from "../styles/Result.module.css";

const Result = ({ score, countQuiz, handlePlayAgain }) => {
    const [name, setName] = useState("");
    const scorePercent = Math.trunc((score * 100) / countQuiz);

    useEffect(() => {
        if (localStorage.getItem("quiz")) {
            let { name } = JSON.parse(localStorage.getItem("quiz"));
            setName(name)
        }
    }, [])

    return (
        <div className={styles.container}>
            <h1>Congratulations <span style={{ fontWeight: "bold" }}>{name}</span>! 🎊🎊</h1>
            <h2>{score} out {countQuiz} answers were correct.</h2>
            <h3>You scored: {scorePercent}%</h3>
            <button onClick={handlePlayAgain}>Play again</button>
        </div>
    )
}

export default Result