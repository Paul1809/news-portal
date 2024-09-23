// src/components/Preferences.jsx
import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import './preferences.css';

const Preferences = ({ user }) => {
  const [preferences, setPreferences] = useState({
    categories: [],
    keywords: '',
  });

  const handleCheckboxChange = (category) => {
    setPreferences((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handleInputChange = (e) => {
    setPreferences({ ...preferences, keywords: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { preferences }, { merge: true });
      alert('Preferences saved!');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <div className="preferences-container">
      <h2>Set Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Categories:</h3>
          <label>
            <input
              type="checkbox"
              checked={preferences.categories.includes('Technology')}
              onChange={() => handleCheckboxChange('Technology')}
            />
            Technology
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.categories.includes('Health')}
              onChange={() => handleCheckboxChange('Health')}
            />
            Health
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.categories.includes('Sports')}
              onChange={() => handleCheckboxChange('Sports')}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.categories.includes('Business')}
              onChange={() => handleCheckboxChange('Business')}
            />
            Business
          </label>
        </div>
        <div>
          <h3>Keywords (comma separated):</h3>
          <input
            type="text"
            value={preferences.keywords}
            onChange={handleInputChange}
            placeholder="e.g., AI, Climate Change"
          />
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default Preferences;
