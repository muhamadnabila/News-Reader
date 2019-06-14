function playSpeech(text, lang = 'en-us') {
    $('#audio-source').html(``)
    Axios.post(`/textToSpeech`, { text, lang })
        .then(res => {
            audio = res.data.speech
            //set audio source
            $('#audio-source').html(`<source id="audio-source" src="${audio}" type="audio/mp3">`)
        })
        .catch((err) => {
            console.log(err)
            alert('audio api error')
        })
}

function login() {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-pass').val()
    Axios.post(`/login`, { email, password })
        .then(({ data }) => {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Hello, Welcome back',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('token', data.token)
            initial()
        })
        .catch(err => {
            showError(err)
        })
}

function register() {
    event.preventDefault()
    let email = $('#register-email').val()
    let password = $('#register-pass').val()
    Axios.post(`/register`, { email, password })
        .then(({ data }) => {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Hello, Welcome to News Reader',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('token', data.token)
            initial()
        })
        .catch(err => {
            showError(err)
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    Axios.post('/login/google', { id_token })
        .then(({ data }) => {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Hello, Welcome to News Reader',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('token', data.token)
            initial()
        })
        .catch(err => {
            showError(err)
        })
}
function logout() {
    localStorage.removeItem('token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    initial()
}
function getLanguage(title) {
    event.preventDefault()
    return new Promise((res, rej) => {
        Axios.get(`/translate/${title}`)
            .then(data => {
                res(data)
            })
            .catch(err => {
                rej(err)
            })

    })
}

function translator(fromLang, toLang, idx) {
    event.preventDefault()
    let { title, content, author, publishedAt, urlToImage, url } = window.newsReaderAppState.news[idx] 
    let titleTranslate = Axios.post('/translate', { text: title, fromLang, toLang })
    let descriptionTranslate = Axios.post('/translate', { text: content, fromLang, toLang })
    Promise.all([titleTranslate, descriptionTranslate])
        .then(value => {
            showDetailAfterTranslate(value[0].data, value[1].data, author, publishedAt, urlToImage, url, idx, toLang)
            playSpeech(value[1].data.text[0], getAudioLanguage(toLang))
        })
        .catch(err => {
            console.log(err)
        })

}

function getAudioLanguage(lang) {
    switch (lang) {
        case 'en':
            return 'en-us'
        case 'ru':
            return 'ru-ru'
        case 'zh':
            return 'zh-cn'
        case 'ja':
            return 'ja-jp'
        default:
            return 'en-us';
    }
}