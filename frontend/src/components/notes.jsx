//jshint esversion:6

//use state for sediting and preview tabs


import react, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import Sidebar from '../components/notepad/Sidebar';
import Preview from '../components/notepad/preview';
import Edit from '../components/notepad/edit';
import '../styles/secrets.css';

function Notes() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(true);
  const [editing , setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Untitled Note',
      body: ' ',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  function currentStateEdit(){
    console.log("editing button clicked");
    setEditing(!editing);
  }
  

  function currentStatePreview(){
    console.log("Preview button clicked");
    setEditing(!editing);
  }

  

  return (
    <div className='Notepad'>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <div className="tabs container-fluid">
        <div class="row">
        <div class="col-9">
        <button
         onClick={currentStateEdit} >
          Edit
        </button>
        <button onClick={currentStatePreview}>
          Preview
        </button>
      </div>
      <div>{editing ? (
      <div>
        <Edit
          className='edit'
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
        />
      </div>
    ) : (
      <div>
        <Preview
          classname='preview'
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
        />
      </div>)}</div>
      </div>
      </div>
    </div>
  );
}

export default Notes;
