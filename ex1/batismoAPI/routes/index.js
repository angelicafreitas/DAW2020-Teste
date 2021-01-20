var express = require('express');
const { map } = require('../app');
var router = express.Router();

const Batismo = require('../controllers/Batismo')

/* GET home page. */
router.get('/api/batismos', function(req, res, next) {
  if(req.query.ano){
    Batismo.lookUpByYear(req.query.ano)
    .then(bats =>{
      res.jsonp(bats)
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
  }
  else{
    Batismo.listsFields()
    .then(bats =>{
      res.jsonp(bats)
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
  }
});

router.get('/api/batismos/stats', function(req, res, next) {
  Batismo.getStats()
    .then(bats =>{
      let ret = []
      bats.map(x=>{
        ret.push({ano: x._id, count: x.count})
      })
      res.jsonp(ret)
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
});


router.get('/api/batismos/batisado', function(req, res, next) {
  Batismo.getBaptizedSorted()
    .then(bats =>{
      let myset = new Set()
      bats.map(x=>{
        myset.add(x.baptized)
      })
      let ret = []
      myset.forEach(x=>{
        ret.push(x)
      })
      res.jsonp(ret.sort())
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
});



router.get('/api/batismos/progenitores', function(req, res, next) {
  Batismo.lookUpProgenitores()
    .then(bats =>{
      res.jsonp(bats)
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
});


router.get('/api/batismos/:id', function(req, res, next) {
  Batismo.lookUp(req.params.id)
    .then(bat =>{
      res.jsonp(bat)
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
});


module.exports = router;

