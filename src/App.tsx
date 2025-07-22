"use client";

import { useState, type JSX } from "react";
import toast, { Toaster } from "react-hot-toast";
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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [savedConversations, setSavedConversations] = useState<Conversation[]>(
    []
  );

  // State for reset handling
  const [inputText, setInputText] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const addToHistory = (userInput: string, botResponse: JSX.Element) => {
    const newConversation: Conversation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      userInput,
      botResponse,
    };
    setConversations((prev) => [newConversation, ...prev]);
  };

  const saveConversation = (history: { user: string; bot: JSX.Element }[]) => {
    const timestamp = new Date().toLocaleString();
    const baseId = Date.now();

    const newSaved = history.map((entry, index) => ({
      id: baseId + index,
      timestamp,
      userInput: entry.user,
      botResponse: entry.bot,
    }));

    setSavedConversations((prev) => [...newSaved, ...prev]);
    toast.success("Conversation saved!");
  };

  const handleNewConversation = () => {
    setResetSignal((prev) => prev + 1); // triggers re-initialization in GenerateTab
    setInputText("");
    setHasSubmitted(false);
    setIsHeaderVisible(true);
    setActiveTab("generate");
  };

  return (
    <div className="app-container">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // green
              secondary: "#fff",
            },
          },
        }}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onTabChange={setActiveTab}
        onNewConversation={handleNewConversation}
      />

      <div className={`main-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
        {isHeaderVisible && <Header />}
        <MainContent
          activeTab={activeTab}
          onTabChange={setActiveTab}
          conversations={conversations}
          onAddToHistory={addToHistory}
          setIsHeaderVisible={setIsHeaderVisible}
          savedConversations={savedConversations}
          onSaveConversation={saveConversation}
          onNewConversation={handleNewConversation}
          inputText={inputText}
          setInputText={setInputText}
          hasSubmitted={hasSubmitted}
          setHasSubmitted={setHasSubmitted}
          resetSignal={resetSignal}
        />
      </div>
    </div>
  );
}

export default App;
