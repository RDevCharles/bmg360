import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NoteForm = ({ note }) => {

  //initial state for title and content
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, content };

    axios
      .post("http://127.0.0.1:8000/api/create/", data)
      .then((res) => {
        //leaving in for testing purposes
        console.log(res);
        //simple visual feedback for sucessful note creation
        //this could be made a little nicer with bootstrap or tailwind
        alert("Note added successfully");
      })
      .catch((err) => {
        //simple visual feedback for unsucessful note creation
        alert("Note added successfully");
        console.log(err)
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      
      <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control onChange={(e) => setContent(e.target.value)} as="textarea" value={content} rows={3} />
      </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
     
  
  );
};

export default NoteForm;
