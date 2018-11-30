const express = require('express')
const app = express()
const fs = require('fs')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const services = require('./src/services/services')
const jsonPath = "static/json/"


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(__dirname+'/static'));


app.get('/', (req, res) => {
  res.render('index', {
    content: 'Home'
  });
});

const createPage = (names, name) => {
  if (!fs.existsSync("static/json/" + name + ".json")) {

    var stream = fs.createWriteStream("static/json/" + name + ".json")
    stream.once('open', (fd) => {
      stream.write("[]");
      // Important to close the stream when you're ready
      stream.end();
    });

  }


  app.get('/' + names, (req, res) => {
    var sendData = [];
    if (!req.body) {
      console.log("Function: app.get('/" + names + "')")
      console.log("ERROR: " + req)
    } else {
      console.log("SUCCESS")
      fs.readFile(jsonPath + name + ".json", 'utf-8', (err, datas) => {
        if (err) {
          console.log("ERROR GET PAGE " + names + ": " + err);
        } else {
          console.log("SUCESS GET PAGE " + names);

          services.jsonReadFile(res, jsonPath + name + ".json", name);

        }
      })
    }
  })
  app.post('/' + names, (req, res) => {
    var sendData = [];
    if (!req.body) {
      console.log("Function: app.get('/" + names + "')")
      console.log("ERROR: " + req)
    } else {
      console.log("SUCCESS")
      services.jsonDeleteFile(req, res, jsonPath + name + ".json", name);
    }
  })


  app.get('/' + name + '/:type/:element?', (req, res) => {
    if (!req.body) {
      console.log("ERROR: " + req)
    } else {
      if (req.params.type == "add") {
        services.jsonAddFile(req, res, jsonPath + name + ".json", name);
      } else if (req.params.type == "edit") {
        services.jsonEditFile(req, res, jsonPath + name + ".json", name, req.params.element);
      }
    }
  })

  app.post('/' + name + '/:type/:element?', (req, res) => {
    if (!req.body) {
      return res.sendStatus(500)
    } else {
      if (req.params.type == "add") {
        services.jsonAddFile(req, res, jsonPath + name + ".json", name);
      } else if (req.params.type == "edit") {
        services.jsonEditFile(req, res, jsonPath + name + ".json", name, req.params.element);
      }
    }
  })
}

createPage("competences", "competence");
createPage("languages", "language");
createPage("experiences", "experience");



app.listen(8081, () => {
  console.log('Listen on 8081')
})
