function playSpeech(text, lang = 'en-us') {
    if (!audio) {
        Axios.post(`/textToSpeech`, {text, lang})
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

function translator() {
    event.preventDefault()
    console.log(temp)
    let fromLang = 'en'
    let toLang = $('.language').text()
    let title =  ''
    let description = ''
    for (let i = 0 ; i < temp.length; i++) {
        title += temp[i].title + '##'
        description += temp[i].description + '##'
    }
    let text = title 
    console.log(text)
    Axios.post('/translate' , { text, fromLang, toLang })
    .then(data =>{
        console.log(data)
    })
    .catch(err =>{
        console.log(err)
    })
}