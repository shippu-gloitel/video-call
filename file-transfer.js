// To send a file
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  const fileReader = new FileReader();

  fileReader.onload = () => {
    const data = {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: fileReader.result,
    };

    // Send file data to the remote peer
    conn.send(data);
  };

  fileReader.readAsDataURL(file);
});

// To receive a file
conn.on('data', data => {
  if (data.dataUrl) {
    const downloadLink = document.createElement('a');
    downloadLink.href = data.dataUrl;
    downloadLink.download = data.name;
    downloadLink.textContent = 'Click here to download the file';
    document.body.appendChild(downloadLink);
  }
});

/***
 const App = () => {
  // ...

  const handleFileSend = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const data = {
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: fileReader.result,
      };

      const conn = peer.connect('remote-peer-id');
      conn.on('open', () => {
        conn.send(data);
      });
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>File Transfer App</h1>
      <input type="file" onChange={handleFileSend} />
    </div>
  );
};

 */
