//jshint esversion:6
import react, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import Main from '../components/notepad/Main';
import Sidebar from '../components/notepad/Sidebar';
import '../styles/secrets.css';

function Notes() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Untitled Note',
      body: ' ',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const getActiveNote =()=>{
      return (notes.find((note) =>note.id === activeNote));
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

  return (
    <div className='Notepad'>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default Notes;
