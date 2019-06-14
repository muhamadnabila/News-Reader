const voicerss = require('./voicerss')

function getSpeech(text, lang) {
    return new Promise ((resolve, reject) => {
        voicerss.speech({
            key: process.env.VOICE_RSS_API_KEY,
            hl: lang || 'en-us',
            src: text,
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false,
            b64: true,
            callback: function (error, content) {
                if (error) {
                    reject(error)
                } else {
                    resolve(content)
                }
            }
        })
    })
}

module.exports = getSpeech