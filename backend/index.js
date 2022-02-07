// server/index.js
const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

app.use(express.json());

const getPreviewData = async (url) => {

  const linkPreviewGenerator = require("link-preview-generator");

  const previewData = await linkPreviewGenerator(
    // "https://www.youtube.com/watch?v=8mqqY2Ji7_g"
    url
  );
  return previewData;
}

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.post("/api", async (req, res) => {
  // test
  // console.log(req.body)
  // res.json({ msg: "hi from server" })

  await getPreviewData(req.body.url).then(prev => {
    res.json({ data: prev });
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'error', error: err });
  })
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});