import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import EditNote from './components/EditNote';
import NoteContext from './components/NoteContext';
import axios from 'axios';

const App = () => {

  //state that holds initial notes array of objects
  const [notes, setNotes] = useState([]);
  
  //making api call to get notes from backend
  //i could have used a proxy but using the entire route helped
  // me visualize my routes better
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api')
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    //make all notes available to my components (state management )
    <NoteContext.Provider value={{ notes, setNotes }}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Notes</Link>
            </li>
            <li>
              <Link to="/new">New Note</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<NotesList/>}/>
            <Route path=":id/edit/" element={<EditNote/>}/>
            <Route path="/new" element={<NoteForm/>}/>
        </Routes>
      </div>
      </Router>
      </NoteContext.Provider>
  );
};

export default App;