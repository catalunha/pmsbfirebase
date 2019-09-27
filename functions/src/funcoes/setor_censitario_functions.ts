import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarSetorCensitarioOnUpdate(uploadSnap: any) {
    const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    const uploadSnapId = uploadSnap.after.id;

    console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
    console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DE SetorCensitario NAS DEMAIS COLLECTIONS")
        //Usuario
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'setorCensitarioID.id', uploadSnapId, { 'setorCensitarioID.nome': uploadSnapAfterData.nome })
        //Produto
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Produto', 'setorCensitarioID.id', uploadSnapId, { 'setorCensitarioID.nome': uploadSnapAfterData.nome })
    
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('SetorCensitarioPainel', 'setorCensitarioID.id', uploadSnapId, { 'setorCensitarioID.nome': uploadSnapAfterData.nome })

    
    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE SetorCensitario")
    }
}


// ON CREATE

export function iniciarOnCreate(setorCensitarioSnap: any) {
    DatabaseReferences.painelRef.get().then((painelSnap: any) => {
        painelSnap.forEach((painel: any) => {
            _criarNovoDocSetorCensitarioPainel(painel, setorCensitarioSnap);
        });
    }).catch((err: any) => {
        console.log('Error getting usuarios-enviarNoticiaTodoUsuarios', err);
    });

}

export function _criarNovoDocSetorCensitarioPainel(painelSnap: any, setorCensitarioSnap: any) {
    const painelData = painelSnap.data();
    const setorCensitarioData = setorCensitarioSnap.data();

    DatabaseReferences.setorCensitarioPainelRef.doc().set({
        painelID: {
            id: painelSnap.id,  
            nome: painelData.nome,
            tipo: painelData.tipo
        },
        setorCensitarioID: {
            id: setorCensitarioSnap.id,
            nome: setorCensitarioData.nome
        }
    }).then(() => {
        console.log("RELACAO CRIADA : SetorCensitario >> SetorCensitarioPainel : " + setorCensitarioData.nome)
    })
}

// ON DELETE

export function iniciarOnDelete(setorCensitarioSnap: any) {
    const painelId = setorCensitarioSnap.id;
    DatabaseReferences.apagarDocDeCollectionEmOutrasCollections('SetorCensitarioPainel', 'setorCensitarioID.id', painelId)
    return 0;
}