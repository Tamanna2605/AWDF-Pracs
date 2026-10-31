import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const maxLength = 300;

  function handleSubmit(event) {
    event.preventDefault();
    alert("Thanks! This is a frontend-only practical form; no message has been sent to a server.");
  }

  return (
    <main className="container page-container">
      <section className="section contact-section">
        <span className="section-number">CONTACT / SAY HELLO</span>
        <h1 className="page-title">Let’s start a <span>conversation.</span></h1>
        <p className="section-intro">Have a question or an idea? Send me a message.</p>
        <div className="contact-layout">
          <div className="contact-note">
            <h2>Get in touch.</h2>
            <p>I’m always happy to connect with people who enjoy learning, building, and exploring technology.</p>
            <button className="help-button" type="button" onClick={() => setShowHelp(!showHelp)}>
              {showHelp ? "Hide form help −" : "Need help? +"}
            </button>
            {showHelp && <div className="help-box">Write a short message. Your text and character count update as you type.</div>}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="message">Your message</label>
            <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)}
              placeholder="Write something here..." maxLength={maxLength} rows="6" />
            <div className="form-meta"><span>{message.length}/{maxLength} characters</span><span>Live preview</span></div>
            <div className="message-preview">
              <span className="preview-label">LIVE PREVIEW</span>
              <p>{message || "Your message will appear here..."}</p>
            </div>
            <button className="submit-button" type="submit" disabled={!message.trim()}>Submit message ↗</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
