
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

export default class GoogleApiControllerTemplateBase {

    public oAuth2Client: any;

    constructor() {

        this.oAuth2Client = new OAuth2(
            "1092622474927-9dgqh9vmoq384jq8dd58p027hk6oa1fh.apps.googleusercontent.com",
            "NXuw1CAF1upMYLCSdvB4xi-z",
            "https://developers.google.com/oauthplayground"
        );

        this.oAuth2Client.setCredentials({
            refresh_token: "1/cGTNyhlCKlehB0K-HN6yu4sAFu7L6pi90JBdhaHe5HeTrOX94FqpnK1iQB1KjPYJ"
        });
    }

    public getOAuth2Client(){
        return this.oAuth2Client;
    }
    
}

