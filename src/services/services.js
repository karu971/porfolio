/* eslint-disable eqeqeq */
/* eslint-disable no-multiple-empty-lines */
var fs = require('fs')

var getInterface = require('./interface')

var listSelector = []

var getListSelector = (item) => {
  listSelector[item] = JSON.parse(fs.readFileSync('static/json/' + item + '.json', 'utf-8'))
}



var checkGetTypeJson = (typeRequest, getId, getReqBodys) => {
  var splitGetReqBodysCategory = []
  // Récupérer la listSelector
  for (var getCategory of Object.keys(listSelector['listSelector'])) {
    if (getReqBodys[getCategory] !== '') {
      // Récupéere chaque Object de la getCategory
      if (typeRequest == 'add') {
        splitGetReqBodysCategory = getReqBodys[getCategory].split(',')
        for (const items of splitGetReqBodysCategory) {
          if (listSelector['listSelector'][getCategory][getId] == undefined) {
            listSelector['listSelector'][getCategory][getId] = getId
            listSelector['listSelector'][getCategory][getId] = [parseInt(items)]
          } else if (!listSelector['listSelector'][getCategory][getId].includes(parseInt(items))) {
            listSelector['listSelector'][getCategory][getId].push(parseInt(items))
          }
        }
      } else if (typeRequest == 'edit') {
        splitGetReqBodysCategory = getReqBodys[getCategory].split(',')
        listSelector['listSelector'][getCategory][parseInt(getId)] = splitGetReqBodysCategory
      } else if (typeRequest == 'delete') {
        delete listSelector['listSelector'][getCategory][parseInt(getId)]
      }
    }
  }
  return fs.writeFileSync('static/json/listSelector.json', JSON.stringify(listSelector['listSelector']))
}


var jsonReadFile = (res, file, content) => {
  var listJsonsArray = []
  fs.readFile(file, 'utf-8', (err) => {
    if (err) {
      console.log('Error: Services ReadOny: ' + err)
    } else {
      for (var items in Object.keys(getInterface)) {
        var item = Object.keys(getInterface)[items]

        var getInterFaceValue = JSON.parse(fs.readFileSync('static/json/' + item + '.json', 'utf-8'))
        listJsonsArray[Object.keys(getInterface)[items]] = getInterFaceValue
      }
      res.render('content', {
        content: content,
        getInterfaces: Object.keys(getInterface[content]),
        type: 'show',
        listSelector: listSelector,
        sendDatas: listJsonsArray[content]
      })
    }
  })
}


getListSelector('listSelector')
getListSelector('competence')
getListSelector('language')
getListSelector('getId')

exports.jsonReadFile = (res, file, content) => {
  jsonReadFile(res, file, content)
}

exports.jsonDeleteFile = (req, res, file, content) => {
  var getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))
  for (var getJson in getJsons) {
    if (parseInt(getJsons[getJson].id) === parseInt(req.body['delete'])) {
      checkGetTypeJson('delete', parseInt(req.body['delete']), req.body)
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

  var getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))

  for (var getJson of getJsons) {
    if (getJson.id == id && req.body) {
      sendDatas = getJson
    }
  }
  for (var items in Object.keys(getInterface)) {
    var item = Object.keys(getInterface)[items]
    var getInterFaceValue = JSON.parse(fs.readFileSync('static/json/' + item + '.json', 'utf-8'))
    listJsonsArray[Object.keys(getInterface)[items]] = getInterFaceValue
  }

  if (req.method == 'POST') {


    for (getJson in getJsons) {
      if (getJsons[getJson].id == id) {
        for (var iterator of Object.keys(getInterface[content])) {
          if (iterator != 'id') {
            getJsons[getJson][iterator] = req.body[iterator]
          }
        }
      }
    }

    checkGetTypeJson(req.params.type, req.params.element, req.body)

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
      getInterfaces: Object.keys(getInterface[content]),
      listSelector: listSelector,
      type: 'edit',
      sendDatas: sendDatas

    })
  }
}

exports.jsonAddFile = (req, res, file, content) => {
  var getReqBody = []
  let sendDatas = []
  let getJsons = []
  let newId = []
  let newArray = {}

  sendDatas.push(Object.keys(getInterface[content]))

  if (req.method == 'POST') {
    console.log('SUCCESS POST')
    getJsons = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (getJsons.length !== 0) {
      newId = JSON.parse(fs.readFileSync('static/json/getId.json', 'utf-8'))[content] + 1
    } else {
      newId = 0
    }
    getReqBody = req.body

    // Mise à jour du fichier listSelector.json
    checkGetTypeJson(req.params.type, newId, getReqBody)


    for (var items in Object.keys(getInterface[content])) {
      var item = Object.keys(getInterface[content])[items]
      if (item == 'id') {
        newArray['id'] = newId
      } else {
        newArray[item] = req.body[item]
      }
    }
    getJsons.push(newArray)
    listSelector['getId'][content] = newId
    fs.writeFileSync('static/json/getId.json', JSON.stringify(listSelector['getId']))
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
      getInterfaces: Object.keys(getInterface[content]),
      type: 'add',
      sendDatas: sendDatas,
      listSelector: listSelector
    })
  }
}
