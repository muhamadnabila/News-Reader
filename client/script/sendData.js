function playSpeech() {
    if (!audio) {
        let text = $('#text-to-speech-input').val()
        Axios.post(`/textToSpeech`, {text})
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

function login() {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-pass').val()
    Axios.post(`/login`,{ email, password })
    .then(({ data }) =>{
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
    .catch(err =>{
        showError(err)
    })
}

function register() {
    event.preventDefault()
    let email = $('#register-email').val()
    let password = $('#register-pass').val()
    Axios.post(`/register`,{  email, password })
    .then(({ data }) =>{
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
    .catch(err =>{
        showError(err)
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    Axios.post('/login/google',{ id_token })
    .then(({ data }) =>{
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
    .catch(err =>{
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
    return new Promise((res,rej)=>{
        Axios.get(`/translate/${title}`)
        .then(data =>{
            res(data)
        })
        .catch(err =>{
            rej(err)
        })

    })
}

function translator(fromLang,toLang,title,content,author,publishedAt,urlToImage,url) {
    event.preventDefault()
    let titleTranslate = Axios.post('/translate' , { text : title, fromLang, toLang })
    let descriptionTranslate = Axios.post('/translate' , { text : content, fromLang, toLang })
    Promise.all([ titleTranslate, descriptionTranslate ])
    .then(value =>{
        (value[0].data,value[1].data,author,publishedAt,urlToImage,url)
        showDetailAfterTranslate(value[0].data,value[1].data,author,publishedAt,urlToImage,url)
    })
    .catch(err =>{
        rej(err)
    })

}