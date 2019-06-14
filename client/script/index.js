const baseURL = 'http://localhost:3000'
const Axios = axios.create({
    baseURL
})
let speechButton = $('#btn-speech')
let audio = null
var page = []
var temp ;

$(document).ready(function () {
    initial()
})

function initial() {
    let token = localStorage.getItem('token')
    if(!token) {
        page.push('login')
        showPage()
    }else {
        let token = localStorage.getItem('token')
        Axios.get('/authenticate',{ headers : { token } })
        .then(data =>{
            page.push('search')
            showPage()
        })
        .catch(err=>{
            page.push('login')
            showPage()
        })
    }
}

function showPage () {
    closeLogin()
    closeSearch()
    closeRegister()
    closeMain()
    
    page.forEach(el =>{
        if(el == 'login') {
            showLogin()
        }
        if(el == 'search') {
            showSearch()
        }
        if(el == 'register'){
            showRegister()
        }
        if(el == 'main'){
            showMain()
        }
    })
    page = []
}

function registerTrigger() {
    event.preventDefault()
    page.push('register')
    showPage()
}
