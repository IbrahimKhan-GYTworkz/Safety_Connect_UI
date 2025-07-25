"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import "./styles/GenerateTab.css";

interface GenerateTabProps {
  onAddToHistory: (userInput: string, botResponse: JSX.Element) => void;
  inputText: string;
  setInputText: (text: string) => void;
  setHasSubmitted: (value: boolean) => void;
  setIsHeaderVisible: (visible: boolean) => void;
  onSaveConversation: (history: { user: string; bot: JSX.Element }[]) => void;
  resetSignal: number;
}

const MicIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const SaveIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const PdfIcon = () => (
  <svg className="pdf-icon" viewBox="0 0 24 24">
    <path
      d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
      fill="red"
    />
    <text x="4" y="20" fontSize="9" fill="white">
      PDF
    </text>
  </svg>
);

// Hook: Typewriter Effect
function useTypewriterEffect(text: string, speed = 20): string {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

function AnimatedAnswer({ text }: { text: string }) {
  const animatedText = useTypewriterEffect(text);
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animated-answer"
    >
      {animatedText}
    </motion.p>
  );
}

export default function GenerateTab({
  onAddToHistory,
  inputText,
  setInputText,
  setHasSubmitted,
  setIsHeaderVisible,
  onSaveConversation,
  resetSignal,
}: GenerateTabProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    { user: string; bot: JSX.Element }[]
  >([]);
  const [hasFirstSubmission, setHasFirstSubmission] = useState(false);

  useEffect(() => {
    setConversationHistory([]);
    setInputText("");
    setHasSubmitted(false);
    setIsHeaderVisible(true);
    setHasFirstSubmission(false); // Reset this flag too
  }, [resetSignal, setInputText, setHasSubmitted, setIsHeaderVisible]);

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    const botResponse = getBotResponse(inputText);
    setConversationHistory((prev) => [
      ...prev,
      { user: inputText, bot: botResponse },
    ]);

    onAddToHistory(inputText, botResponse);
    setHasSubmitted(true);
    setInputText("");
    setIsHeaderVisible(false);

    // Mark that we've had our first submission
    if (!hasFirstSubmission) {
      setHasFirstSubmission(true);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording((prev) => !prev);
  };

  const handleSaveConversation = () => {
    if (conversationHistory.length > 0) {
      onSaveConversation(conversationHistory);
    }
  };

  const getBotResponse = (input: string): JSX.Element => {
    const normalized = input.toLowerCase();

    if (
      normalized.includes("question 1") ||
      normalized.includes("q1") ||
      normalized.includes("working at heights")
    ) {
      return (
        <>
          <div className="pdf-container">
            <PdfIcon />
            <span>
              <strong>SOP - Work at Heights.pdf</strong>
            </span>
          </div>
          <AnimatedAnswer text="As a safety officer, before workers start working at heights, you should ensure SOP compliance, conduct training, and perform audits. Ensure that the Work at Height Permit is obtained and reviewed, a JSA is conducted, all fall protection equipment is inspected, and anchor points are secure. Also, barricade drop zones and ensure only trained personnel operate elevated platforms." />
        </>
      );
    }

    if (
      normalized.includes("question 2") ||
      normalized.includes("q2") ||
      normalized.includes("vehicle movement") ||
      normalized.includes("cement shipment")
    ) {
      return (
        <AnimatedAnswer text="The provided SOP does not cover procedures for heavy vehicle movement for cement shipment. Please follow plant protocols, communicate with the control room, and ensure PPE compliance. Specify if you need shipment or movement-specific guidance." />
      );
    }

    if (
      normalized.includes("question 3") ||
      normalized.includes("q3") ||
      normalized.includes("confined space") ||
      normalized.includes("gas emergency") ||
      normalized.includes("spillage")
    ) {
      return (
        <>
          <div className="pdf-container">
            <PdfIcon />
            <span>
              <strong>SOP - Confined Space Entry.pdf</strong>
            </span>
          </div>
          <AnimatedAnswer text="During a gas emergency or spillage, a supervisor must ensure emergency procedures are followed, coordinate with safety staff, and initiate rescue if needed. Oversee evacuation, document the event, and communicate clearly with the control room." />
        </>
      );
    }

    return (
      <AnimatedAnswer
        text={`Sorry, I couldn't find a matching response for: "${input}". Please try rephrasing or ask about Question 1, 2, or 3.`}
      />
    );
  };

  return (
    <div
      className={`generate-tab ${hasFirstSubmission ? "has-conversation" : ""}`}
    >
      <div className="conversation-container">
        {conversationHistory.map((entry, index) => (
          <div key={index} className="conversation-block">
            <div className="question-display">
              <h2 className="question-text">{entry.user}</h2>
            </div>

            <div className="answer-section">
              <div className="answer-header">
                <div className="answer-tab active">
                  <span>Answer</span>
                </div>
                <div className="play-audio-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 10h2v4H4v-4zm4-4h2v12H8V6zm4 2h2v8h-2V8zm4-3h2v14h-2V5zm4 6h2v2h-2v-2z" />
                  </svg>
                </div>
              </div>
              <div className="answer-content">{entry.bot}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={`content-box`}>
        <div className="sub-tab-navigation" />
        <div className="input-section">
          <textarea
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything..."
            maxLength={5000}
          />
        </div>

        <div className="controls-section">
          <div className="submit-group">
            <button className="control-btn mic-btn" onClick={handleVoiceRecord}>
              <MicIcon className={isRecording ? "recording" : ""} />
            </button>
            <button
              className="control-btn save-btn"
              onClick={handleSaveConversation}
              title="Save the entire conversation"
            >
              <SaveIcon />
            </button>
            <button
              className="generate-btn perplexity-style"
              onClick={handleSubmit}
            >
              <ArrowRight className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
