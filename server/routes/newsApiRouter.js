const router = require('express').Router()
const newsC = require('../controllers/newsCont')

router.get('/allnews', newsC.getNews)

module.exports = router