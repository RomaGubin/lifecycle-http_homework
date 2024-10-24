import React, { useState } from 'react';

interface AddNoteFormProps {
  onAddNote: (content: string) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote(content);
      setContent('');
    }
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddNoteForm;
