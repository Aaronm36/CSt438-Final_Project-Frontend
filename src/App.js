import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Schedule from './components/Schedule';
import AddSchedule from './components/AddSchedule';
import EditSchedule from './components/EditSchedule';
import DeleteSchedule from './components/DeleteSchedule';
import AddMovie from './components/AddMovie';
import Movies from './components/Movies';
import DeleteMovie from './components/DeleteMovie';

function App() {
  return (
    <div className="App">
      {/* <h2>Schedule</h2> */}
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Schedule} />
              <Route path="/addSchedule" component={AddSchedule} />
              <Route path="/editSchedule" component={EditSchedule} />
              <Route path="/deleteSchedule" component={DeleteSchedule} />
              <Route path="/addMovie" component={AddMovie} />
              <Route path="/movies" component={Movies} />
              <Route path="/deleteMovie" component={DeleteMovie} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
