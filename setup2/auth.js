const express = require('express');
const app = express();
const port = 5000;
const mfa = require("./mfa");
var cors = require('cors')
app.use(cors());



app.get('/auth', (req, res) => {
  const mfatoken = req.headers.mfatoken;
  if (mfatoken) {
    console.log(mfatoken);
    const isVerified = mfa.verifyToken(mfatoken)
    if (isVerified) {
      return res.status(200).send();
    }
  }
  return res.status(403).send();
})

app.get('/getSecret', (req, res) => {
  res.send({
    status: 200,
    data: mfa.generateSecret()
  });
})
app.get('/getToken', (req, res) => {
  res.send({
    status: 200,
    data: mfa.generateToken()
  });
})
app.get('/verifyToken', (req, res) => {
  res.send({
    status: 200,
    data: mfa.verifyToken(req.query.token)
  });
})
app.get('/getqruri', (req, res) => {
  res.send({
    status: 200,
    data: mfa.generateQrUri()
  });
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})