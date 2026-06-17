import React, { useState } from 'react'
import questions from './questions'

// Quiz component: handles question display, selection, navigation, and scoring
export default function Quiz() {
  // current question index
  const [current, setCurrent] = useState(0)
  // index of the selected option for the current question, or null
  const [selected, setSelected] = useState(null)
  // user score
  const [score, setScore] = useState(0)
  // whether quiz is finished
  const [finished, setFinished] = useState(false)

  // When user selects an option
  function handleSelect(optionIndex) {
    setSelected(optionIndex)
  }

  // Move to next question or finish quiz
  function handleNext() {
    if (selected === null) return // guard: require a selection

    // update score if selected answer is correct
    if (selected === questions[current].answer) {
      setScore((s) => s + 1)
    }

    // reset selection and advance
    setSelected(null)
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
    } else {
      setFinished(true)
    }
  }

  // Restart the quiz from the beginning
  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  // If quiz finished, show final score and Restart button
  if (finished) {
    return (
      <div className="card">
        <h2>Quiz Completed</h2>
        <p className="score">Your Score: {score} / {questions.length}</p>
        <button className="primary" onClick={handleRestart}>Restart Quiz</button>
      </div>
    )
  }

  // Current question object
  const q = questions[current]

  return (
    <div className="card">
      {/* Question header with progress */}
      <div className="question-header">
        <h2>{q.question}</h2>
        <div className="progress">Question {current + 1} of {questions.length}</div>
      </div>

      {/* Options list */}
      <ul className="options">
        {q.options.map((opt, idx) => (
          <li
            key={idx}
            className={"option " + (selected === idx ? 'selected' : '')}
            onClick={() => handleSelect(idx)}
          >
            <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
            <span className="option-text">{opt}</span>
          </li>
        ))}
      </ul>

      {/* Navigation buttons */}
      <div className="controls">
        <button
          className="primary"
          onClick={handleNext}
          disabled={selected === null}
        >
          {current + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
        <button className="muted" onClick={handleRestart}>Restart</button>
      </div>
    </div>
  )
}
