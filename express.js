const express = require('express')
const app = express()
const request = require('request');
const router  = express.Router();
const URL = process.env.APIURL

router.get('/', function (req, res) {
    console.log("request to subspace hello");
    request({
        'url': URL,
        'method': req.method,
        'body': req
    }).pipe(res);
});

app.use('/api', router);


app.use('/', express.static('dist'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});