import React, { useState } from 'react';
import './Chatbot.css';
import axios from 'axios';

// Markdown parsing function
const parseMarkdown = (text) => {
  // Headings
  text = text.replace(/^###\s*(.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/^##\s*(.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^#\s*(.+)$/gm, '<h1>$1</h1>');

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  text = text.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');

  // Paragraphs (for lines not wrapped in tags)
  text = text.replace(/^(?!<h\d>|<ul>|<li>|<p>|<strong>)(.+)$/gm, '<p>$1</p>');

  return text;
};

const Chatbot = ({ context }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    setInput('');

    try {
      // Send user input to the backend for processing
      const res = await axios.post('http://localhost:8000/api/chat', {
        question: input,
        context: context
      });

      // Parse the response from the bot (Markdown to HTML)
      const botMsg = { 
        sender: 'bot', 
        text: parseMarkdown(res.data.answer) // Parse the markdown response
      };

      // Add bot response to the chat
      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error('Chatbot error:', err);
    }

    
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        AskCedie AI
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <span dangerouslySetInnerHTML={{ __html: msg.text }} />
            <span className="timestamp">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
