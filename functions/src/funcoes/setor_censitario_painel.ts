import * as GoogleApiController from "../google_api_controller/google_api_controller_map"
var FieldValue = require('firebase-admin').firestore.FieldValue;

// ON CREATE

export function iniciarOnUpdate(painelSnap: any) {

    let dataDepois = painelSnap.after.data()
    let dataAntes = painelSnap.before.data()

    if ((dataAntes.painelID.tipo == "booleano" && dataDepois.painelID.tipo != "booleano") || (dataAntes.painelID.tipo != "booleano" && dataDepois.painelID.tipo == "booleano")) {
        console.log("Remover valor")
        painelSnap.after.ref.update({
            "valor": FieldValue.delete()
        })
    } else {
        console.log("no valor")
    }

    return adicionarNovaCelulaTipoSetorCensitarioPainel(dataDepois)
}

export async function adicionarNovaCelulaTipoSetorCensitarioPainel(painelData: any) {

    let painel = painelData.painelID;
    let setorCensitario = painelData.setorCensitarioID;

    let relatorioController = new GoogleApiController.SpreadSheetsApiController("1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA");

    return await relatorioController.getTodoOsDadosTabela().then(async (dadosTablela: any) => {

        let lista = dadosTablela["valueRanges"][0]["valueRange"]["values"];

        // Filtra a coluna onde esta o setor
        let linhaPos: any;
        await relatorioController.filtrarDadosPorPosicao(4, lista, painel.id).then(data => linhaPos = data)
        
        // Filtra a linha onde esta o painel tipo   
        let colunaPos: any;
        await relatorioController.filtrarDadosDeLista(lista[1], setorCensitario.id).then(data => colunaPos = data)

        let colPosTab = await relatorioController.columnToLetter(colunaPos.index + 1)
        let linPosTab = await linhaPos.index + 1

        // let spreadModel = new GoogleApiController.SpreadSheetsBatchUpdateModel(relatorioController.getSpreadSheetID(), relatorioController.getOAuth2Client());

        let valor = ""
        switch (painel.tipo) {
            case "texto":
                valor = painelData.valor;
                break;
            case "numero":
                valor = painelData.valor;
                break;
            case "booleano":
                if (painelData.valor) {
                    valor = '=IMAGE("https://firebasestorage.googleapis.com/v0/b/pmsb-22-to.appspot.com/o/ok.jpeg?alt=media&token=7e520296-c8ba-4d96-9ece-03d58706d815")';
                } else {
                    valor = '=IMAGE("https://firebasestorage.googleapis.com/v0/b/pmsb-22-to.appspot.com/o/x.jpeg?alt=media&token=79c0df4a-d02e-4d84-930f-7cefa7388cda")'
                }
                break;
            case "urlarquivo":
                if (painelData.valor && painelData.valor.length > 0) {
                    valor = '=HIPERLINK("' + painelData.valor + '";"Link do arquivo")';
                }
                break;
            case "urlimagem":
                if (painelData.valor && painelData.valor.length > 0) {
                    valor = '=HIPERLINK("' + painelData.valor + '";IMAGE("' + painelData.valor + '"))';
                }
                break;
            default:
                console.log("adicionarNovaCelulaTipoSetorCensitarioPainel :: Nenhum tipo encontrado")
                break;
        }

        relatorioController.adicionarNovaCelula(await colPosTab , await linPosTab, await valor)
        relatorioController.adicionarNovaCelula("A" , await linPosTab, painelData.produto.nome)
        relatorioController.adicionarNovaCelula("B" , await linPosTab, painelData.eixo.nome)
        relatorioController.adicionarNovaCelula("C" , await linPosTab, painelData.usuarioQVaiResponder.nome)


        // let model = spreadModel.getModel();

        relatorioController.batchUpdateNovasCelulas().then(() => {
            //console.log("FOI - appendNovaCelula")
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err: any) => {
        console.error("inserir nova coluna na tabela : " + err)
    })

}
