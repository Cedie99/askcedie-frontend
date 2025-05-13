import React from 'react';
import './IntroSection.css'; // Make sure this path is correct

const IntroSection = () => {
  return (
    <div className="intro-section">
      <h1>Smart Reviewer</h1>
      <p>
        <strong>Smart Reviewer</strong> is a web-based application designed to intelligently process and summarize the content of uploaded documents (.pdf or .docx).
        Whether you're reviewing study materials, reports, or lengthy articles, Smart Reviewer extracts key points, highlights important concepts,
        and presents them in a structured, easy-to-read format.
      </p>
    </div>
  );
};

export default IntroSection;
