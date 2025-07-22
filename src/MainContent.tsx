"use client";

import type { JSX } from "react";
import GenerateTab from "./GenerateTab";
import HistoryTab from "./HistoryTab";
import QuestionCards from "./QuestionCards";
import SavedTab from "./SavedTab";
import "./styles/MainContent.css";

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
  setIsHeaderVisible: (visible: boolean) => void;
  savedConversations: Conversation[];
  onSaveConversation: (history: { user: string; bot: JSX.Element }[]) => void;

  // ✅ Newly passed props from App
  inputText: string;
  setInputText: (text: string) => void;
  hasSubmitted: boolean;
  setHasSubmitted: (submitted: boolean) => void;
  resetSignal: number;
  onNewConversation: () => void;
}

export default function MainContent({
  activeTab,
  onTabChange,
  conversations,
  onAddToHistory,
  setIsHeaderVisible,
  savedConversations,
  onSaveConversation,
  inputText,
  setInputText,
  hasSubmitted,
  setHasSubmitted,
  resetSignal,
}: MainContentProps) {
  const handleQuestionCardClick = (question: string) => {
    setInputText(question);
    onTabChange("generate");
  };

  return (
    <main className="main-content">
      <div className="tab-navigation"></div>

      <div className="tab-content">
        {activeTab === "generate" ? (
          <GenerateTab
            onAddToHistory={onAddToHistory}
            inputText={inputText}
            setInputText={setInputText}
            setHasSubmitted={setHasSubmitted}
            setIsHeaderVisible={setIsHeaderVisible}
            onSaveConversation={onSaveConversation}
            resetSignal={resetSignal}
          />
        ) : activeTab === "saved" ? (
          <SavedTab
            savedConversations={savedConversations}
            onBack={() => {
              onTabChange("generate");
              setIsHeaderVisible(true);
              setHasSubmitted(false);
            }}
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
