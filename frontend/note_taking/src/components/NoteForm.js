import React, { useState } from "react";
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default NoteForm;
