import { useState, useEffect, useCallback } from "react"
import './App.css';
import { QRCodeCanvas } from 'qrcode.react';


function App() {
  const [qrUri, setQrUri] = useState("");
  const [otp, setOtp] = useState("");
  const [pApi, setPapi] = useState("");
  const [inputCode, setInputCode] = useState("")

  useEffect(() => {

    fetch("http://localhost:5000/getToken")
      .then(res => res.json())
      .then(resJson => setOtp(resJson.data))

    fetch("http://localhost:5000/getqruri")
      .then(res => res.json())
      .then(resJson => setQrUri(resJson.data))

    startTimers();

  }, [])

  const startTimers = () => {
    setInterval(() => {
      fetch("http://localhost:5000/getToken")
        .then(res => res.json())
        .then(resJson => {
          setOtp(resJson.data);
        })
    }, 2000);
  }


  const testPrivateApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("mfatoken", inputCode);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch("localhost/private/api", requestOptions)
      .then(response => response.text())
      .then(result => setPapi(result))
      .catch(error => console.log('error', error));

  }

  return (
    <div className="App">

      <div className="ctn1-item">
        <QRCodeCanvas value={qrUri} size={200} />
        <div className="mfa-code" >
          <h5>MFA Code</h5>
          <h2>{otp}</h2>
        </div>
      </div>
      <div>
        <input type="text" width={300} onChange={e => setInputCode(e.target.value)} />
        &emsp;
        <button onClick={testPrivateApi}>Test</button>
      </div>
      <div>
        <h5>Response from MFA protected api</h5>
      </div>
      <div className="papi">
        {pApi}
      </div>
    </div>
  );
}

export default App;
