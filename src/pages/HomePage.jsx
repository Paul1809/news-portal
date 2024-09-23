// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getSummary } from '../utils/api';
import './homepage.css';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const newsData = querySnapshot.docs.map(doc => doc.data());
      
      // Añade resumen de noticias usando la API de IA
      const summarizedNews = await Promise.all(newsData.map(async (article) => {
        const summary = await getSummary(article.content);
        return { ...article, summary };
      }));
      
      setNews(summarizedNews);
      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-page">
      <h1>Personalized News</h1>
      {news.map((article, index) => (
        <div key={index} className="news-article">
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
