import * as functions from 'firebase-functions';

/**
 *  UPLOAD
 */

 import * as uploadFuntion from './funcoes/upload_funtion';

 //quando Upload.upload ter seu valor alterado de [false] para [true] alterar os dados de path mostrados em updateCollection.
 exports.uploadFunction = functions.firestore.document('Upload/{uploadId}').onUpdate(uploadFuntion.iniciarAlterarUploadFunction);


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