"use client";

import { useState, type JSX } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "./styles/App.css";

interface Conversation {
  id: number;
  timestamp: string;
  userInput: string;
  botResponse: JSX.Element;
}

function App() {
  const [activeTab, setActiveTab] = useState("generate");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const addToHistory = (userInput: string, botResponse: JSX.Element) => {
    const newConversation: Conversation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      userInput,
      botResponse,
    };
    setConversations((prev) => [newConversation, ...prev]);
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className={`main-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Header />
        <MainContent
          activeTab={activeTab}
          onTabChange={setActiveTab}
          conversations={conversations}
          onAddToHistory={addToHistory}
        />
      </div>
    </div>
  );
}

export default App;
