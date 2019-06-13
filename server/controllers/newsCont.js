const axios = require('axios')

class Controller {
    static getNews (req,res,next) {
        let search = req.body.search
        // console.log (search)

        axios({
            method : 'get',
            url : `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.API_KEY}`
        })
            .then(({data,status})=> {
                // console.log (data)
                res.status(status).json(data)
            })
            .catch(next)
    }
}

module.exports = Controller