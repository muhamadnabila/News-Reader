function getNews() {
    event.preventDefault()
    $('#loading').html(`
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `)
    let title = $('.news-title').val()
    Axios.get(`/news/allnews/${title}`)
    .then(({ data }) =>{
        temp = data
    $('#loading').empty()
        closeSearch()
        showMain(data)
    })
    .catch(err =>{
        showError(err)
    })
}

function getNewsSecond() {
    event.preventDefault()
    $('#list-news').empty()
    $('#list-news').html(`
    <div class="mt-2" style="margin: 0px auto; width: 100px ;"> 
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    `)
    let title = $('#news-title-second').val()
    Axios.get(`/news/allnews/${title}`)
    .then(({ data }) =>{
        temp = data
    $('#loading').empty()
        showMain(data)
    })
    .catch(err =>{
        showError(err)
    })
}

