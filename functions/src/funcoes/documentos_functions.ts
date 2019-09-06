import DatabaseReferences from "../database-references";

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const docs = google.docs('v1');


export function iniciarOnCreate(documentSnap: any) {
    const documentSnapData = documentSnap.data();
    const documentSnapId = documentSnap.id;

    const oAuth2Client = new OAuth2(
        "1092622474927-9dgqh9vmoq384jq8dd58p027hk6oa1fh.apps.googleusercontent.com",
        "NXuw1CAF1upMYLCSdvB4xi-z",
        "https://developers.google.com/oauthplayground"
    );

    oAuth2Client.setCredentials({
        refresh_token: "1/cGTNyhlCKlehB0K-HN6yu4sAFu7L6pi90JBdhaHe5HeTrOX94FqpnK1iQB1KjPYJ"
    });

    criarNovoDocument(oAuth2Client, documentSnapData, documentSnapId);
    // .then((data: any) => {
    //     salvarDadosDocument(data, documentSnapId);
    //     console.error("Criação de novo documento funcionado.");
    //     return;
    // }).catch(err => {
    //     console.error('Error adding event: ' + err.message);
    //     return;
    // });
}

export function criarNovoDocument(auth: any, data: any, snapID: any) {
    docs.documents.create({
        auth: auth,
        title: data.nome,
    }, (err: any, res: any) => {
        if (err) {
            console.log('The API returned an error: ' + err);
        }
        else {
           
            console.log("-> salvarDadosDocument");
            console.log(`>> Novo doc criado -> ID: ${res.data.documentId}`);
            console.log("Criando doc " + snapID);

            DatabaseReferences.documentoRef.doc(snapID).update({
                documentoCriado: true,
                documentoId: res.data.documentId,
            }).then(() => {
                console.log("CRIACAO DE DOCUMENTO FINALIZADA -> ID : " + res.data.documentId)
            }).catch(error => {
                console.log("ERROR NA CRIACAO DE DOCUMENTO FINALIZADA -> " + error.message)
            });
            // salvarDadosDocument(res.data, snapID);
        }
    });
}

// export function salvarDadosDocument(data: any, documentId: any) {

// }

// export function iniciarOnCreate(documentSnap: any) {
//     const documentSnapData = documentSnap.data();
//     const documentSnapId = documentSnap.id;

//     const oAuth2Client = new OAuth2(
//         "1092622474927-9dgqh9vmoq384jq8dd58p027hk6oa1fh.apps.googleusercontent.com",
//         "NXuw1CAF1upMYLCSdvB4xi-z",
//         "https://developers.google.com/oauthplayground"
//     );

//     oAuth2Client.setCredentials({
//         refresh_token: "1/cGTNyhlCKlehB0K-HN6yu4sAFu7L6pi90JBdhaHe5HeTrOX94FqpnK1iQB1KjPYJ"
//     });

//     criarNovoDocument(oAuth2Client, documentSnapData, documentSnapId).then((data: any) => {
//         salvarDadosDocument(data, documentSnapId);
//         console.error("Criação de novo documento funcionado.");
//         return;
//     }).catch(err => {
//         console.error('Error adding event: ' + err.message);
//         return;
//     });
// }

// export function criarNovoDocument(auth: any, data: any, snapID: any) {
//     return new Promise(function (resolve, reject) {
//         docs.documents.create({
//             auth: auth,
//             title: data.nome,
//         }, (err: any, res: any) => {
//             if (err) {
//                 console.log('The API returned an error: ' + err);
//                 reject(err);
//             }
//             else {
//                 console.log(`Novo doc criado -> ID: ${res.data.documentId}`);
//                 //salvarDadosDocument(res.data, snapID);
//                 resolve(res.data);
//             }
//             //console.log(JSON.stringify(res.data));
//         });
//     });
// }

// export function salvarDadosDocument(data: any, documentId: any) {
//     console.log("-> salvarDadosDocument");
//     console.log("Criando doc " + documentId);
//     DatabaseReferences.documentoRef.doc(documentId).update({
//         documentoCriado: true,
//         documentoId: data.documentId,
//     }).then(() => {
//         console.log("CRIACAO DE DOCUMENTO FINALIZADA -> ID : " + data.documentId)
//     }).catch(err => {
//         console.log("ERROR NA CRIACAO DE DOCUMENTO FINALIZADA -> " + err.message)
//     });
// }
