import React from 'react'
import Quiz from './Quiz'

// Root app component: renders header and the Quiz component
export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Simple React Quiz</h1>
        <p className="subtitle">A beginner-friendly quiz app built with React</p>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  )
}
