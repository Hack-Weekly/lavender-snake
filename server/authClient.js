const {
  OAuth2Client,
  UserRefreshClient
} = require('google-auth-library');
const { google }  = require("googleapis");
var createError = require("http-errors");

const knownUsers = {

}

const clientId = "987357728284-k763p5d1paujmlvn83tl2lc637f8ofc3.apps.googleusercontent.com";
const clientSecret = process.env.CLIENT_SECRET;

async function authenticateRequest(req, res, next) {
    const authCode = req.headers.authorization.replace("Bearer ", "");
	console.log(authCode);
    console.log(JSON.stringify(knownUsers));
	req.user = knownUsers[authCode];
    if (req.user)
	    next();    
    else
        next(createError(401));
}

function setupAuthRoutes(app) {    
    console.log(`Secret: ${clientSecret?.substring(5, 10)}`);

    app.post('/auth/google', async (req, res) => {
        const authCode = req.body.code;
        const oAuth2Client = new OAuth2Client(
            clientId,
            clientSecret, 
            'postmessage',
        );
        const { tokens } = await oAuth2Client.getToken(authCode); // exchange code for tokens
        oAuth2Client.setCredentials(tokens);
        const oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: 'v2'
        });
        const { data } = await oauth2.userinfo.get();
        knownUsers[authCode] = {
            authCode,
            userData: data,
            creds: tokens
        }
        
        res.json({ ...data, authCode: authCode});
    });

    app.post('/auth/google/refresh-token', async (req, res) => {
        const userRefreshClient = new UserRefreshClient(
            clientId,
            clientSecret,
            req.body.refreshToken,
        );
        const { credentials } = await userRefreshClient.refreshAccessToken(); // optain new tokens
        res.json(credentials);
    })
}

module.exports = { authenticateRequest, setupAuthRoutes} 