import React, {useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const NoteList = () => {
  //setting the state of notes to my notes context
  const { notes, setNotes } = useContext(NoteContext);

  //hitting my delete route note.id instead of using params

  const handleDeleteNote = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete/${id}`)
      //set notes to everything but the note that was deleted
      .then(() => {
        setNotes(notes.filter(note => note.id !== id))
        alert("note was deleted")

      })
      .catch(err => { 
        alert("note was not deleted")
        console.log(err)
      });
  };

  return (
    <div>
    
      {notes.map(note => (
        <div style={{
          marginBottom: "2rem",
        }} key={note.id}>
          <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
    
        <Card.Text>
        {note.content}
        </Card.Text>
      
          <Button style={{marginRight:"2rem"}} variant="danger" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
          <Link to={`/${note.id}/edit`}><Button variant="success">Edit</Button></Link>
      </Card.Body>
    </Card>
     
        </div>
      ))}
    </div>
  );
};

export default NoteList;
