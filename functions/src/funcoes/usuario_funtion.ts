import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarUpdateCollectionUsuario(uploadSnap: any) {
    const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    const uploadSnapId = uploadSnap.after.id;

    console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
    console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DE USUARIO NAS DEMAIS COLLECTIONS")
        //UsuarioPerfil
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('UsuarioPerfil', 'usuarioID.id', uploadSnapId, { 'usuarioID.nome': uploadSnapAfterData.nome })
        //QuestionarioAplicado
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'aplicador.id', uploadSnapId, { 'aplicador.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'criou.id', uploadSnapId, { 'criou.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'editou.id', uploadSnapId, { 'editou.nome': uploadSnapAfterData.nome })
        //Questionario
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Questionario', 'criou.id', uploadSnapId, { 'criou.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Questionario', 'editou.id', uploadSnapId, { 'editou.nome': uploadSnapAfterData.nome })
        //Produto
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Produto', 'usuarioID.id', uploadSnapId, { 'usuarioID.nome': uploadSnapAfterData.nome })
        //Noticias
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Noticia', 'usuarioIDDestino.'+uploadSnapId+'.id', true, { ['usuarioIDDestino.'+uploadSnapId+'.nome']: uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Noticia', 'usuarioIDEditor.id', uploadSnapId, { 'usuarioIDEditor.nome': uploadSnapAfterData.nome })

    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE USUARIO")
    }
}


// ON CREATE

export function iniciarCreateCollectionUsuario(uploadSnap: any) {
    DatabaseReferences.pefilRef.get().then((snapPerfil: any) => {
        snapPerfil.forEach((perfil: any) => {
            _criarNovoDocUsuarioPerfil(perfil, uploadSnap);
        });
    }).catch((err: any) => {
        console.log('Error getting usuarios-enviarNoticiaTodoUsuarios', err);
    });

}

export function _criarNovoDocUsuarioPerfil(perfilRef: any, usuarioRef: any) {
    const perfilData = perfilRef.data();
    const usuarioData = usuarioRef.data();

    DatabaseReferences.usuarioPerfilRef.doc().set({
        perfilID: {
            contentType: perfilData.contentType,
            id: perfilRef.id,
            nome: perfilData.nome,
        },
        usuarioID: {
            id: usuarioRef.id,
            nome: usuarioData.nome
        }
    }).then(() => {
        console.log("RELACAO CRIADA : PERFIL >> USUARIOPERFIL : " + usuarioData.nome)
    })
}


// ON DELETE




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
