function Header({ name, themeColor }) {
  return (
    <header className="site-header" style={{ backgroundColor: themeColor }}>
      <p className="eyebrow">STUDENT PORTFOLIO</p>
      <h1>{name}</h1>
      <p className="header-subtitle">Learning • Building • Growing</p>
    </header>
  );
}

export default Header;
