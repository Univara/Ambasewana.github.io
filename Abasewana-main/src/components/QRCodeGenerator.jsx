import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'react-qrcode-logo'; // Assuming correct import statement
import './Styles/QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const link = 'https://www.example.com'; // Example link
  const [number, setNumber] = useState('');
  const [qrData, setQrData] = useState('');
  const qrRef = useRef(null);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleGenerate = () => {
    if (number.trim() === '') {
      alert('Please enter a valid number');
      return;
    }
    const data = JSON.stringify({ link, number });
    setQrData(data);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container-qr">
      <h1>QR Code Generator</h1>
      <div>
        <p>
          Link:{' '}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
      </div>
      <input
        type="number"
        placeholder="Enter number"
        value={number}
        onChange={handleNumberChange}
        className="input-field"
      />
      <button
        onClick={handleGenerate}
        className="generate-button"
        disabled={!number.trim()}
      >
        Generate
      </button>
      <div className="qr-code" ref={qrRef}>
        {qrData && <QRCodeCanvas value={qrData} />}
      </div>
      {qrData && (
        <button onClick={handleDownload} className="download-button">
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
