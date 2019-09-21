import DatabaseReferences from "../database-references";
// import { link } from "fs";

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const docs = google.docs('v1');
const sheets = google.sheets('v4');
const drive = google.drive('v2');

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


    if (documentSnapData.tipo == 'document') {

        return criarNovoDocument(oAuth2Client, documentSnapData, documentSnapId).then((data: any) => {
            inserirPermissaoLinkCompartilhado(oAuth2Client, data.documentId, documentSnapData, documentSnap);
            salvarReferenciaArquivoNaCollectionPai(documentSnapData.updateCollection, data.documentId);
            console.log("Salvando dado do doc no firestore.")

            return documentSnap.ref.set({
                criado: true,
                arquivoID: data.documentId,
            }, { merge: true });

        }).catch(err => {
            console.error('Error na função criarNovoDocument: ' + err.message);
            return 0;
        });;

    } else if (documentSnapData.tipo == 'spreadsheets') {

        return criarNovaPlanilha(oAuth2Client, documentSnapData, documentSnapId).then((data: any) => {
            inserirPermissaoLinkCompartilhado(oAuth2Client, data.documentId, documentSnapData, documentSnap);
            salvarReferenciaArquivoNaCollectionPai(documentSnapData.updateCollection, data.documentId);
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

        console.log("ERROR >> GDRIVE >> Tipo de arquivo nao reconhecido")
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


export function inserirPermissaoLinkCompartilhado(auth: any, fileId: any, documentData: any, documentSnap: any) {

    var keyEmail: any;

    const body = {
        'role': documentData.link,
        'type': "anyone",
    };

    drive.permissions.insert({
        'auth': auth,
        'fileId': fileId,
        'resource': body,
        'withLink': true
    }, (err: any, res: any) => {
        if (err) {
            console.log('inserirPermissaoLinkCompartilhado returned an error: ' + err);
        }
        else {
            console.log("inserirPermissaoLinkCompartilhado >> Nova autentificacao criada no gdrive, user: " + keyEmail + " >> " + res.data.id);
        }
    });


}


export function salvarReferenciaArquivoNaCollectionPai(snapData: any, reference: any) {

    const collection = snapData.collection;
    const document = snapData.document;
    const field = snapData.field;

    DatabaseReferences.db.collection(collection).doc(document).update({
        [field]: reference
    }).then(produtoDoc => {
        console.log("Google drive - salvando a refencia no " + collection);
    }).catch(err => {
        console.log("Google drive - ERRO >> salvando a refencia no " + collection);
    });
}


// export function inserirPermicaoArquivo(auth: any, fileId: any, usuarioData: any, documentSnap: any) {

//     const listaPermicao: any = { "escrever": "writer", "ler": "reader" };

//     var keyEmail: any;


//     for (keyEmail in usuarioData) {

//         const permissao: any = usuarioData[keyEmail].permissao;

//         const body = {
//             'value': keyEmail,
//             'type': 'group',
//             'role': listaPermicao[permissao]
//         };

//         drive.permissions.insert({
//             'sendNotificationEmail': false,
//             'auth': auth,
//             'fileId': fileId,
//             'resource': body
//         }, (err: any, res: any) => {
//             if (err) {
//                 console.log('inserirPermicaoArquivo returned an error: ' + err);
//             }
//             else {
//                 console.log("inserirPermicaoArquivo >> Nova autentificacao criada no gdrive, user: " + keyEmail + " >> " + res.data.id);

//                 documentSnap.ref.set({
//                     'usuario': {
//                         [keyEmail]: {
//                             permissaoID: res.data.id
//                         }
//                     },
//                 }, { merge: true });
//             }
//         });

//     }
// }


///


// var google = require('googleapis');
// var _ = require('lodash-node/compat');
// var Q = require('q');   
// var OAuth2 = google.auth.OAuth2; 


// var CLIENT_ID = '...';
// var CLIENT_SECRET = '...';
// var REDIRECT_URL = '...';

// var shareFile = function (fileName) {
//   var deferred = Q.defer();
//   var drive = google.drive('v2');
//   var auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

//   drive.files.list({auth: auth}, function (err, res) {
//     var foundFile = _.first(_.filter(res.items, {title: fileName, "explicitlyTrashed": false}));

//     if (!foundFile) {
//         deferred.reject('File ' + fileName + ' has not been found.');
//         return;
//     }

//     drive.permissions.list({fileId: foundFile.id, auth: auth}, function (err, res) {

//         if (_.isEmpty(_.find(res.items, 'role', 'reader'))) {
//             var body = {
//                 'value': 'default',
//                 'type': 'anyone',
//                 'role': 'reader'
//             };

//             drive.permissions.insert({
//                 fileId: foundFile.id,
//                 resource: body,
//                 auth: auth
//             }, function (err, res, body) {
//                 deferred.resolve(body);
//             });
//         }
//     });
// });
// return deferred.promise;