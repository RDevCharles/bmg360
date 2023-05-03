import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
      <Form onSubmit={handleUpdateNote}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={(e) => setTitle(e.target.value)} type="email" value={title} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control onChange={(e) => setContent(e.target.value)} as="textarea" value={content} rows={3} />
      </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default EditNote;
