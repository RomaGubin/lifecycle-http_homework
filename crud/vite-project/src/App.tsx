import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Note from './Note';
import AddNoteForm from './AddNoteForm';

interface Note {
  id: number;
  content: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const url = 'http://localhost:7070/notes';

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Note[]>(url);
      setNotes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (content: string) => {
    try {
      await axios.post(url, { id: 0, content });
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <h1>Notes</h1>
      <button className="refresh-btn" onClick={fetchNotes}>
        🔄 Обновить
      </button>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <Note key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      )}

      <AddNoteForm onAddNote={addNote} />
    </div>
  );
};

export default App;
