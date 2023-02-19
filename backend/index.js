// server/index.js
const path = require('path');
const express = require("express");
const linkPreviewGenerator = require("link-preview-generator");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const getPreviewData = async (url) => {

  const previewData = await linkPreviewGenerator(
    // "https://www.youtube.com/watch?v=8mqqY2Ji7_g"
    url, ['--no-sandbox', '--disable-setuid-sandbox']
  );
  return previewData;
}

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.post("/api", async (req, res) => {
  // test
  console.log(req.body)

  await getPreviewData(req.body.url).then(prev => {
    res.json({ data: prev });
  }).catch(err => {
    console.log('this is error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',err);
    res.json({ msg: 'error', error: `${err}` });
  })
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  res.json({ msg: "hi from server" })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});