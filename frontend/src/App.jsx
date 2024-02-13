import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import MessageSection from './components/messageSection';
import Input from './components/input';
import Button from './components/button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

const socket = io('http://localhost:3001'); 

function App() {
  const [start, setStart] = useState(true);
  const [inputData, setInputData] = useState('');

  const handleClick = () => {
    setStart(false);
  }

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('Received message:', message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log(inputData);
    // Example of emitting a message to the server
    socket.emit('message', inputData);
    setInputData('');
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  }

  const StartView = (
    <Container>
      <Button color="red" onClick={handleClick}>Start chat</Button>
    </Container>
  );

  const ChatView = (
    <Container>
      <MessageSection />
      <Footer>
        <Input value={inputData} onChange={handleChange}  />
        <Button onClick={sendMessage}>Send</Button>
      </Footer>
    </Container>
  );

  return start ? StartView : ChatView;
}

export default App;
