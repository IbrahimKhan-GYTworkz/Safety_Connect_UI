"use client";

import React, { useState, type JSX } from "react";
import "./GenerateTab.css";

interface GenerateTabProps {
  onAddToHistory: (userInput: string, botResponse: JSX.Element) => void;
  inputText: string;
  setInputText: (text: string) => void;
  setHasSubmitted: (value: boolean) => void;
}

// Simple icon components
const MicIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
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

const UploadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,5 17,10" />
    <line x1="12" y1="5" x2="12" y2="15" />
  </svg>
);

// const SettingsIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <circle cx="12" cy="12" r="3" />
//     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
//   </svg>
// );

// const ChevronDownIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <polyline points="6,9 12,15 18,9" />
//   </svg>
// );

export default function GenerateTab({
  onAddToHistory,
  inputText,
  setInputText,
  setHasSubmitted,
}: GenerateTabProps) {
  // const [activeSubTab, setActiveSubTab] = useState("text-to-speech");
  //   const [inputText, setInputText] = useState("Hi, I need help with ...");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  //   const [selectedVoice, setSelectedVoice] = useState("Rachel");
  const [isRecording, setIsRecording] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    { user: string; bot: JSX.Element }[]
  >([]);

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese",
    "Japanese",
    "Korean",
  ];

  //   const voices = ["Rachel", "John", "Sarah", "Michael", "Emma", "David"];

  const handleSubmit = () => {
    if (inputText.trim()) {
      const botResponse = getBotResponse(inputText); // simulate or call API

      // Push to conversation history
      setConversationHistory((prev) => [
        ...prev,
        { user: inputText, bot: botResponse },
      ]);

      onAddToHistory(inputText, botResponse); // Optional external tracking
      setHasSubmitted(true);
      setInputText(""); // Clear input
    }
  };

  const PdfIcon = () => (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "6px" }}
    >
      <path
        d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
        fill="red"
      />
      <text x="4" y="20" fontSize="9" fill="white">
        PDF
      </text>
    </svg>
  );

  // This is a mock bot response function for demo purposes
  const getBotResponse = (input: string): JSX.Element => {
    const normalized = input.toLowerCase();

    if (
      normalized.includes("question 1") ||
      normalized.includes("q1") ||
      normalized.includes("working at heights")
    ) {
      return (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.5rem",
              border: "1px solid grey",
              width: "230px",
              borderRadius: "8px",
              height: "60px",
              backgroundColor: "#efefef",
              color: "#676666",
            }}
          >
            <PdfIcon />
            <span>
              <strong>SOP - Work at Heights.pdf</strong>
            </span>
          </div>
          <p>
            As a safety officer, before workers start working at heights, you
            should ensure SOP compliance, conduct training, and perform audits.
            Specifically, you need to ensure that the Work at Height Permit is
            obtained and reviewed, a Job Safety Analysis (JSA) is conducted for
            the task, all fall protection equipment is inspected for wear and
            tear, and anchor points are certified and secure. Additionally,
            ensure the drop zone below is barricaded and that only trained
            personnel operate elevated platforms. These steps help prevent falls
            and injuries, ensuring a safe working environment at heights.
          </p>
        </div>
      );
    }

    if (
      normalized.includes("question 2") ||
      normalized.includes("q2") ||
      normalized.includes("vehicle movement") ||
      normalized.includes("cement shipment")
    ) {
      return (
        <p>
          The provided SOP context does not contain specific information about
          procedures or safety measures for allowing heavy vehicle movement for
          cement shipment inside the plant. For your role as an operator, it is
          important to follow general plant safety protocols, communicate
          clearly with the control room and other team members, and ensure all
          safety procedures and PPE requirements are met during such operations.
          If you need detailed guidance, please specify if you want information
          related to vehicle movement safety or shipment handling procedures.
        </p>
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
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <PdfIcon />
            <span>
              <strong>SOP - Confined Space Entry.pdf</strong>
            </span>
          </div>
          <p>
            As a supervisor during a spillage or gas emergency, your key
            responsibilities include ensuring that the emergency procedures are
            followed promptly and effectively. This involves coordinating with
            the safety officer and attendants to raise alarms, initiate rescue
            plans if needed, and ensure that emergency services are contacted.
            You should also oversee the evacuation or containment efforts,
            ensure that all personnel are accounted for, and document the
            incident for management review. Maintaining clear communication with
            your team and the control room is critical to manage the situation
            safely and efficiently.
          </p>
        </div>
      );
    }

    return (
      <p>
        Sorry, I couldn't find a matching response for: "{input}". Please try
        rephrasing or ask about Question 1, 2, or 3.
      </p>
    );
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleFileUpload = () => {
    console.log("File upload clicked");
  };

  //   const handleQuestionCardClick = (question: string) => {
  //     setInputText(question);
  //     onTabChange("generate"); // Switch to Generate tab if not already there
  //   };

  return (
    <div className="generate-tab">
      <div className="chat-history">
        {conversationHistory.map((entry, index) => (
          <React.Fragment key={index}>
            {/* User message block */}
            <div className="chat-message chat-user">
              <strong>Question :</strong>
              <div className="chat-text">{entry.user}</div>
            </div>

            {/* Bot response block */}
            <div className="chat-message chat-bot">
              <div className="answer-heading">Answer:</div>
              <div className="chat-text">{entry.bot}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="content-box">
        <div className="sub-tab-navigation">
          {/* <button
            className={`sub-tab-btn ${
              activeSubTab === "text-to-speech" ? "active" : ""
            }`}
            onClick={() => setActiveSubTab("text-to-speech")}
          >
            TEXT TO SPEECH
          </button> */}
          {/* <button
            className={`sub-tab-btn ${
              activeSubTab === "speech-to-speech" ? "active" : ""
            }`}
            onClick={() => setActiveSubTab("speech-to-speech")}
          >
            SPEECH TO SPEECH
          </button> */}
        </div>

        <div className="input-section">
          <textarea
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            maxLength={5000}
          />
        </div>

        <div className="controls-section">
          <div className="control-group">
            {/* <div className="voice-selector">
              <div className="voice-avatar">
                <div className="avatar-circle"></div>
              </div>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="voice-select"
              >
                {voices.map((voice) => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))}
              </select>
              <ChevronDownIcon />
            </div> */}

            <div className="language-selector">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-select"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <button className="control-btn mic-btn" onClick={handleVoiceRecord}>
              <MicIcon className={isRecording ? "recording" : ""} />
            </button>

            <button
              className="control-btn upload-btn"
              onClick={handleFileUpload}
            >
              <UploadIcon />
            </button>

            {/* <button className="settings-btn">
              <SettingsIcon />
              <span>Settings</span>
            </button> */}
          </div>
          <div className="submit-section">
            {/* <div className="character-count">{inputText.length}/ 5000</div> */}
            <button className="generate-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <QuestionCards onQuestionClick={handleQuestionCardClick} /> */}
    </div>
  );
}
