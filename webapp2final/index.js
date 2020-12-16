const bodyParser = require('body-parser');
const express = require( 'express');
const app = express();
const port =  process.env.PORT || 3000;
const model = require('./model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/sightings', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    //query mongoose model
    model.Sighting.find().then(function (sightings) {
        res.json(sightings);
    });
});

app.post('/sightings', function (req, res) {
    console.log("body: ", req.body);
    //create sighting instance
    let sighting = new model.Sighting ({
        location: req.body.location,
        height: req.body.height,
        type: req.body.type,
        size: req.body.size,
        color: req.body.color

    });
    console.log(sighting)
    //insert into mongoose model
    sighting.save().then(function () {
        res.set("Access-Control-Allow-Origin", "*");
        res.sendStatus(201);
    }).catch(function (err) {
        if (err.errors) {
          var messages = {};
          for (let e in err.errors) {
            messages[e] = err.errors[e].message;
          }
          res.status(422).json(messages);
        } else {
          res.sendStatus(500);
        }
      });
});


app.listen(port, function () {
    console.log(`Listening on port  ${port}!`)
});