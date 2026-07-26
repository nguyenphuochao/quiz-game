import React, { useEffect, useState } from 'react';
import styles from "../styles/Quiz.module.css";
import Result from './Result';

const quizData = [
    {
        question: "What is React?",
        options: [
            "A Programming Language",
            "A Database",
            "A Javascript Library",
            "A framework"
        ],
        correct: "A Javascript Library"
    },
    {
        question: "Which hook is used to manage state in a functional component?",
        options: [
            "useState",
            "useEffect",
            "A Javascript Library",
            "A framework"
        ],
        correct: "useState"
    },
    {
        question: "Language is not programing language",
        options: [
            "HTML",
            "Javascript",
            "PHP",
            "Python"
        ],
        correct: "HTML"
    },
    {
        question: "What is PHP?",
        options: [
            "Server side render",
            "Client side render",
            "Layout website",
            "Create animation effects"
        ],
        correct: "Server side render"
    }
];

const quizLength = quizData.length;

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectOption, setSelectOption] = useState("");
    const [isQuizEnd, setIsQuizEnd] = useState(false);
    const [result, setResult] = useState(
        Array.from({ length: quizLength })
    );

    const handleNextQuestion = () => {
        if (currentQuestion === quizLength - 1) {
            setIsQuizEnd(true);
        } else {
            setCurrentQuestion(prev => prev + 1)
        }
    }

    const handleSelectOption = (option, index) => {
        const newResult = [...result];
        newResult[currentQuestion] = index;
        setResult(newResult)
        setSelectOption(option)
    }

    const handlePlayAgain = () => {
        setCurrentQuestion(0);
        setIsQuizEnd(false);
    }

    useEffect(() => {
        setSelectOption("");
    }, [currentQuestion])

    if (isQuizEnd) {
        let score = 0;
        for (let i = 0; i < result.length; i++) {
            if (quizData[i].options[result[i]] == quizData[i].correct) {
                score++
            }
        }
        
        return <Result score={score} countQuiz={quizLength} handlePlayAgain={handlePlayAgain} />
    }

    return (
        <div className={styles.container}>
            <div className={styles.label}>Question {currentQuestion + 1}/{quizLength}</div>
            <div className={styles.process}>
                {
                    quizData.map((ques, index) => (
                        <div key={index} className={`${styles.line} ${currentQuestion >= index ? styles.active : ""} `}></div>
                    ))
                }
            </div>
            <h1 className={styles.question}>{quizData[currentQuestion].question}</h1>
            <div className={styles.options}>
                {
                    quizData[currentQuestion].options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectOption(option, index)}
                            className={`${styles.option} ${selectOption === option ? styles.active : ""}`}>
                            {option}
                        </div>
                    ))
                }
            </div>

            <button
                disabled={!selectOption}
                onClick={handleNextQuestion}
                className={`${styles.btnNext} ${!selectOption ? styles.opacity : ""}`}>
                Next ➜
            </button>

        </div>
    )
}

export default Quiz