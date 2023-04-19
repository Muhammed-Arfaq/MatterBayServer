import express from 'express'
import cors from 'cors'
import request from 'request'

const app = express()

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }))

app.use(cors({ origin: true }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/photos/:pageNum', (req, res) => {
    const pageNum = req.params.pageNum
    // send the request to the target server
    const targetUrl = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${pageNum}`;
    request.get(targetUrl, (error, response, body) => {
      if (error) {
        console.error(error);
        return res.status(500).send('An error occurred while sending the request');
      }
      // add the appropriate CORS headers to the response
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      // return the response from the target server to the client-side code
      res.send(body);
    });
  });
  
  // start the server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });