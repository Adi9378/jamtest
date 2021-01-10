const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const port = 3333
const censusRoutes = require('./src/routes/census');

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use('/api/census', censusRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;