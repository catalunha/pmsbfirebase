// import DatabaseReferences from "../database-references";
// import * as admin from 'firebase-admin';

// import * as fs from 'fs';
// import * as readline from 'readline';
// import * as google from 'google';


const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const TOKEN_PATH = 'token.json';
const SCOPES = ['https://www.googleapis.com/auth/documents'];


export function iniciarOnCreate(uploadSnap: any) {

    // If modifying these scopes, delete token.json.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err: any, content: any) => {
        if (err) { console.log('Error loading client secret file:', err); }
        else { authorize(JSON.parse(content), printDocTitle); }
        // Authorize a client with credentials, then call the Google Docs API.
    });

}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any): any {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err: any, token: any) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client: any, callback: any): any {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code: any) => {
        rl.close();
        oAuth2Client.getToken(code, (err: any, token: any) => {
            if (err) {
                console.error('Error retrieving access token', err);
            }
            else {
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error: any) => {
                    if (error) { console.error(error) }
                    else { console.log('Token stored to', TOKEN_PATH) }

                });
                callback(oAuth2Client);
            }
        });
    });
}

/**
 * Prints the title of a sample doc:
 * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
 */
function printDocTitle(auth: any): any {
    const docs = google.docs({ version: 'v1', auth });

    docs.documents.create({
        title: "Documento teste criacao dentro firebase",
    }, (err: any, res: any) => {
        if (err) { console.log('The API returned an error: ' + err); }
        else { console.log(`The title of the document is: ${res.data.documentId}`); }

        //console.log(JSON.stringify(res.data));
    });
}


// function printDocTitle(auth:any) {
//   const docs = google.docs({version: 'v1', auth});

//   docs.documents.get({
//     documentId: '1Kl1o5sQzZ1SVmE61ymdLPU3ExBuTnxrgRdtglQEE8eM',
//   }, (err:any, res:any) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     console.log(`The title of the document is: ${res.data.title}`);
//     console.log(JSON.stringify(res.data));
//   });
// }