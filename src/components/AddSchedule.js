import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddSchedule(props) { 

  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState({movieTitle: "", date: "", start_time: "", end_time: "", roomId: 0});

  const handleChange = (event) => {
    setSchedule({...schedule, [event.target.name]:event.target.value});
    setSchedule({...schedule, [event.target.name]:event.target.value});
    setSchedule({...schedule, [event.target.name]:event.target.value});
    setSchedule({...schedule, [event.target.name]:event.target.value});
    setSchedule({...schedule, [event.target.name]:event.target.value});
  }

  const newSchedule = ( ) => {
    fetch(`${SERVER_URL}/schedule`, 
          {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(schedule)})
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
    newSchedule();
  }

  const headers = ['Movie Title', 'Date', 'Start Time', 'End Time', 'Room Number'];

  return (
      <div>
      <h2>Add Schedule </h2>
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
                        <input type="text" name="date" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="start_time" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="end_time" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="roomId" onChange={handleChange} />
                      </td>
                    </tr>
                </tbody>
              </table>
              <button id="submit" type="button" margin="auto" onClick={handleAdd}>Save Schedule</button>
              <button> <Link to={`/`}>Back</Link></button>
            </div>
      </div>
  ); 
}

export default AddSchedule;