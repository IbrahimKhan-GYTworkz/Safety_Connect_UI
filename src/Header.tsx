import "./styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-main">
          <div className="header-title-bar">
            <h1 className="header-title">Hello, How can I help you?</h1>
          </div>
          {/* Optional description below the heading */}
          <p className="header-description">
            Unleash the power of our cutting-edge technology to gain assistance
            in operating procedures and turning passive knowledge into
            intelligence.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
