const router = require('express').Router()
const googleCont = require('../controllers/loginGoogle')

router.post('/',googleCont.login)

module.exports = router