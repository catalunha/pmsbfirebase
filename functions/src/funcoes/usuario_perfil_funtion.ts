import DatabaseReferences from "../database-references";

export function iniciarUpdateCollectionUsuario(uploadSnap: any) {
    const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    const uploadSnapId = uploadSnap.after.id;

    console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
    console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DE USUARIO NAS DEMAIS COLLECTIONS")
        //UsuarioPerfil
        DatabaseReferences.atualizarNomeUsuarioEmCollection('UsuarioPerfil', 'usuarioID.id', uploadSnapId, { 'usuarioID.nome': uploadSnapAfterData.nome })
        //QuestionarioAplicado
        DatabaseReferences.atualizarNomeUsuarioEmCollection('QuestionarioAplicado', 'aplicador.id', uploadSnapId, { 'aplicador.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeUsuarioEmCollection('QuestionarioAplicado', 'criou.id', uploadSnapId, { 'criou.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeUsuarioEmCollection('QuestionarioAplicado', 'editou.id', uploadSnapId, { 'editou.nome': uploadSnapAfterData.nome })
        //Questionario
        DatabaseReferences.atualizarNomeUsuarioEmCollection('Questionario', 'criou.id', uploadSnapId, { 'criou.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeUsuarioEmCollection('Questionario', 'editou.id', uploadSnapId, { 'editou.nome': uploadSnapAfterData.nome })
        //Produto
        DatabaseReferences.atualizarNomeUsuarioEmCollection('Produto', 'usuarioID.id', uploadSnapId, { 'usuarioID.nome': uploadSnapAfterData.nome })
        //Noticias
        DatabaseReferences.atualizarNomeUsuarioEmCollection('Noticia', 'usuarioIDDestino.'+uploadSnapId+'.id', true, { ['usuarioIDDestino.'+uploadSnapId+'.nome']: uploadSnapAfterData.nome })
    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE USUARIO")
    }
}

/**
 *
function atualizarNomeUsuarioEmCollection(collectionNome:any,whereRefId:any ,novaRefId: any, updateJsonData:any) {
    DatabaseReferences.db.collection(collectionNome).where(whereRefId, '==', novaRefId).get().then(async (dadosFiltrado: any) => {
        if (dadosFiltrado.docs.length > 0) {
            dadosFiltrado.docs.forEach(async (dadoFiltrado: any, index_filt: any, array_filt: any) => {
                DatabaseReferences.db.collection(collectionNome).doc(dadoFiltrado.id).update(updateJsonData).then(()=>{
                    console.log("ATUALIZAR NOME COLECTION " + collectionNome  + " >> " + dadoFiltrado.id);
                })
            })
        }
    }).catch((err: any) => {
        console.log('Error getting documents : atualizarNomeUsuarioEmCollection ', err)
    })

}
 */
