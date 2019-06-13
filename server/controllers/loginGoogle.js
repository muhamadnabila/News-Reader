const {OAuth2Client} = require('google-auth-library');

class GoogleLogin {
    static login() {
        const client = new OAuth2Client(CLIENT_ID);
        
        client.verifyIdToken({
            idToken: req.body.id_token,
        })
            .then(ticket=> {
                const payload = ticket.getPayload();
                console.log (payload)
            })
        .catch(console.error);
    }
}

module.exports = GoogleLogin