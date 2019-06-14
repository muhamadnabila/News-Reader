const toSpeech = require('../helpers/text.to.speech')

class TextToSpeech {
   static async textToSpeech(req, res, next) {
        let {text, lang} = req.body
        try  {
            let speechBuffer = await toSpeech(text, lang)
            let speech = Buffer.from(speechBuffer, 'base64').toString('ascii')
            res.json({speech})
        } catch (err) {
            console.log("text to speech error:", err)
            next({code: 500, msg: 'api text to speech error'})
        }
   }
}
module.exports = TextToSpeech