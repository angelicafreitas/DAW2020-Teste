var express = require('express');
var router = express.Router();
var axios = require('axios')
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/classes/:id', function(req, res, next) {
  let token = fs.readFileSync('token.txt', "utf8")
  if (req.query.nivel){
    axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id+'?nivel='+ req.query.nivel +'&token=' + token)
    .then(dados=>{
      console.log(dados.data)
      res.render('classe', { classe: dados.data });    
    })
    .catch(e=>{
      res.sendStatus(500)
    })
  }
  else {
    axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id+'?nivel=1&token=' + token)
    .then(dados=>{
      console.log(dados.data)
      res.render('classe', { classe: dados.data });    
    })
    .catch(e=>{
      res.sendStatus(500)
    })

  }

});

router.get('/indice', function(req, res, next) {
  let token = fs.readFileSync('token.txt', "utf8")
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
  .then(dados=>{
    console.log(dados.data)
    res.render('indices', { indices: dados.data });    
  })
  .catch(e=>{
    res.sendStatus(500)
  })
});


router.get('/classes', function(req, res, next) {
  let token = fs.readFileSync('token.txt', "utf8")
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
  .then(dados=>{
    res.render('classes', { classes: dados.data });    
  })
  .catch(e=>{
    res.sendStatus(500)
  })
});

module.exports = router;
