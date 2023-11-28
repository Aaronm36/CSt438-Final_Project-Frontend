import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function DeleteSchedule(props) { 

    const [currentSchedule, setName] = useState([]);
    let scheduleId=0;
    const [message, setMessage] = useState('');
  
    const path = window.location.pathname;
    const s = /\d+$/.exec(path)[0];
    console.log("Schedule scheduleId="+s);
    scheduleId=s;
  
    useEffect(() => {
      fetchSchedules()
     }, [] )
  
    const fetchSchedules = ( ) => {
        setMessage('');
        console.log("fetchSchedule "+scheduleId);
        fetch(`${SERVER_URL}/schedule/${scheduleId}`)
        .then((response) => response.json()) 
        .then((data) => { setName(data) })       
        .catch(err => { 
          setMessage("Exception. "+err);
          console.error("fetch Schedule error "+ err);
        });
      }
  
      const deleteSchedule = ( ) => {
        setMessage(''); 
        console.log("Schedule.save ");     
        fetch(`${SERVER_URL}/schedule/${scheduleId}` , 
            {  method: 'Delete'})
        .then(res => {
          fetchSchedules(scheduleId);
          setMessage("Schedule Deleted.");
            
          })
          .catch(err => {
              setMessage("Exception. "+err);
              console.error('Save Schedule exception =' + err);
          });
     };  
  
    const headers = ['Movie Title', 'Date', 'Start Time', 'End Time', ' Room Capacity'];
    
    return (
        <div>
            <h2> Delete Schedule </h2>
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
                    <td>{currentSchedule.movieTitle}</td>  
                    <td>{currentSchedule.date}</td>  
                    <td>{currentSchedule.start_time}</td>
                    <td>{currentSchedule.end_time}</td>  
                    <td>{currentSchedule.roomCapacity}</td>  

                    </tr>
                </tbody>
            </table>
            <button id="Delete" type="button" margin="auto" onClick={deleteSchedule} >Delete Schedule</button>
            <button> <Link to={`/`}>Back</Link></button>
            </div>
        </div>
        )
    }
    
    export default DeleteSchedule;    