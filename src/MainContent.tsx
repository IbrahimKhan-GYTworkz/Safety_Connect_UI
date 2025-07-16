"use client";

import { useState, type JSX } from "react";
import GenerateTab from "./GenerateTab";
import HistoryTab from "./HistoryTab";
import "./MainContent.css";
import QuestionCards from "./QuestionCards";

interface Conversation {
  id: number;
  timestamp: string;
  userInput: string;
  botResponse: JSX.Element;
}

interface MainContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  conversations: Conversation[];
  onAddToHistory: (userInput: string, botResponse: JSX.Element) => void;
}

export default function MainContent({
  activeTab,
  onTabChange,
  conversations,
  onAddToHistory,
}: MainContentProps) {
  const [inputText, setInputText] = useState("Hi, I need help with ...");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleQuestionCardClick = (question: string) => {
    setInputText(question);
    onTabChange("generate");
  };
  return (
    <main className="main-content">
      <div className="tab-navigation">
        {/* <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "generate" ? "active" : ""}`}
            onClick={() => onTabChange("generate")}
          >
            GENERATE
          </button>
          <button
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => onTabChange("history")}
          >
            HISTORY
          </button>
        </div> */}
      </div>

      <div className="tab-content">
        {activeTab === "generate" ? (
          <GenerateTab
            onAddToHistory={onAddToHistory}
            inputText={inputText}
            setInputText={setInputText}
            setHasSubmitted={setHasSubmitted}
          />
        ) : (
          <HistoryTab conversations={conversations} />
        )}
      </div>

      {!hasSubmitted && (
        <QuestionCards onQuestionClick={handleQuestionCardClick} />
      )}
    </main>
  );
}
