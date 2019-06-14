const Axios = require('axios')

class TranslateController {
    static translateTitle(req, res, next) {
        let text = req.params.title
        console.log('masuk')
        console.log(text)
        Axios.post(`https://translate.yandex.net/api/v1.5/tr.json/detect?hint=id,en,de,zh,ja,ru&text=${encodeURI(text)}&key=${process.env.YANDEX_API_KEY}`)
            .then(({ data }) => {
                res.status(200).json(data)
                console.log(data)
            })
            .catch(err => {
                res.status(400).json(err)
                console.log(data)
            })
    }

    static translate(req, res, next) {
        let text = req.body.text
        let fromLang = req.body.fromLang
        let toLang = req.body.toLang
        let uri = encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${fromLang}-${toLang}&format=html&key=${process.env.YANDEX_API_KEY}&text=${text}`)
        Axios.get(uri)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = TranslateController