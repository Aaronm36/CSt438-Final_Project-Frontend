import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddMovie(props) { 

  const [message, setMessage] = useState('');
  const [movie, setMovie] = useState({movieTitle: "", movieRating: "", movieLength: 0, priceId: 0});

  const handleChange = (event) => {
    setMovie({...movie, [event.target.name]:event.target.value});
    setMovie({...movie, [event.target.name]:event.target.value});
    setMovie({...movie, [event.target.name]:event.target.value});
    setMovie({...movie, [event.target.name]:event.target.value});
  }

  const newMovie = ( ) => {
    fetch(`${SERVER_URL}/movie`, 
          {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)})
    .then((response) => {
      if(response.ok){
        setMessage("Schedule Added");
      } else {
         setMessage("Failed to add Schedule")
      }})
    .catch((err) => {
      setMessage(err)});
  }

  const handleAdd = () => {
    newMovie();
  }

  const headers = ['Movie Title', 'Movie Rating', 'Movie Length', 'Price Id'];

  return (
      <div>
      <h2>Add Movie</h2>
            <div margin="auto" >
              <h4 id="gmessage" >{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <input type="text" name="movieTitle"  onChange={handleChange} />
                      </td>
                      <td>
                        <input type="text" name="movieRating" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="movieLength" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="priceId" onChange={handleChange} />
                      </td>
                    </tr>
                </tbody>
              </table>
              <button id="submit" type="button" margin="auto" onClick={handleAdd}>Save Movie</button>
              <button> <Link to={`/`}>Back</Link></button>
            </div>
      </div>
  ); 
}

export default AddMovie;