function showSearch() {
    $('#search-page').show()
}

function showLogin(){
    $('#login-page').show()
}
function showRegister() {
    $('#register-page').html(`
    <div class="foo">
            <span class="letter" data-letter="N">N</span>
            <span class="letter" data-letter="E">E</span>
            <span class="letter" data-letter="W">W</span>
            <span class="letter" data-letter="S">S</span>
            <span class="letter" data-letter=" "> </span>
            <span class="letter" data-letter=" "> </span>
            <span class="letter" data-letter=" "> </span>
            <span class="letter" data-letter=" "> </span>
            <span class="letter" data-letter=" "> </span>
            <span class="letter" data-letter="R">R</span>
            <span class="letter" data-letter="E">E</span>
            <span class="letter" data-letter="A">A</span>
            <span class="letter" data-letter="D">D</span>
            <span class="letter" data-letter="E">E</span>
            <span class="letter" data-letter="R">R</span>
        </div>
        <div class="container" >
            <div class="row">
                <div class="col-6 bg-danger" style="height: 400px">
                    <img src="https://brunelpcclaw.files.wordpress.com/2013/03/stick_figure_reading_newspaper_500_clr_5142.gif?w=584" style="height: 450px; width: 400px">
                </div>
                <div class="col-6 bg-light" >
                    <form onsubmit="register()" class="p-3">
                        <div class="form-group">
                            <input type="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="email address">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="confirm email address">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="your name">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="register-pass" placeholder="Password">
                        </div>
                        <label> Already have an account? <a onclick="initial()" href="#"> Login </a></label>
                        <button type="submit" class="btn btn-primary" style="width: 100% "> Register </button>
                    </form>
                </div>
            </div>
        </div>
    `)
}
function showMain(data){
    $('#main-page').html(`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">News Reader</a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <button onclick="logout()" type="button" class="btn btn-primary btn-sm">Sign out</button>
            </form>
        </div>
    </nav>
    <h1 class="mt-3" style="text-align:center; font-weight:bold"> TOP 20 NEWS </h1>
    <form onsubmit="getNewsSecond()">
        <div class="form-group" style="margin: 10px auto; padding:10px; width: 700px">
            <input type="text" class="form-control" id="news-title-second" aria-describedby="emailHelp" placeholder="Search New News Title" style="width:700px ; text-align:center">
        </div>
    </form>
    <hr style="width:70%;">
    <div class="container p-5">
        <div id="list-news"> </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="btn-group dropup">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropup
            </button>
            <div class="dropdown-menu">
                <a onclick=translator() class="dropdown-item language" href="#">id</a>
            </div>
        </div>
            <ul class="navbar-nav mr-auto">
            </ul>
        </div>
    </nav>
    `)
    data.forEach(el =>{
        let description ;
        if( el.description == 'undefined') {
            description = 'No description'
        }
        else if(el.description.length >= 150) {
            description = el.description.slice(0,150) + '...'
        }else {
            description = el.description
        }
        $('#list-news').append(`
        <div class="card mb-3" style="width: 100%; height:200px; max-height:200px">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${el.urlToImage}" class="card-img" alt="..." style="max-height:200px">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><a href="${el.url}">visit link</a></p>
                    <p class="card-text"><small class="text-muted">Published at :${el.publishedAt}</small></p>
                </div>
                </div>
            </div>
        </div>
        `)
    })
}
function closeLogin() {
    $('#login-page').hide()
}
function closeRegister() {
    $('#register-page').empty()
}
function closeSearch() {
    $('#search-page').hide()
}
function closeMain() {
    $('#main-page').empty()
}