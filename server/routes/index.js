const route = require('express').Router()
const { ControllerUser, ControllerTextToSpeech } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

route.get('/', (req, res) => {res.status(200).json({message: 'Connect'})})
route.get('/authenticate',authenticate,(req,res)=>{ res.status(200).json({}) })
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/textToSpeech', ControllerTextToSpeech.textToSpeech)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route