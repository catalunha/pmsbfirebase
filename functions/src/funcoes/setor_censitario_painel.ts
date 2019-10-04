// import DatabaseReferences from "../database-references";
import * as GoogleApiController from "../google_api_controller/google_api_controller_map"

// ON CREATE

export function iniciarOnUpdate(painelSnap: any) {

    let data = painelSnap.after.data()
    return adicionarNovaCelulaTipoSetorCensitarioPainel(data)
}

export async function adicionarNovaCelulaTipoSetorCensitarioPainel(painelData: any) {

    let painel = painelData.painelID;
    let setorCensitario = painelData.setorCensitarioID;


    let relatorioController = new GoogleApiController.SpreadSheetsApiController("1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA");

    return await relatorioController.getTodoOsDadosTabela().then(async (dadosTablela: any) => {

        let lista = dadosTablela["valueRanges"][0]["valueRange"]["values"];
        ///FIXME: erro na filtragem dos dados, esta retornando nada 
        // Filtra a coluna onde esta o setor
        let colunaPos: any;
        await lista.forEach((x: any, index: any) => {
            if (x[2] == setorCensitario.id) {
                return colunaPos = index;
            }
        });
        console.log(colunaPos)
        // Filtra a linha onde esta o painel tipo

        let linhaPos: any;
        await lista[colunaPos].forEach((x: any, index: any) => {
            if (x == setorCensitario.id) {
                return linhaPos = index;
            }
        });
        console.log(linhaPos)

        let colPosTab = await relatorioController.columnToLetter(colunaPos + 1)
        let linPosTab = await linhaPos + 1

        let spreadModel = new GoogleApiController.SpreadSheetsBatchUpdateModel(relatorioController.getSpreadSheetID(), relatorioController.getOAuth2Client());

        let valor;

        switch (painel.tipo) {
            case "texto" || "numero" || "booleano":
                valor = painelData.valor;
                break;
            case "urlarquivo":
                valor = '=HIPERLINK(/"' + painelData.valor + '";"Link do arquivo")';
                break;
            case "urlimagem":
                valor = '=HIPERLINK(/"' + painelData.valor + '";IMAGE(/"' + painelData.valor + '/"))';
                break;
            default:
                break;
        }

        spreadModel.adicionarNovaCelula(colPosTab + linPosTab, valor)

        let model = spreadModel.getModel();

        relatorioController.appendNovaCelula(model).then(() => {
            console.log("FOI - appendNovaCelula")
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err: any) => {
        console.error("inserir nova coluna na tabela : " + err)
    })

}
