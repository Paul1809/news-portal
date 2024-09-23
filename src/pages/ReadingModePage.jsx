// src/pages/ReadingModePage.jsx
import React from 'react';
import './readingmode.css';

const ReadingModePage = ({ article }) => {
  return (
    <div className="reading-mode">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ReadingModePage;
