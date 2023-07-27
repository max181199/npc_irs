var router = require('express').Router()

var {
  get,
  drop,
  update,
  insert,
} = require('../../models').bookmark

router.get('/drop', function(req, res){
  drop(req.query)
  .then(data => res.send(data))
  .catch(err => res.status(400).json({
    error: true,
    title: 'Удаление строк (Закладки):',
    message: err.message
  }))
})

router.post('/get', function(req, res){
  get(req.body)
  .then(data => res.json(data))
  .catch(err => res.status(400).json({
    error: true,
    title: 'Загрузка строк (Закладки):',
    message: err.message
  }))
})

router.post('/update', function(req, res){
  update(req.body)
  .then(data => res.json(data))
  .catch(err => res.status(400).json({
    error: true,
    title: 'Обновление строк (Закладки):',
    message: err.message
  }))
})

router.get('/insert', function(req, res){
  insert()
  .then(data => res.json(data))
  .catch(err => res.status(400).json({
    error: true,
    title: 'Добавление строк (Закладки):',
    message: err.message
  }))
})

module.exports.default = router