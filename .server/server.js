// Импортируем необходимые модули
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const http = require('http');

const app = express();
const apiUrl = 'http://hn.algolia.com/api';

const port = 3000;

const dist = path.join(__dirname, '../dist');
const indexPath = path.join(dist, 'index.html');

app.use(cors());
app.use('/api', async (req, res, next) => {
  try {
    const response = await axios({
      method: req.method,
      url: apiUrl + req.url,
      data: req.body,
      headers: { 'Content-Type': 'application/json' },
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});
app.use(express.static(dist));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(indexPath));
});

const server = http.createServer(app);
server.listen(port);
