import React, { useEffect, useState } from 'react';
import {SERVER_URL} from '../constants';
import './Movies.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';

const MoviesComponent = () => {
  const [movies, setMovie] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // called once after intial render
    fetchMovies();
   }, [] )
  
   const fetchMovies = () => {
       console.log("fetchMovies");
       fetch(`${SERVER_URL}/movies`)
       .then(response => response.json()) 
       .then(data => { 
         console.log("movies length "+ data.length);
         setMovie(data);
         console.log()
       })
       .catch(err => console.error(err)); 
   }

  const headers = ['Movie Title', 'Movie Rating', 'Movie Length', ' '];
    
    return (
      <div>
        <h2> Movies </h2>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="movie-table"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {movies.map((row, idx) => (
                    <tr key={idx} class="active-row" >
                      <td>{row.movieTitle}</td>
                      <td>{row.movieRating}</td>
                      <td>{row.movieLength}</td>
                      <td> <Link to={`/deleteMovie/${row.movieId}`} > Delete </Link> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <button> <Link to={`/`}> View Schedule </Link> </button> */}

              <Button color="error" component={Link} to={`/`} style={{margin: 10, width: 150, height: 30, color: "white", background: "black"}}> View Schedule </Button>
          </div>
      </div>
    )
};
export default MoviesComponent; 