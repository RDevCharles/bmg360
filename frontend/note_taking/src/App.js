import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import EditNote from './components/EditNote';
import NoteContext from './components/NoteContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';

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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Nav style={{marginBottom: "2rem"}}>
          <Nav.Item>
        <Nav.Link href="/">Notes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="new">New</Nav.Link>
      </Nav.Item>
    </Nav>

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