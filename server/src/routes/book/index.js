var router = require('express').Router()

var {
  get,
} = require('../../models').book


router.post('/get', function(req, res){
  get(req.body)
  .then(data => res.json(data))
  .catch(err => res.status(400).json({
    error: true,
    title: 'Загрузка строк (Закладки):',
    message: err.message
  }))
})


module.exports.default = router