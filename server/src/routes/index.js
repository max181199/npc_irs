var router = require('express').Router()
var book = require('./book/index').default
var bookmark = require('./bookmark/index').default

router.use('/book', book)
router.use('/bookmark', bookmark)

module.exports.default = router