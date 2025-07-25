import "./styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-main">
          <div className="header-title-bar">
            <h1 className="header-title">
              Ready to unlock clarity in every decision?
            </h1>
          </div>
          {/* Optional description below the heading */}
          <p className="header-description">
            Transform knowledge into insight. Streamline processes. Empower your
            teams with real-time, intelligent guidance—when and where it
            matters.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
