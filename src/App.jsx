import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';


function App() {
  const [trendingmovies, setTrendingmovies] = useState([])
  const [popularmovies , setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  const API_KEY = "0995a55f907c0ff0f4266725916b1a2f"
  useEffect(() => {
    async function fetchData() {
      var trending = {
        day: await axios.get(`trending/movie/day?language=en-US&api_key=${API_KEY}`),
        week: await axios.get(`trending/movie/week?language=en-US&api_key=${API_KEY}`),
      };
      
      var topRated = {
        movie: await axios.get(`movie/top_rated?api_key=${API_KEY}&language=en-US`),
        tv: await axios.get(`tv/top_rated?api_key=${API_KEY}&language=en-US`),
      }
      var popular = {
        movie: await axios.get(`movie/popular?language=en-US&page=1&api_key=${API_KEY}`),
        tv: await axios.get(`tv/popular?language=en-US&page=1&api_key=${API_KEY}`),
      }
      setTrendingmovies(trending.day.data.results );
      setPopularMovies(popular.movie.data.results  );
      setTopRatedMovies(topRated.movie.data.results  );
      // console.log(trending.day.data.results);
    }
    fetchData();
  }, [API_KEY]);



  return (
    <div>
    <h1>Trending Movies</h1>
    <ul>
      {trendingmovies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>


    <h1>Popular Movies</h1>
    <ul>
      {popularmovies.map(movie => (
        <li key={movie.id}>{movie.title}</li> 
      ))}
    </ul>

    <h1>Top Rated Movies</h1>
    <ul>
      {topRatedMovies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  </div>
);
}
export default App