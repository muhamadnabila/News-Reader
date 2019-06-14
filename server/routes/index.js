const route = require('express').Router()
const { ControllerUser, ControllerTextToSpeech } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const news = require('../routes/newsApiRouter')
const Axios = require('axios')

route.get('/', (req, res) => {res.status(200).json({message: 'Connect'})})
route.get('/authenticate',authenticate,(req,res)=>{ res.status(200).json({}) })
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/login/google', ControllerUser.googleLogin)

route.post('/textToSpeech', ControllerTextToSpeech.textToSpeech)

route.use('/news', news)

route.post('/translate',(req, res, next)=> {
    let text = req.body.text
    let fromLang = req.body.fromLang 
    let toLang = req.body.toLang
    Axios.post(`https://translate.yandex.net/api/v1.5/tr/translate?lang=${fromLang}-${toLang}&format=plain&key=${process.env.YANDEX_API_KEY}&text=${ text }`)
    .then(({ data }) =>{
        res.status(200).json(data)
    })
    .catch(next)
})
route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route