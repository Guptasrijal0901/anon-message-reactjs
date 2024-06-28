import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingMessage, setEditingMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  const handleDelete = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingMessage(messages[index]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editingMessage.trim()) {
      const updatedMessages = messages.map((msg, i) =>
        i === editingIndex ? editingMessage.trim() : msg
      );
      setMessages(updatedMessages);
      setEditingIndex(null);
      setEditingMessage('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anonymous Messages</h1>
        <form onSubmit={editingIndex === null ? handleSubmit : handleUpdate}>
          <textarea
            value={editingIndex === null ? newMessage : editingMessage}
            onChange={(e) => {
              if (editingIndex === null) {
                setNewMessage(e.target.value);
              } else {
                setEditingMessage(e.target.value);
              }
            }}
            placeholder="Enter your anonymous message"
            rows="4"
            cols="50"
          />
          <br />
          <button type="submit">
            {editingIndex === null ? 'Submit' : 'Update'}
          </button>
        </form>
        <div className="messages">
          <h2>Messages</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <p>{message}</p>
                <div>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
