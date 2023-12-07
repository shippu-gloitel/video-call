// Include PeerJS library
const Peer = require('peerjs');

// Create a Peer object
// const peer = new Peer({ key: 'your-peerjs-api-key' });
const peer = new Peer();

// Handling PeerJS connection
peer.on('open', id => {
  console.log('My peer ID is: ' + id);
});

peer.on('connection', conn => {
  console.log('Connected to: ' + conn.peer);
  // Handle data received from peer
  conn.on('data', data => {
    console.log('Received:', data);
  });
});

// Handling incoming calls
peer.on('call', call => {
  // Answer the call and get user media
  navigator.getUserMedia(
    { video: true, audio: true },
    stream => {
      call.answer(stream); // Send our stream as an answer
      call.on('stream', remoteStream => {
        // Display remote stream in a video element
        const video = document.createElement('video');
        video.srcObject = remoteStream;
        document.body.appendChild(video);
      });
    },
    err => {
      console.error('Failed to get local stream', err);
    }
  );
});

// Connect to a remote peer
const conn = peer.connect('remote-peer-id');
conn.on('open', () => {
  conn.send('Hello, remote peer!');
});

//!@ for react

/***
  import React, { useEffect } from 'react';
import Peer from 'peerjs';

const peer = new Peer();

const App = () => {
  useEffect(() => {
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });

    peer.on('connection', (conn) => {
      console.log('Connected to: ' + conn.peer);
      conn.on('data', (data) => {
        console.log('Received:', data);
      });
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            const video = document.createElement('video');
            video.srcObject = remoteStream;
            document.body.appendChild(video);
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });
  }, []);

  return (
    <div>
      <h1>Video Calling App</h1>
    </div>
  );
};

export default App;

 */
