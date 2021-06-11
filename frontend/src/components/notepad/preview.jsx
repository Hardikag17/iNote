import react from 'react';
import '../../styles/Main.css';
import ReactMarkdown from 'react-markdown';

function Preview({ activeNote }) {
  if (!activeNote)
    return <div className='no-active-note'>No Note Selected</div>;

  return (
      <div id="preview">
    <div className='main-note-preview'>
      <h1 className='preview-title'>{activeNote.title}</h1>
      <ReactMarkdown className='markdown-preview'>
        {activeNote.body}
      </ReactMarkdown>
    </div>
    </div>
  );
}

export default Preview;
