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

route.get('/translate/:title',(req,res,next)=>{
    let text = req.params.title
    console.log('masuk')
    console.log(text)
    Axios.post(`https://translate.yandex.net/api/v1.5/tr.json/detect?hint=id,en,de,zh,ja,ru&text=${encodeURI(text)}&key=${process.env.YANDEX_API_KEY}`)
    .then(({ data }) =>{
        res.status(200).json(data)
        console.log(data)
    })
    .catch(err =>{
        res.status(400).json(err)
        console.log(data)
    })
})
route.post('/translate',(req, res, next)=> {
    let text = req.body.text
    let fromLang = req.body.fromLang 
    let toLang = req.body.toLang
    let uri = encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${fromLang}-${toLang}&format=html&key=${process.env.YANDEX_API_KEY}&text=${text}`)
    Axios.get(uri)
    .then(({ data }) =>{
        res.status(200).json(data)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})
route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route