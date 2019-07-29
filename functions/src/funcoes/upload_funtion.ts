import DatabaseReferences from "../database-references";
var FieldValue = require('firebase-admin').firestore.FieldValue;

export async function iniciarAlterarUploadFunction(uploadSnap: any) {
    const snapBeforeData = uploadSnap.before.data();
    const snapAfterData = uploadSnap.after.data();
    if (snapBeforeData.upload == false && snapAfterData.upload == true) {
        selecionarTipoProduto(uploadSnap.after.data(), uploadSnap.after.id);
    }
}

function selecionarTipoProduto(uploadSnapData: any, uploadSnapId: any) {
    let collection = uploadSnapData.updateCollection.collection;
    if(collection == 'UsuarioPerfil' ||  collection == 'Usuario'){
        alterarUploadTipoUsuarioUsuarioPerfil(uploadSnapData, uploadSnapId);
    }else if(collection == 'Produto' ){
        alterarUploadTipoProduto(uploadSnapData, uploadSnapId);
    }else{
        console.log("NENHUM TIPO FOI DETECTADO")
    }

}

function alterarUploadTipoProduto(uploadSnapData: any, uploadSnapId: any) {
    let aux: string = uploadSnapData.updateCollection.field;
    let fields = aux.split('.');

    /**
     * Produto
     * fields[0] >> doc id ,  fields[1] >> field dentro da colectio, fields[2] >> id do  arquivo dentro da field 
     * 
     */

    let racunhoLocalPath = fields[1] + "." + fields[2] + ".rascunhoLocalPath"
    let rascunhoUrl = fields[1] + "." + fields[2] + ".rascunhoUrl"
    let editadoLocalPath = fields[1] + "." + fields[2] + ".editadoLocalPath"
    let editadoUrl = fields[1] + "." + fields[2] + ".editadoUrl"
    // escolher o tipo de objeto json de acordo com o tipo ( rascunho ou editado )
    let jsonObject: any = fields[3] == 'rascunhoUrl' ? { [racunhoLocalPath]: FieldValue.delete(), [rascunhoUrl]: uploadSnapData.url }
        : { [editadoLocalPath]: FieldValue.delete(), [editadoUrl]: uploadSnapData.url };

    DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(fields[0]).update(jsonObject).then(produtoDoc => {
        console.log("UPLOAD : PRODUTO ATUALIZADO NA COLECAO " + uploadSnapData.updateCollection.collection)
    }).catch(err => {
        console.log("UPLOAD : ERRO AO ATUALIZAR PRODUTO NA COLECAO " + uploadSnapData.updateCollection.collection)
    });
}


function alterarUploadTipoUsuarioUsuarioPerfil(uploadSnapData: any, uploadSnapId: any) {
    let aux: string = uploadSnapData.updateCollection.field;
    let fields = aux.split('.');
    /**
    * Produto
    * fields[0] >> doc id ,  fields[1] >> field dentro da colectio, fields[2] >> id do uploadDoc
    * 
    */

    let url = fields[1] + ".url";
    let localPath = fields[1] + ".localPath";

    DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(fields[0]).update({
        [localPath]: FieldValue.delete(), [url]: uploadSnapData.url
    }).then(produtoDoc => {
        console.log("UPLOAD : PRODUTO ATUALIZADO NA COLECAO " + uploadSnapData.updateCollection.collection)
    }).catch(err => {
        console.log("UPLOAD : ERRO AO ATUALIZAR PRODUTO NA COLECAO " + uploadSnapData.updateCollection.collection)
    });
}