import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function EditSchedule(props) {

    const [currentSchedule, setName] = useState([]);
    let scheduleId=0;
    const [message, setMessage] = useState('');

    const path = window.location.pathname;
    const s = /\d+$/.exec(path)[0];
    console.log("schedule scheduleId="+s);
    scheduleId=s;


    useEffect(() => {
        fetchSchedules()
    }, [] )
    
      const fetchSchedules = ( ) => {
          setMessage('');
          console.log("fetchSchedule "+ scheduleId);
          fetch(`${SERVER_URL}/schedule/${scheduleId}`)
          .then((response) => response.json()) 
          .then((data) => { setName(data) })       
          .catch(err => { 
            setMessage("Exception. "+err);
            console.error("fetch Schedule error "+ err);
          });
        }

        const saveSchedule = ( ) => {
            setMessage(''); 
            console.log("Schedule.save ");     
            fetch(`${SERVER_URL}/schedule/${scheduleId}` , 
                {  
                  method: 'PUT', 
                  headers: {'Content-Type': 'application/json' }, 
                  body: JSON.stringify( currentSchedule )
                } )
            .then(res => {
                if (res.ok) {
                  fetchSchedules(scheduleId);
                  setMessage("schedule saved.");
                } else {
                  setMessage("Save error. "+res.status);
                  console.error('Save Schedule error =' + res.status);
            }})
              .catch(err => {
                  setMessage("Exception. "+err);
                  console.error('Save Schedule exception =' + err);
              });
         }; 
         
    const onChangeTitle = (e) => {
        setMessage('');
        setName({ ...currentSchedule, movieTitle:e.target.value});
    }
      
    const onChangeDate = (e) => {
        setMessage('');
        setName({ ...currentSchedule, date:e.target.value});
    }

    const onChangeStartTime = (e) => {
        setMessage('');
        setName({ ...currentSchedule, start_time:e.target.value});
    }

    const onChangeEndTime = (e) => {
        setMessage('');
        setName({ ...currentSchedule, end_time:e.target.value});
    }

    const headers = ['Movie Title', 'Date', 'Start Time', 'End Time', ' Room Capacity'];

    return (
        <div>
          <h2> Edit Schedule </h2>
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
                      <input type="text" name="title" value={currentSchedule.movieTitle} onChange={onChangeTitle} />
                    </td>
                    <td>
                      <input type="text" name="date" value={currentSchedule.date} onChange={onChangeDate} />
                    </td>
                    <td>
                      <input type="text" name="Stime" value={currentSchedule.start_time} onChange={onChangeStartTime} />
                    </td>
                    <td>
                      <input type="text" name="Etime" value={currentSchedule.end_time} onChange={onChangeEndTime} />
                    </td>
                    <td>{currentSchedule.roomCapacity}</td>  
                  </tr>
              </tbody>
            </table>
            <button id="submit" type="button" margin="auto" onClick={saveSchedule}>Save Schedule</button>
            <button> <Link to={`/`}>Back</Link></button>
          </div>
        </div>
      );

}
export default EditSchedule;