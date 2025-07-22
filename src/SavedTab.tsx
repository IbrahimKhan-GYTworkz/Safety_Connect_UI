// SavedTab.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import type { JSX } from "react";
import "./styles/SavedTab.css";

interface SavedTabProps {
  savedConversations: {
    id: number;
    timestamp: string;
    userInput: string;
    botResponse: JSX.Element;
  }[];
  onBack: () => void;
}

export default function SavedTab({
  savedConversations,
  onBack,
}: SavedTabProps) {
  return (
    <div className="saved-tab">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back
      </button>

      <h2 className="saved-title">Saved Conversations</h2>
      {savedConversations.length === 0 ? (
        <p className="empty-msg">No saved conversations yet.</p>
      ) : (
        <div className="saved-list">
          {savedConversations.map((conv) => (
            <div className="saved-card" key={conv.id}>
              <div className="saved-meta">
                <span className="timestamp">{conv.timestamp}</span>
              </div>
              <div className="saved-content">
                <div className="saved-question">{conv.userInput}</div>
                <div className="saved-response">{conv.botResponse}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
