// To send a chat message
const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    const message = messageInput.value;
    conn.send({ type: 'chat', message });
    messageInput.value = ''; // Clear the input field
  }
});

// To receive a chat message
conn.on('data', data => {
  if (data.type === 'chat') {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.textContent = data.message;
    chatMessages.appendChild(messageElement);
  }
});

/**
  const App = () => {
  // ...

  const handleChatSend = (message) => {
    const conn = peer.connect('remote-peer-id');
    conn.on('open', () => {
      conn.send({ type: 'chat', message });
    });
  };

  return (
    <div>
      <h1>Real-Time Chat App</h1>
      <input
        type="text"
        placeholder="Type a message and press Enter"
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleChatSend(event.target.value);
            event.target.value = ''; // Clear the input field
          }
        }}
      />
    </div>
  );
};

 */
