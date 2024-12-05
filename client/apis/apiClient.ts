const API_URL = 'http://localhost:3000/api/v1/movies'; // Adjust if needed I am actually unsure of this...

// Function to get all movies
export const getAllMovies = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) { 
    throw new Error('Network response was not ok');
    }  
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
    }
};