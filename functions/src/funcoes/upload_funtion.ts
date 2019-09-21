import DatabaseReferences from "../database-references";
var FieldValue = require('firebase-admin').firestore.FieldValue;

export async function iniciarAlterarUploadFunction(uploadSnap: any) {
    const snapBeforeData = uploadSnap.before.data();
    const snapAfterData = uploadSnap.after.data();
    if (snapBeforeData.upload == false && snapAfterData.upload == true) {
        selecionarTipoProduto(uploadSnap.after.data(), uploadSnap.after.id, snapBeforeData, snapAfterData);
    }
}

function selecionarTipoProduto(uploadSnapData: any, uploadSnapId: any, snapBeforeData: any, snapAfterData: any) {
    let collection = uploadSnapData.updateCollection.collection;
    if (collection == 'UsuarioPerfil' || collection == 'Usuario') {
        alterarUploadTipoUsuarioUsuarioPerfil(uploadSnapData, uploadSnapId);
    } else if (collection == 'PerguntaAplicada') {
        alterarUploadTipoPerguntaplicada(uploadSnapData, uploadSnapId);
    // } else if (collection == 'Produto') {
    //     let field = uploadSnapData.updateCollection.field;
    //     // Escolha do tipo de produto [ Imagem , Pdf ]
    //     field == "pdf" ? alterarUploadTipoProdutoPdf(uploadSnapData, uploadSnapId) : alterarUploadTipoProdutoArquivo(uploadSnapData, uploadSnapId);
    } else {
        console.log("NENHUM TIPO FOI DETECTADO")
    }
}

// function alterarUploadTipoProdutoPdf(uploadSnapData: any, uploadSnapId: any) {
//     /**
//      * Produto PDF 
//      */

//     let localPath = "pdf.localPath";
//     let url = "pdf.url"

//     // escolher o tipo de objeto json de acordo com o tipo ( rascunho ou editado )
//     let jsonObject = { [localPath]: FieldValue.delete(), [url]: uploadSnapData.url };

//     DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(uploadSnapData.updateCollection.document).update(jsonObject).then(produtoDoc => {
//         console.log("UPLOAD PDF: PRODUTO ATUALIZADO NA COLECAO " + uploadSnapData.updateCollection.collection)
//     }).catch(err => {
//         console.log("UPLOAD PDF: ERRO AO ATUALIZAR PRODUTO NA COLECAO " + uploadSnapData.updateCollection.collection)
//     });
// }

// function alterarUploadTipoProdutoArquivo(uploadSnapData: any, uploadSnapId: any) {
//     let field: string = uploadSnapData.updateCollection.field;
//     let fields = field.split('.');

//     /**
//      * Produto IMAGEM
//      * uploadSnapData.updateCollection.document >> doc id ,  fields[1] >> field dentro da colectio, fields[2] >> id do  arquivo dentro da field 
//      * 
//      */

//     let racunhoLocalPath = fields[0] + "." + fields[1] + ".rascunhoLocalPath"
//     let rascunhoUrl = field
//     let editadoLocalPath = fields[0] + "." + fields[1] + ".editadoLocalPath"
//     let editadoUrl = field

//     // escolher o tipo de objeto json de acordo com o tipo ( rascunho ou editado )
//     let jsonObject: any = fields[2] == 'rascunhoUrl' ? { [racunhoLocalPath]: FieldValue.delete(), [rascunhoUrl]: uploadSnapData.url }
//         : { [editadoLocalPath]: FieldValue.delete(), [editadoUrl]: uploadSnapData.url };

//     DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(uploadSnapData.updateCollection.document).update(jsonObject).then(produtoDoc => {
//         console.log("UPLOAD IMAGEM: PRODUTO ATUALIZADO NA COLECAO " + uploadSnapData.updateCollection.collection)
//     }).catch(err => {
//         console.log("UPLOAD IMAGEM: ERRO AO ATUALIZAR PRODUTO NA COLECAO " + uploadSnapData.updateCollection.collection)
//     });
// }


function alterarUploadTipoUsuarioUsuarioPerfil(uploadSnapData: any, uploadSnapId: any) {
    let field: string = uploadSnapData.updateCollection.field;
    let fields = field.split('.');

    /**
    * Produto
    * uploadSnapData.updateCollection.document >> doc id ,  fields[1] >> field dentro da colectio, fields[2] >> id do uploadDoc
    * 
    */

    let url = field;
    let localPath = fields[0] + ".localPath";

    DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(uploadSnapData.updateCollection.document).update({
        [localPath]: FieldValue.delete(), [url]: uploadSnapData.url
    }).then(produtoDoc => {
        console.log("UPLOAD : [ UsuarioUsuarioPerfil ] ATUALIZADO NA COLECAO " + uploadSnapData.updateCollection.collection)
    }).catch(err => {
        console.log("UPLOAD : ERRO AO ATUALIZAR PRODUTO NA COLECAO " + uploadSnapData.updateCollection.collection)
    });
}


function alterarUploadTipoPerguntaplicada(uploadSnapData: any, uploadSnapId: any) {
    let field: string = uploadSnapData.updateCollection.field;
    let fields = field.split('.');

    /**
    * Produto
    * uploadSnapData.updateCollection.document >> doc id ,  fields[1] >> field dentro da colectio, fields[2] >> id do uploadDoc
    * 
    */

    let url = fields[0] + "." + uploadSnapId + ".url";
    let localPath = fields[0] + "." + uploadSnapId + ".localPath";

    DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(uploadSnapData.updateCollection.document).update({
        [localPath]: FieldValue.delete(), [url]: uploadSnapData.url
    }).then(produtoDoc => {
        console.log("UPLOAD : [ Pergunta Aplicada ] ATUALIZADO NA COLECAO " + uploadSnapData.updateCollection.collection)
    }).catch(err => {
        console.log("UPLOAD : [ Pergunta Aplicada ] ERRO AO ATUALIZAR ARQUIVO NA COLECAO " + uploadSnapData.updateCollection.collection)
    });
}