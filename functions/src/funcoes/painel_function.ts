import DatabaseReferences from "../database-references";
import * as GoogleApiController from "../google_api_controller/google_api_controller_map"

// ON CREATE

export function iniciarOnCreate(painelSnap: any) {

    return DatabaseReferences.setorCensitarioRef.get().then(async (setorCensitarioSnap: any) => {
        setorCensitarioSnap.forEach((setor: any) => {
            _criarNovoDocSetorCensitarioPainel(painelSnap, setor);
        });
        return adicionarNovoTipoPainelNaTabela(painelSnap)
    }).catch((err: any) => {
        console.log('Error getting usuarios-enviarNoticiaTodoUsuarios', err);
    });
}

export async function adicionarNovoTipoPainelNaTabela(painelSnap: any) {

    let relatorioController = new GoogleApiController.SpreadSheetsApiController("1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA");

    return await relatorioController.getDadosDaTabela("A:A").then((dadosTablela: any) => {

        let spreadModel = new GoogleApiController.SpreadSheetsBatchUpdateModel(relatorioController.getSpreadSheetID(), relatorioController.getOAuth2Client());

        let quantElementos = dadosTablela.values.length;
        let posicaoNome = "A" + (quantElementos + 1);
        let posicaoId = "B" + (quantElementos + 1);

        spreadModel.adicionarNovaCelula(posicaoNome, painelSnap.data().nome)
        spreadModel.adicionarNovaCelula(posicaoId, painelSnap.id)

        let model = spreadModel.getModel();

        console.log(model)

        relatorioController.batchUpdateNovaCelula(model).then(() => {
            console.log("FOI - appendNovaCelula")
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err: any) => {
        console.error("inserir nova coluna na tabela : " + err)
    })

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


/**
 * ON DELETE
 * REMOVENDO DADOS DA RELACAO DE PAINEL COM SETORCENSITARIOPAINEL
 */

export function iniciarOnDelete(painelSnap: any) {
    const painelId = painelSnap.id;
    DatabaseReferences.apagarDocDeCollectionEmOutrasCollections('SetorCensitarioPainel', 'painelID.id', painelId)
    return 0;
}

