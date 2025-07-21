import type { JSX } from "react";
import "./styles/HistoryTab.css";

interface Conversation {
  id: number;
  timestamp: string;
  userInput: string;
  botResponse: JSX.Element;
}

interface HistoryTabProps {
  conversations: Conversation[];
}

export default function HistoryTab({ conversations }: HistoryTabProps) {
  return (
    <div className="history-tab">
      <div className="history-header">
        <h3>Conversation History</h3>
        <p>Track your previous interactions and responses</p>
      </div>

      <div className="history-content">
        {conversations.length === 0 ? (
          <div className="empty-history">
            <p>
              No conversations yet. Start generating to see your history here.
            </p>
          </div>
        ) : (
          <div className="conversation-list">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="conversation-item">
                <div className="conversation-header">
                  <span className="timestamp">{conversation.timestamp}</span>
                </div>
                <div className="conversation-content">
                  <div className="user-message">
                    <strong>You:</strong>
                    <p>{conversation.userInput}</p>
                  </div>
                  <div className="bot-message">
                    <strong>Assistant:</strong>
                    <p>{conversation.botResponse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
