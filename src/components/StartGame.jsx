import React, { useEffect, useState } from 'react';
import styles from "../styles/StartGame.module.css";
import Quiz from './Quiz';

const regexPhone = /^\d{10,11}$/
const nameLength = 3;

const StartGame = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isQuiz, setIsQuiz] = useState(false);

    const handleStartGame = () => {
        if (!name || !phone) {
            alert("Please enter your name and your phone!")
            return;
        }

        if (name.trim().length < nameLength) {
            alert(`Please enter your name from ${nameLength} charset`)
            return;
        }

        if (!regexPhone.test(phone)) {
            alert("Please enter correct format your phone!")
            return;
        }

        // save localStorage
        localStorage.setItem("quiz", JSON.stringify({
            name,
            phone
        }))

        // Quiz game
        setIsQuiz(true);
    }

    useEffect(() => {
        if (localStorage.getItem("quiz")) {
            let { name, phone } = JSON.parse(localStorage.getItem("quiz"));
            setName(name);
            setPhone(phone);
        }
    }, [])

    if (isQuiz) {
        return <Quiz />
    }

    return (
        <div className={styles.container}>
            <h1>Let's get started 👋👋</h1>
            <div className='form-group'>
                <label className={styles.label} htmlFor="name">Your name</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className={styles.formControl}
                    type="text"
                    placeholder='Enter your name'
                    id='name'
                    value={name} />
            </div>

            <div className='form-group'>
                <label className={styles.label} htmlFor="number">Contact number</label>
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.formControl}
                    type="text"
                    placeholder='Enter contact number'
                    id='number'
                    value={phone} />
            </div>

            <button className={styles.buttonStart} onClick={handleStartGame}>Start the Quiz</button>
        </div>
    )
}

export default StartGame