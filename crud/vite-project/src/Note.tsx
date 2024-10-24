import React from 'react';

interface NoteProps {
  note: {
    id: number;
    content: string;
  };
  onDelete: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  return (
    <div className="note">
      <p>{note.content}</p>
      <button className="delete-btn" onClick={() => onDelete(note.id)}>
        ❌
      </button>
    </div>
  );
};

export default Note;
