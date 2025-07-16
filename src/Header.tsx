import "./Header.css";

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
            in operating procedures and guidelines in your plant enviornment.
          </p>
        </div>

        {/* Optional mode toggle section */}
        <div className="mode-toggle">
          <button className="mode-btn active">Operator</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
