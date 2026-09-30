function Contact() {
    const handleSubmit = (event) => {
      event.preventDefault();
  
      alert("Message submitted successfully!");
    };
  
    return (
      <div className="page">
        <h1>Contact</h1>
  
        <form onSubmit={handleSubmit} className="contact-form">
          <label>Name</label>
  
          <input
            type="text"
            placeholder="Enter your name"
            required
          />
  
          <label>Email</label>
  
          <input
            type="email"
            placeholder="Enter your email"
            required
          />
  
          <label>Message</label>
  
          <textarea
            placeholder="Enter your message"
            required
          ></textarea>
  
          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    );
  }
  
  export default Contact;