"use client";

import "./QuestionCards.css";

interface QuestionCardsProps {
  onQuestionClick: (question: string) => void;
}

export default function QuestionCards({ onQuestionClick }: QuestionCardsProps) {
  const questions = [
    "What should a safety officer do before workers start working at heights?",
    "What should I take care of when allowing heavy vehicle movement for a cement shipment inside the plant?",
    "What should I do as a supervisor during a spillage or gas emergency?",
  ];

  return (
    <div className="question-cards-section">
      <h3 className="section-title">Looking For?</h3>
      <div className="question-cards-grid">
        {questions.map((question, index) => (
          <button
            key={index}
            className="question-card"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
