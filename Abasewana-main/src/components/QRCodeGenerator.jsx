import React, { useState } from "react";
import axios from "axios";

function QRCodeGenerator() {
  const [qrCode, setQRCode] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);

  const generateQRCode = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/qrcode", {
        params: {
          url: "https://www.example.com",
          table: tableNumber.trim(), // Include table number in params
        },
      });
      setQRCode(response.data.qrCode);
      setDownloadReady(true); // Set download readiness
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qrcode_table_${tableNumber}.png`; // Specify the download file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <label>
        Table Number here:
        <input
          type="text"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />
      </label>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && (
        <div>
          <img src={qrCode} alt="QR Code" />
          {downloadReady && (
            <button onClick={handleDownload}>Download QR Code</button>
          )}
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
