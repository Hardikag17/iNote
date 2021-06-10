import react from 'react';
import '../../styles/Main.css';
import Notes from '../notes';
import ReactMarkdown from 'react-markdown';

function Main({ activeNote, onUpdateNote }) {
  const onEditFeild = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote)
    return <div className='no-active-note'>No Note Selected</div>;

  return (
    <div className='main'>
      <div className='main-note-edit'>
        <input
          type='test'
          value={activeNote.title}
          onChange={(e) => onEditFeild('title', e.target.value)}
          id='title'
          autoFocus
        />
        <textarea
          id='body'
          value={activeNote.body}
          onChange={(e) => onEditFeild('body', e.target.value)}
          placeholder='Write your note here...'
        />
      </div>
      <div className='main-note-preview'>
        <h1 className='preview-title'>{activeNote.title}</h1>
        <ReactMarkdown className='markdown-preview'>
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;
