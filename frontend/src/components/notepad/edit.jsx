import react from 'react';
import '../../styles/Main.css';
function Edit({ activeNote, onUpdateNote }) {

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
    <div>
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
    </div>
  );
}

export default Edit;
