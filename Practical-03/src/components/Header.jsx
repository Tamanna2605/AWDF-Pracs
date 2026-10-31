function Header({ name }) {
  return (
    <header className="hero">
      <div className="hero-content">
        <p className="eyebrow">STUDENT PORTFOLIO · INFORMATION TECHNOLOGY</p>
        <p className="hero-kicker">HELLO, I'M</p>
        <h1>{name}<span>.</span></h1>
        <p className="hero-description">Aspiring Developer · Technology Enthusiast · Lifelong Learner</p>
      </div>
      <div className="hero-mark" aria-hidden="true">TB</div>
    </header>
  );
}

export default Header;
