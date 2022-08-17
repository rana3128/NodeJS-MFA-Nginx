const express = require('express')
const app = express()
const port = 8000

app.use(express.static("public"));

app.get('/private/api', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})