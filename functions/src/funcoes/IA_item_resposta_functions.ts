import DatabaseReferences from "../database-references";
import * as GoogleApiController from "../google_api_controller/google_api_controller_map"

// export interface IaRespostaItem {
//     atendeTR:   string;
//     descricao:  string;
//     modificado: string;
//     setor:      IdModel;
//     usuarioID:  IdModel;
// }

// export interface IdModel {
//     id:   string;
//     nome: string;
// }


// ON UPDATE



export function iniciarIaItemRespostaOnCreate(uploadSnap: any) {

    const uploadSnapAfterData = uploadSnap.data();
    const parent = uploadSnap.ref.parent.parent;

    return parent.get().then(async (parentSnap: any) => {
        const data = parentSnap.data();
        return await getTabelaId(data, uploadSnapAfterData, uploadSnapAfterData.setor.id);
    });
}


export function iniciarIaItemRespostaUpdate(uploadSnap: any) {

    // const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    // const uploadSnapId = uploadSnap.after.id;
    // let tabelaId: string = "1JqBt6TqHiYMrUmsXkdKJU1YDLG_z9eTBrd8IWM5erak";

    // Referncia ao pai do objeto 
    const parent = uploadSnap.after.ref.parent.parent;

    return parent.get().then(async (parentSnap: any) => {
        const data = parentSnap.data();
        // console.log("DATA: " + data.descricao);

        return await getTabelaId(data, uploadSnapAfterData, uploadSnapAfterData.setor.id);
        //const lastSeen = user.last_seen;
    });
}

export async function getTabelaId(IaAItemData: any, IaItemRespostaData: any, setorCensitarioID: string) {
    return await DatabaseReferences.setorCensitarioRef.doc(setorCensitarioID).get().then((snap: any) => {
        let tabelaId = snap.data().tabelaId
        return atualizarPlanilha(IaAItemData, IaItemRespostaData, tabelaId);
    });
}


export async function atualizarPlanilha(IaAItemData: any, IaItemRespostaData: any, tabelaId: string) {

    let relatorioController: GoogleApiController.SpreadSheetsApiController = new GoogleApiController.SpreadSheetsApiController(tabelaId);
    let valorX: string = IaItemRespostaData.documento != null ? '=HYPERLINK("' + IaItemRespostaData.documento + '"; "X") ' : "X";

    if(IaItemRespostaData.descricao != null){
        relatorioController.adicionarNovaCelula("W", IaAItemData.linha, IaItemRespostaData.descricao)
    }

    if (IaItemRespostaData.atendeTR == "Sim") {

        relatorioController.adicionarNovaCelula("L", IaAItemData.linha, valorX)
        relatorioController.adicionarNovaCelula("M", IaAItemData.linha, "")
        relatorioController.adicionarNovaCelula("N", IaAItemData.linha, "")

    } if (IaItemRespostaData.atendeTR == "Não") {

        relatorioController.adicionarNovaCelula("L", IaAItemData.linha, "")
        relatorioController.adicionarNovaCelula("M", IaAItemData.linha, valorX)
        relatorioController.adicionarNovaCelula("N", IaAItemData.linha, "")

    } if (IaItemRespostaData.atendeTR == "Parcialmente") {

        relatorioController.adicionarNovaCelula("L", IaAItemData.linha, "")
        relatorioController.adicionarNovaCelula("M", IaAItemData.linha, "")
        relatorioController.adicionarNovaCelula("N", IaAItemData.linha, valorX)
    }

    // Enviar para tabela na nuvem
    relatorioController.batchUpdateNovasCelulas().then(() => {
        console.log("Setor censitario : Atualizacao realizada com sucesso")
    }).catch((err) => {
        console.log("Setor censitario : Erro ao atualizar tabela : " + err)
    })
}

