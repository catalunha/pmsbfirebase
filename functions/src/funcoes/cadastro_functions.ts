// import admin = require("firebase-admin");
import DatabaseReferences from "../database-references";

export function iniciaOnCreate(snap: any) {
    let data = snap.data();
    DatabaseReferences.criarUsuario(data)
}



// function criarUsuario(data: any) {
   
//     admin.auth().createUser({
//         email: data.email,
//         emailVerified: false,
//         password: data.senha,
//         displayName: data.nome,
//         disabled: false
//     }).then(function (userRecord) {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log("Successfully created new user:", userRecord.uid);
//     }).catch(function (error) {
//         console.log("Error creating new user:", error);
//     });
// }