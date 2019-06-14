const axios = require('axios')

class Controller {
    static getNews (req,res,next) {
        let title = req.params.title
        axios({
            method : 'get',
            url : `https://newsapi.org/v2/everything?q=${title}&apiKey=${process.env.NEWS_API_KEY}`
        })
            .then(({data})=> {
                // console.log(data)
                let result = data.articles.slice(0,20)
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = Controller