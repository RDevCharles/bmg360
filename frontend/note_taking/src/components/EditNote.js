import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NoteContext from './NoteContext';


const EditNote = () => {

  const history = useNavigate();
  //setting intial state
  const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { notes, setNotes } = useContext(NoteContext);
  const { id } = useParams();


//getting the note that matches the id and setting state
  //"this are the placeholders"
useEffect(() => {
  const note = notes.find(note => note.id === parseInt(id));
  setTitle(note.title);
  setContent(note.content);
}, [id, notes]);

  const handleUpdateNote = (e) => {
    e.preventDefault();
    //updating backend
    axios.put(`http://127.0.0.1:8000/api/update/${id}`, { title, content })
      .then(() => {
        setTimeout(() => {
          history('/')
          alert("note was updated, it may take a few seconds to update. If not give it a little refresh")
        }, 1000)
      
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleUpdateNote}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditNote;
