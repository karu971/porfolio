const fs = require('fs')

const getInterface = require('./interface')

exports.jsonReadFile = (res, file, content) => {
  var listJsonsArray = []
  fs.readFile(file, 'utf-8', (err, datas) => {
    if (err) {
      console.log('Error: Services ReadOny: ' + err)
    } else {
      for (const items of Object.keys(getInterface)) {
        listJsonsArray[items] = JSON.parse(fs.readFileSync('static/json/' + items + '.json', 'utf-8'))
      }

      res.render('content', {
        content: content,
        getInterfaces: getInterface[content],
        type: 'show',
        sendDatas: listJsonsArray[content]
      })
    }
  })
}

exports.jsonEditFile = (req, res, file, content, id) => {
  var sendDatas = null
  var listJsonsArray = []

  const getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))

  for (const getJson of getJsons) {
    if (getJson.id == id && req.body) {
      sendDatas = getJson
    }
  }
  for (const items of Object.keys(getInterface)) {
    listJsonsArray[items] = JSON.parse(fs.readFileSync('static/json/' + items + '.json', 'utf-8'))
  }

  if (req.method == 'POST') {

    for (const getJson in getJsons) {
      if (getJsons[getJson].id == id) {
        for (const iterator of getInterface[content]) {
          if (iterator != 'id') {
            getJsons[getJson][iterator] = req.body[iterator]
          }
        }
      }
    }

    fs.writeFile(file, JSON.stringify(getJsons), (err) => {
      if (err) {
        console.log('ERROR jsonEditFile writeFile: ' + err)
      } else {

        res.redirect('/' + content + 's')
      }
    })
  } else {

    res.render('content', {
      content: content,
      getInterfaces: getInterface[content],
      type: 'edit',
      sendDatas: sendDatas
    })
  }
}

exports.jsonDeleteFile = (req, res, file, name) => {

  const getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))
  console.log()
}
