"use client";

import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Simple SVG icon components
const PauseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

// const BarChartIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <line x1="12" y1="20" x2="12" y2="10" />
//     <line x1="18" y1="20" x2="18" y2="4" />
//     <line x1="6" y1="20" x2="6" y2="16" />
//   </svg>
// );

// const UsersIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// );

// const MicIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
//     <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//     <line x1="12" y1="19" x2="12" y2="23" />
//     <line x1="8" y1="23" x2="16" y2="23" />
//   </svg>
// );

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

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label="Toggle Sidebar"
          >
            <PauseIcon />
          </button>
        </div>

        <div className="sidebar-content">
          {/* <div className="sidebar-section">
            <div className="sidebar-item">
              <BarChartIcon />
              {isOpen && <span>Analytics</span>}
            </div>
            <div className="sidebar-item">
              <UsersIcon />
              {isOpen && <span>Users</span>}
            </div>
          </div> */}

          <div className="sidebar-content">
            {/* <div className="sidebar-item">
              <MicIcon />
              {isOpen && <span>Recordings</span>}
            </div> */}
            <div className="sidebar-item">
              <UploadIcon />
              {isOpen && <span>Upload document</span>}
            </div>
            <div className="sidebar-item">
              <FileTextIcon />
              {isOpen && <span>Files</span>}
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">
            <div className="avatar-placeholder"></div>
          </div>
        </div>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={onToggle}></div>}
    </>
  );
}
