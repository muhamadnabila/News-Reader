let speechButton = $('#btn-speech')
let audio = null

function playSpeech() {
    if (!audio) {
        let text = $('#text-to-speech-input').val()
        axios.post(`http://localhost:3000/textToSpeech`, {text})
            .then(res => {
                audio = res.data.speech
                //set audio source
                $('#audio-source').html(`<source id="audio-source" src="${audio}" type="audio/mp3">`)
            })
            .catch((err) => {
                console.log(err)
                debugger
                alert('audio api error')
            })
    }
}
