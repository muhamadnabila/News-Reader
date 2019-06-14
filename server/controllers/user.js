const { hash } = require('../helpers/bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')

class ControllerUser {
    static login(req, res, next) {
        let { email, password } = req.body
        User
         .findOne({ email })
         .then(user => {
             if (!user) {
                throw({ code : 400, message: 'Username/ password invalid' })
             }else {
                 if (!compare(password, user.password)) {
                    throw({ code : 400, message: 'Username/ password invalid' })
                 } else {
                   let token = sign({email: user.email})
                   res.status(200).json({ token })
                 }
             }
         })
         .catch(next)
    }
    static create (req,res, next) {
        let { email, password } = req.body
        let hashed = hash(password)
        User
         .create({
             email,
             password : hashed,
         })
         .then(data =>{
             let token = sign({email: data.email})
             res.status(201).json({ token })
         })
         .catch(next)
    }
    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.id_token
        })
        .then(ticket =>{
            let payload = ticket.getPayload();
            return User.findOne({ email: payload.email })
            .then(user =>{
                if(user) {
                    let token = sign({ email: user.email })
                    res.status(200).json({ token })
                }else {
                    return User.create({
                        email : payload.email,
                        password : '_googlePass'
                    })
                    .then(user =>{
                        let token = sign({ email: user.email })
                        res.status(200).json({ token })
                    })
                }
            })
        })
        .catch(next)
    }
}
module.exports = ControllerUser