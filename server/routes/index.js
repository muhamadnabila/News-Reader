const route = require('express').Router()
const { ControllerUser, ControllerTextToSpeech,  TranslateController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const news = require('../routes/newsApiRouter')

route.get('/', (req, res) => {res.status(200).json({message: 'Connect'})})
route.get('/authenticate',authenticate,(req,res)=>{ res.status(200).json({}) })
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/login/google', ControllerUser.googleLogin)

route.post('/textToSpeech', ControllerTextToSpeech.textToSpeech)
route.use('/news', news)
route.get('/translate/:title', TranslateController.translateTitle)
route.post('/translate', TranslateController.translate)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route