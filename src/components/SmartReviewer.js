import React, { useState } from 'react';
import axios from 'axios';
//import jsPDF from 'jspdf';
import CardSlider from './CardSlider'; // you'll create this component below
import Chatbot from './Chatbot';



const SmartReviewer = () => {
  const [ setFilePath] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, formData);
      setFilePath(res.data.path);
      setExtractedText(res.data.extractedText);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/review`, {
        content: extractedText,
      });
      setReview(res.data);
    } catch (err) {
      console.error('Review generation failed', err);
    } finally {
      setLoading(false);
    }
  };

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


    /*const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([review?.message?.content || ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "review_output.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    };*/

/*const handlePDFDownload = () => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  const text = review?.choices?.[0]?.message?.content || 'No content available.';
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 10, 10);
  doc.save('review_output.pdf');
};*/
  return (
    <div className="smart-reviewer-container">
      <div className="smart-reviewer-card">
        <h1>📘 Upload Your Files Here!</h1>
        <input type="file" onChange={handleUpload} accept=".pdf,.docx,.pptx" className="file-input" />
        {extractedText && (
          <button onClick={handleReview} className="review-btn">Generate Review</button>
        )}
        {loading && <div className="loader"></div>}

        {review && (
          <CardSlider
            content={review.choices[0].message.content}
            parseMarkdown={parseMarkdown}
          />
          
        )}
        {review && (
          <Chatbot context={extractedText} />
        )}


      </div>
      
    </div>
  );
};

export default SmartReviewer;
