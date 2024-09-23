import axios from 'axios';
import firebase from 'firebase/app';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Función para obtener un resumen utilizando ChatGPT
export const getSummary = async (content) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Usar la variable de entorno
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching summary:', error);
    return content; // Retorna el contenido original si hay un error
  }
};

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null; // Retorna null si hay un error
  }
};
