import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator() {
  const [tableNumber, setTableNumber] = useState('');

  const handleInputChange = (event) => {
    setTableNumber(event.target.value);
  };

  const handleDownload = () => {
    // Handle download logic here
    if (tableNumber) {
      const canvas = document.querySelector('canvas'); // Find the canvas element
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `qrcode_table_${tableNumber}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <label>
        Table Number:
        <input type="text" value={tableNumber} onChange={handleInputChange} />
      </label>
      {tableNumber && (
        <div>
          <QRCode
            value={`https://ambasewanasl.netlify.app/shop?table=${tableNumber}`}
            size={200}
          />
          <br />
          <button onClick={handleDownload}>Download QR Code</button>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
