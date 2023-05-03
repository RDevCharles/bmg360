import React, {useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';



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
        <div key={note.id}>
          <h3>{note.title}</h3>
          
          <p>{note.content}</p>
          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          <Link to={`/${note.id}/edit`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
