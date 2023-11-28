import React, { useEffect, useState } from 'react';
import {SERVER_URL} from '../constants';
import './Schedule.css'; // Import your CSS file
import {Link} from 'react-router-dom';

const ScheduleComponent = () => {
  const [schedule, setSchedule] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // called once after intial render
    fetchSchedule();
   }, [] )
  
   const fetchSchedule = () => {
       console.log("fetchSchedule");
       fetch(`${SERVER_URL}/schedule`)
       .then(response => response.json()) 
       .then(data => { 
         console.log("assignment length "+ data.length);
         setSchedule(data);
         console.log()
       })
       .catch(err => console.error(err)); 
   }

  const headers = ['Movie Title', 'Date', 'Start Time', 'End Time', ' Room Capacity', ' ', ' '];
    
    return (
      <div>
        <h2> Schedules </h2>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="schedule-table"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.movieTitle}</td>
                      <td>{row.date}</td>
                      <td>{row.start_time}</td>
                      <td>{row.end_time}</td>
                      <td>{row.roomCapacity}</td>
                      <td> <Link to={`/editSchedule/${row.scheduleId}`} > Edit </Link> </td>
                      <td> <Link to={`/deleteSchedule/${row.scheduleId}`} > Delete </Link> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button> <Link to={`/addSchedule`}>Add Schedule</Link></button>
              <button> <Link to={`/addMovie`}>Add Movie</Link></button>
              <button> <Link to={`/Movies`}>View Movies</Link></button>
          </div>
      </div>
    )
};
export default ScheduleComponent; 