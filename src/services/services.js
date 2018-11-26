const fs = require('fs')

const getInterface = require('./interface')

const jsonReadFile = (res, file, content) => {
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



exports.jsonReadFile = (res, file, content) => {
  jsonReadFile(res, file, content)
}

exports.jsonDeleteFile = (req, res, file, content) => {
  const sendDatas = []
  const getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))
  for (const getJson in getJsons) {
    if (getJsons[getJson].id == req.body['delete']) {
      getJsons.splice(getJson, 1)
    }
  }
  fs.writeFile(file, JSON.stringify(getJsons), (err) => {
    if (err) {
      console.log('Error jsonDeleteFile writeFile: ' + err)
    } else {
      console.log('Success jsonDeleteFile writeFile')
    }
  })

  jsonReadFile(res, file, content)

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

exports.jsonAddFile = (req, res, file, content) => {
  let sendDatas = []
  let newArray = {}
  let getJsons = []
  let lastId = []

  sendDatas.push(getInterface[content])

  if (req.method == 'POST') {
    console.log('SUCCESS POST')
    getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))
    lastId = getJsons[getJsons.length - 1]['id']

    for (const item of getInterface[content]) {
      if (item == 'id') {
        newArray['id'] = lastId + 1
      } else {
        newArray[item] = req.body[item]
      }
    }
    getJsons.push(newArray)

    console.log(getJsons)

    fs.writeFile(file, JSON.stringify(getJsons), (err) => {
      if (err) {
        console.log('Error jsonAddFile writeFile: ' + err)
      } else {
        console.log('Success jsonAddFile writeFile: ')
      }
      res.redirect('/' + content + 's')
    })
  } else {
    console.log('SUCCESS GET')
    res.render('content', {
      content: content,
      getInterfaces: getInterface[content],
      type: 'edit',
      sendDatas: sendDatas
    })
  }
}
