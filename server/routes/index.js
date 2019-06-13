const route = require('express').Router()
const { ControllerUser } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const news = require('../routes/newsApiRouter')
const logingoogle = require('../routes/loginGoogle')
const {OAuth2Client} = require('google-auth-library');

route.get('/', (req, res) => {res.status(200).json({message: 'Connect'})})
route.get('/authenticate',authenticate,(req,res)=>{ res.status(200).json({}) })
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)

route.post('/logingoogle',(req,res)=> {
    console.log ('masuk logingoogle')
    const client = new OAuth2Client("132166001773-nljl5umc0vmdlvodji12sfl1eqk051q7.apps.googleusercontent.com");
        
        client.verifyIdToken({
            idToken : req.body.id_token,
        })
            .then(ticket=> {
                console.log('ticket')
                const payload = ticket.getPayload();
                console.log (payload)
            })
        .catch(err =>{
            console.log('masuk error')
            console.log(err)
        });
})
route.use('/news', news)


route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route