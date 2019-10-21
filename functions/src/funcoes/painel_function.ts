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
        let posicaoNome = "D" + (quantElementos + 1);
        let posicaoId = "E" + (quantElementos + 1);

        spreadModel.adicionarNovaCelula(posicaoNome, painelSnap.data().nome)
        spreadModel.adicionarNovaCelula(posicaoId, painelSnap.id)
        spreadModel.adicionarNovaCelula("A" + (quantElementos + 1), painelSnap.data().produto.nome)
        spreadModel.adicionarNovaCelula("B" + (quantElementos + 1), painelSnap.data().eixo.nome)
        spreadModel.adicionarNovaCelula("C" + (quantElementos + 1), painelSnap.data().usuarioQVaiResponder.nome)

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
        }, produto: {
            id: painelSnap.produto.id,
            nome: painelSnap.produto.nome
        }, eixo: {
            id: painelSnap.eixo.id,
            nome: painelSnap.eixo.nome
        }, usuarioQVaiResponder: {
            id: painelSnap.usuarioQVaiResponder.id,
            nome: painelSnap.usuarioQVaiResponder.nome
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


    DatabaseReferences.atualizarDadosDeCollectionEmOutrasCollectionsMerge('SetorCensitarioPainel', 'painelID.id', painelId, {
        painelID: {
            nome: painelData.nome,
            tipo: painelData.tipo
        },
        produto: {
            id: painelData.produto.id,
            nome: painelData.produto.nome
        }, eixo: {
            id: painelData.eixo.id,
            nome: painelData.eixo.nome
        }, usuarioQVaiResponder: {
            id: painelData.usuarioQVaiResponder.id,
            nome: painelData.usuarioQVaiResponder.nome
        }
    })

    return adicionarNovaCelulaTipoSetorCensitarioPainel(painelData, painelId)
}


export async function adicionarNovaCelulaTipoSetorCensitarioPainel(painelData: any, painelID: any) {

    let relatorioController = new GoogleApiController.SpreadSheetsApiController("1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA");

    return await relatorioController.getTodoOsDadosTabela().then(async (dadosTablela: any) => {

        let lista = dadosTablela["valueRanges"][0]["valueRange"]["values"];

        // Filtra a coluna onde esta o setor
        let linhaPos: any;
        await relatorioController.filtrarDadosPorPosicao(4, lista, painelID).then(data => linhaPos = data)

        let colPosTab = await relatorioController.columnToLetter(4)
        let linPosTab = await linhaPos.index + 1

        let spreadModel = new GoogleApiController.SpreadSheetsBatchUpdateModel(relatorioController.getSpreadSheetID(), relatorioController.getOAuth2Client());

        let valor = painelData.nome
        spreadModel.adicionarNovaCelula(await colPosTab + await linPosTab, await valor)
        // spreadModel.adicionarNovaCelula(await 1 + await linPosTab, await painelData.produto.nome)
        // spreadModel.adicionarNovaCelula(await 2 + await linPosTab, await painelData.eixo.nome)
        // spreadModel.adicionarNovaCelula(await 3 + await linPosTab, await painelData.usuarioQVaiResponder.nome)
        let model = spreadModel.getModel();

        relatorioController.batchUpdateNovaCelula(model).then(() => {
            console.log("FOI - appendNovaCelula")
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err: any) => {
        console.error("inserir nova coluna na tabela : " + err)
    })

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

