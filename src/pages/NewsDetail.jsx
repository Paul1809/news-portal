// src/pages/NewsDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import './newsdetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, 'news', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle(docSnap.data());
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="news-detail">
      {article && (
        <>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
        </>
      )}
    </div>
  );
};

export default NewsDetail;
