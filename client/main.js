function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    console.log (id_token)
    $.ajax({
        url :'http://localhost:3000/logingoogle',
        type : 'post',
        data : {id_token}
    })
}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

