// Get local video stream and display it
navigator.getUserMedia(
  { video: true, audio: true },
  stream => {
    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = stream;

    // Call a remote peer
    const call = peer.call('remote-peer-id', stream);
    call.on('stream', remoteStream => {
      // Display remote stream in a video element
      const remoteVideo = document.createElement('video');
      remoteVideo.srcObject = remoteStream;
      document.body.appendChild(remoteVideo);
    });
  },
  err => {
    console.error('Failed to get local stream', err);
  }
);

/***
  const App = () => {
  // ...

  const handleVideoCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peer.call('remote-peer-id', stream);
        call.on('stream', (remoteStream) => {
          const video = document.createElement('video');
          video.srcObject = remoteStream;
          document.body.appendChild(video);
        });
      })
      .catch((err) => {
        console.error('Failed to get local stream', err);
      });
  };

  return (
    <div>
      <h1>Video Calling App</h1>
      <button onClick={handleVideoCall}>Start Video Call</button>
    </div>
  );
};

 */
