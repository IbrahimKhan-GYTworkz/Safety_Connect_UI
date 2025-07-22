"use client";

import { ChevronDown, Folder, LogOut, PlusIcon } from "lucide-react";
import { useState } from "react";
import "./styles/Sidebar.css";

// SVG Icons

const FileTextIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
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

const BookmarkIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onTabChange: (tab: "generate" | "saved") => void;
  onNewConversation: () => void;
}

const sampleFiles = [
  {
    name: "React Docs",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    name: "Sample Resume",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

export default function Sidebar({
  isOpen,
  onToggle,
  onTabChange,
  onNewConversation,
}: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isFileDropDownOpen, setIsFileDropDownOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const openFile = (fileUrl: string) => setSelectedFile(fileUrl);

  return (
    <>
      {/* Mobile menu toggle (visible only when sidebar is closed) */}
      {!isOpen && (
        <button
          className="mobile-menu-toggle"
          onClick={onToggle}
          aria-label="Open Menu"
        >
          <img src="/onyx_pulse_sidebar.png" className="onyx-sidebar-img" />
        </button>
      )}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label="Toggle Sidebar"
          >
            {isOpen ? (
              <img
                src="/onyx_pulse.svg"
                alt="Open Icon"
                className="icon-with-outline"
              />
            ) : (
              <img src="/onyx_pulse_sidebar.png" className="onyx-sidebar-img" />
            )}
          </button>
        </div>

        <div className="sidebar-content">
          <div
            className="sidebar-item sidebar-btn"
            onClick={onNewConversation}
            style={{ cursor: "pointer" }}
          >
            <PlusIcon className="icon" />
            {isOpen && <span className="label">New Conversation</span>}
          </div>

          <div
            className="sidebar-item file-dropdown"
            onClick={() => setIsFileDropDownOpen(!isFileDropDownOpen)}
          >
            <Folder />
            {isOpen && (
              <span className="chevron-label">
                File Management
                <ChevronDown
                  className={`chevron-icon ${
                    isFileDropDownOpen ? "rotate" : ""
                  }`}
                />
              </span>
            )}
          </div>
          {isFileDropDownOpen && isOpen && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => {
                  onTabChange("generate");
                  setIsFileDropDownOpen(false);
                }}
              >
                <UploadIcon />
                <span>Upload File</span>
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => {
                  openModal();
                  setIsFileDropDownOpen(false);
                }}
              >
                <FileTextIcon />
                <span>View Files</span>
              </div>
            </div>
          )}
          <div
            className="sidebar-item"
            onClick={() => onTabChange("saved")}
            style={{ cursor: "pointer" }}
          >
            <BookmarkIcon />
            {isOpen && <span>Saved Conversations</span>}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <div className="avatar-placeholder" />
            </div>
            {isOpen && <span className="username">Guest</span>}
          </div>
          <div className="logout-icon" title="Logout">
            {isOpen && <LogOut size={20} strokeWidth={1.8} />}
          </div>
        </div>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={onToggle}></div>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>

            {!selectedFile ? (
              <>
                <h2>Files</h2>
                <ul className="file-list">
                  {sampleFiles.map((file) => (
                    <li key={file.name} onClick={() => openFile(file.url)}>
                      📄 {file.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <button
                  className="back-btn"
                  onClick={() => setSelectedFile(null)}
                >
                  ← Back
                </button>
                <iframe
                  src={selectedFile}
                  width="100%"
                  height="500px"
                  title="PDF Viewer"
                ></iframe>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
