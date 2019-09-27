import DatabaseReferences from "../database-references";

// ON CREATE

export function iniciarOnCreate(painelSnap: any) {
    DatabaseReferences.setorCensitarioRef.get().then((setorCensitarioSnap: any) => {
        setorCensitarioSnap.forEach((setor: any) => {
            _criarNovoDocSetorCensitarioPainel(painelSnap, setor);
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

/**
 * ON UPDATE
 * ALTERACAO DE DADOS DA RELACAO DE PAINEL COM SETORCENSITARIOPAINEL QUE JA EXISTEM
 */

export function iniciaOnUpdate(painelSnap: any) {
    const painelData = painelSnap.after.data();
    const painelId = painelSnap.after.id;

    DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('SetorCensitarioPainel', 'painelID.id', painelId, {
        "painelID.nome": painelData.nome,
    })
    return 0;
}

export function iniciarOnDelete(painelSnap: any) {
    const painelId = painelSnap.id;
    DatabaseReferences.apagarDocDeCollectionEmOutrasCollections('SetorCensitarioPainel', 'painelID.id', painelId)
    return 0;
}