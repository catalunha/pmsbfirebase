
import DatabaseReferences from "../database-references";
import * as admin from 'firebase-admin';



export function iniciarOnCreateChatMensagem(uploadSnap: any, context: any) {
    //const snapData = uploadSnap.data();
    //const snapParent = uploadSnap.parent();


    const ref = uploadSnap.ref;
    const chatRef = ref.parent.parent;

    chatRef.get().then(async (parentSnap: any) => {
        const usuarios = parentSnap.data().usuario;

        for (let i in usuarios) {
            usuarios[i]['lido'] = false
        }

        await _atualizarChat(parentSnap.id, usuarios)

        // console.log("chat data >> " + JSON.stringify(chat));
        console.log("chat id >> " + parentSnap.id);
    });
}

export async function _atualizarChat(refId: any, usuarioData: any) {
    console.log(" Usuarios: " + JSON.stringify(usuarioData));
    DatabaseReferences.db.collection('Chat').doc(refId).update({ usuario: usuarioData }).then(() => {
        console.log(`Chat ${refId} foi atualizado`)
        return 0;
    }).catch((error)=>{
        console.log(`Erro ao atualizar o chat ${refId} `);
    })
}


// ON UPDATE

export function iniciarOnCreate(uploadSnap: any) {
    const snapData = uploadSnap.data();
    const uploadId = uploadSnap.id;

    console.log("CHAT : snapData >> " + snapData.titulo + " >> " + snapData.texto);
    console.log("CHAT : uploadId >> " + uploadId);

    const message = {
        notification: {
            title: snapData.titulo,//`You have a message from "${}"`,
            body: snapData.titulo,//'contentMessage',
            badge: '1',
            sound: 'default'
        }
    }

    snapData.usuario.forEach((usuarioID: any) => {
        console.log('usuarioID : ' + usuarioID);
        DatabaseReferences.usuariosRef.doc(usuarioID).get().then((usuarioSnap: any) => {
            const usuarioData = usuarioSnap.data();
            //const uploadId = usuarioSnap.id;
            enviarNotificacaoToken(usuarioData.pushToken, message);
        })
    });
}

function enviarNotificacaoToken(token: any, message: any) {
    admin.messaging()
        .sendToDevice(token, message)
        .then(response => {
            console.log('Successfully sent message:', response)
        })
        .catch(error => {
            console.log('Error sending message:', error)
        })
}



// "Chat": {
//     "ChatID": "ProdutoID || QuestionarioID || ID para outro seguimento",
//     "usuario": {
//       "usuarioID": {
//         "id": true,
//         "nome": "/Usuario/usuarioID$nome",
//         "lido": false
//       }
//     }
//   },
//   "Chat/chatID/ChatMensagem": {
//     "autor": {
//       "usuarioID": "/Usuario/usuarioID",
//       "nome": "/Usuario/usuarioID$nome"
//     },
//     "texto": "texto",
//     "datahora": "Firebase timestamp"
//   },
//   "Chat/chatID/ChatNoticacao": {
//     "datahora": "Firebase timestamp",
//     "autor": {
//       "usuarioID": "/Usuario/usuarioID",
//       "nome": "/Usuario/usuarioID$nome"
//     },
//     "titulo": "",
//     "texto": "",
//     "usuario": [
//       "UsuarioID"
//     ]
//   }