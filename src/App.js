import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3010');

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    socket.on('received_message', (data) => {
      setReceivedMessage(data);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit('send_message', ({message,roomId}))
  }

  const joinRoom = () => {
    socket.emit('join_room', (roomId));
  };


  return (
    <div className="App">
      <input placeholder='enter room Id' value={roomId} onChange={(e)=> setRoomId(e.currentTarget.value)}/>
      <button onClick={joinRoom}>Join</button>
      <input placeholder='enter message' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button title='send Message' onClick={sendMessage}>Send Message</button>
      <h1>Message: {receivedMessage}</h1>
    </div>
  );
}

export default App;
