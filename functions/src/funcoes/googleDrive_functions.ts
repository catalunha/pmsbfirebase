// import DatabaseReferences from "../database-references";

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const docs = google.docs('v1');
const sheets = google.sheets('v4');

export function iniciarOnCreate(documentSnap: any) {
    const documentSnapData = documentSnap.data();
    const documentSnapId = documentSnap.id;

    console.log("CRIAR NOVO DOCUMENTO NO GDRIVE -> " + documentSnapId)


    const oAuth2Client = new OAuth2(
        "1092622474927-9dgqh9vmoq384jq8dd58p027hk6oa1fh.apps.googleusercontent.com",
        "NXuw1CAF1upMYLCSdvB4xi-z",
        "https://developers.google.com/oauthplayground"
    );

    oAuth2Client.setCredentials({
        refresh_token: "1/cGTNyhlCKlehB0K-HN6yu4sAFu7L6pi90JBdhaHe5HeTrOX94FqpnK1iQB1KjPYJ"
    });


    if (documentSnapData.tipo == 'documento') {

        return criarNovoDocument(oAuth2Client, documentSnapData, documentSnapId).then((data: any) => {
            console.log("Salvando dado do doc no firestore.")
            return documentSnap.ref.set({
                criado: true,
                arquivoID: data.documentId,
            }, { merge: true });
        }).catch(err => {
            console.error('Error na função criarNovoDocument: ' + err.message);
            return 0;
        });;

    } else if (documentSnapData.tipo == 'planilha') {

        return criarNovaPlanilha(oAuth2Client, documentSnapData, documentSnapId).then((data: any) => {
            console.log("Salvando dado da plan no firestore.")
            return documentSnap.ref.set({
                criado: true,
                arquivoID: data.spreadsheetId,
            }, { merge: true });
        }).catch(err => {
            console.error('Error na função criarNovaPlanilha: ' + err.message);
            return 0;
        });;

    } else {

        console.log("Tipo de arquivo nao reconhecido >> docId: ")
        return 0;

    }

}

export function criarNovoDocument(auth: any, data: any, snapID: any) {

    return new Promise((resolve, reject) => {
        docs.documents.create({
            auth: auth,
            title: snapID,
        }, (err: any, res: any) => {
            if (err) {
                console.log('The API returned an error: ' + err);
            }
            else {
                console.log(`>> Novo doc criado no gdrive-> ID: ${res.data.documentId}`);
                resolve(res.data)
            }
        });
    });
}


export function criarNovaPlanilha(auth: any, data: any, snapID: any) {

    return new Promise((resolve, reject) => {
        sheets.spreadsheets.create({
            auth: auth,
            resource: { properties: { title: snapID } },
        }, (err: any, res: any) => {
            if (err) {
                console.log('The API returned an error: ' + err);
            }
            else {
                console.log(`>> Nova plan criado no gdrive-> ID: ${res.data.spreadsheetId}`);
                resolve(res.data)
            }
        });
    });
}