import * as functions from 'firebase-functions';



// /**
//  * Eixo
//  */
// import * as eixoFuntion from './funcoes/eixo_function';

// exports.eixoOnUpdateFuntion = functions.firestore.document('Eixo/{eixoId}').onUpdate(eixoFuntion.iniciarUpdateCollectionEixo);


// /**
//  * Documentos
//  */

import * as googleDriveFunctions from './funcoes/googleDrive_functions';

exports.googleDriveOnCreateFuntion = functions.firestore.document('GoogleDrive/{documentoId}').onCreate(googleDriveFunctions.iniciarOnCreate);


// /**
//  * Setor censitario
//  */

// import * as setorCensitarioFunctions from './funcoes/setor_censitario_functions';

// exports.setorCensitarioOnUpdateFunction = functions.firestore.document('SetorCensitario/{setorCensitarioId}').onUpdate(setorCensitarioFunctions.iniciarSetorCensitarioOnUpdate);
//  /**
//  * Cargo
//  */

// import * as cargoFunctions from './funcoes/cargo_function';

// exports.cargoOnUpdateFunction = functions.firestore.document('Cargo/{cargoId}').onUpdate(cargoFunctions.iniciarUpdateCollectionCargo);

/**
 * CHAT
 */

 
// import * as chatFunctions  from './funcoes/chat_functions';

// exports.chatCreateFunction = functions.firestore.document('Chat/{uploadId}/ChatNotificacao/{chatNotificacaoId}').onCreate(chatFunctions.iniciarOnCreate);
//exports.chatMensagemOnCreateFunction = functions.firestore.document('Chat/{uploadId}/ChatMensagem/{chatMensagemId}').onCreate(chatFunctions.iniciarOnCreateChatMensagem);

// /**
//  * USUARIO
//  */
// import * as usuarioFunction from './funcoes/usuario_funtion';

// exports.usuarioUpdadeFunction = functions.firestore.document('Usuario/{uploadId}').onUpdate(usuarioFunction.iniciarUpdateCollectionUsuario);

//exports.usuarioOnCreateFunction = functions.firestore.document('Usuario/{uploadId}').onCreate(usuarioFunction.iniciarCreateCollectionUsuario);

/**
 *  UPLOAD
 */

// import * as uploadFuntion from './funcoes/upload_funtion';

// // quando Upload.upload ter seu valor alterado de [false] para [true] alterar os dados de path mostrados em updateCollection.

// exports.uploadFunction = functions.firestore.document('Upload/{uploadId}').onUpdate(uploadFuntion.iniciarAlterarUploadFunction);

/**
 *  QUESTIONARIO
 */

// import * as questionarioFuntion from './funcoes/questionario_functions';

// exports.questionarioOnUpdateFunction = functions.firestore.document('Questionario/{questionarioId}').onUpdate(questionarioFuntion.iniciarUpdateCollectionQuestionario);



/*
 * Criando e Alterando relacao de [ Perfil >> UsuarioPerfil ] para cada um dos Usuarios
 
import * as usuarioPerfilFunction from './funcoes/perfil_funtion';

exports.criarRelacaoPerfilEUsuarioPerfil = functions.firestore.document('Perfil/{pefilId}').onWrite(
    async (perfilSnap: any) => {
        //after pega os dados apos a mudanca no banco
        //before pega os dados antes da mudanca no banco
        const perfilData = perfilSnap.after.data();
        //console.log("Nome: " + perfilData.nome != undefined + "  content: " + perfilData.contentType != undefined);
        if (perfilData.nome != undefined && perfilData.contentType != undefined) {
            //console.log(" NOME >> Length >> " + perfilData.nome.length);
            //console.log(" CONTENTtYPE >> Length >> " + perfilData.contentType.length);
            if (perfilData.nome.length > 0 && perfilData.contentType.length > 0) {
                usuarioPerfilFunction.criarRelacaoComPerfil(perfilSnap.after, perfilSnap.after);
            }
        } else {
            console.log("ERROR : ALTERAR RELACAO >> PERFIL >> USUARIOPERFIL : o perfil não está completo !")
        }
    });


exports.removerRelacaoPerfilEUsuarioPerfil = functions.firestore.document('Perfil/{pefilId}').onDelete(
    async (perfilSnap: any) => {
        usuarioPerfilFunction._removerRelacoesDePerfilJaTemRelacaoUsuarioPerfil(perfilSnap.id).then(()=>{
            console.log("perfilUsuario com o perfil " + perfilSnap.id + " foram removido !" ); 
        })
        console.log("ONDELETE >> " + perfilSnap.id);
    });
*/
