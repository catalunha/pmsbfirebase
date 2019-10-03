import DatabaseReferences from "../database-references";
import * as GoogleApiController from "../google_api_controller/google_api_controller_map"


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
    return DatabaseReferences.painelRef.get().then((painelSnap: any) => {
        painelSnap.forEach((painel: any) => {
            _criarNovoDocSetorCensitarioPainel(painel, setorCensitarioSnap);
        });
        return adicionarNovoSetorCensitarioNaTabelaPainel(setorCensitarioSnap);
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

export async function adicionarNovoSetorCensitarioNaTabelaPainel(setorCensitarioSnap: any) {

    let relatorioController = new GoogleApiController.SpreadSheetsApiController("1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA");

    return await relatorioController.getDadosDaTabela("1:1").then((dadosTablela: any) => {

        let quantElementos = dadosTablela.values[0].length;

        let spreadModel = new GoogleApiController.SpreadSheetsBatchUpdateModel(relatorioController.getSpreadSheetID(), relatorioController.getOAuth2Client());

        let posicao = relatorioController.columnToLetter(quantElementos + 1) + "1"; // ex: D1
        console.log("posicao >> " + posicao)

        spreadModel.adicionarNovaCelula(posicao, setorCensitarioSnap.data().nome)

        let model = spreadModel.getModel();

        return relatorioController.batchUpdateNovaCelula(model).then(() => {
            console.log("FOI - batchUpdateNovaCelula")
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err: any) => {
        console.error("inserir nova coluna na tabela : " + err)
    })

}


// ON DELETE

export function iniciarOnDelete(setorCensitarioSnap: any) {
    const painelId = setorCensitarioSnap.id;
    DatabaseReferences.apagarDocDeCollectionEmOutrasCollections('SetorCensitarioPainel', 'setorCensitarioID.id', painelId)
    return 0;
}