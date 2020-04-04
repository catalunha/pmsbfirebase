import DatabaseReferences from "../database-references";
import * as GoogleApiController from "../google_api_controller/google_api_controller_map"


export function iniciarChecklistItemRespostaOnCreate(ChecklistItemResposta: any) {

    const ChecklistItemRespostaData = ChecklistItemResposta.data();
    const ChecklistItem = ChecklistItemResposta.ref.parent.parent;

    return ChecklistItem.get().then(async (ChecklistItemSnap: any) => {
        const ChecklistItemData = ChecklistItemSnap.data();
        return await getTabelaId(ChecklistItemData, ChecklistItemRespostaData);
    });
}


export function iniciarChecklistItemRespostaUpdate(ChecklistItemResposta: any) {

    const ChecklistItemRespostaData = ChecklistItemResposta.after.data();

    // Referncia ao pai do objeto 
    const ChecklistItem = ChecklistItemResposta.after.ref.parent.parent;

    return ChecklistItem.get().then(async (ChecklistItemSnap: any) => {
        const ChecklistItemData = ChecklistItemSnap.data();
        // console.log("DATA: " + data.descricao);

        return await getTabelaId(ChecklistItemData, ChecklistItemRespostaData);
        //const lastSeen = user.last_seen;
    });
}

export async function getTabelaId(ChecklistItemData: any, ChecklistItemRespostaData: any) {
    return await DatabaseReferences.setorCensitarioRef.doc(ChecklistItemRespostaData.setor.id).get().then((snap: any) => {
        let checklistPlanilha = snap.data().checklistPlanilha
        return atualizarPlanilha(ChecklistItemData, ChecklistItemRespostaData, checklistPlanilha);
    });
}


export async function atualizarPlanilha(ChecklistItemData: any, ChecklistItemRespostaData: any, checklistPlanilha: string) {
    console.log(ChecklistItemData);
    console.log(ChecklistItemRespostaData);
    console.log(checklistPlanilha);

    let relatorioController: GoogleApiController.SpreadSheetsApiController = new GoogleApiController.SpreadSheetsApiController(checklistPlanilha);

    if (ChecklistItemRespostaData.atendeTR === "Sim") {

        relatorioController.adicionarNovaCelula("M", ChecklistItemData.linhaPlanilhaItem, "X")
        relatorioController.adicionarNovaCelula("N", ChecklistItemData.linhaPlanilhaItem, "")
        relatorioController.adicionarNovaCelula("O", ChecklistItemData.linhaPlanilhaItem, "")

    }
    if (ChecklistItemRespostaData.atendeTR === "Não") {

        relatorioController.adicionarNovaCelula("M", ChecklistItemData.linhaPlanilhaItem, "")
        relatorioController.adicionarNovaCelula("N", ChecklistItemData.linhaPlanilhaItem, "X")
        relatorioController.adicionarNovaCelula("O", ChecklistItemData.linhaPlanilhaItem, "")

    }
    if (ChecklistItemRespostaData.atendeTR === "Parcialmente") {

        relatorioController.adicionarNovaCelula("M", ChecklistItemData.linhaPlanilhaItem, "")
        relatorioController.adicionarNovaCelula("N", ChecklistItemData.linhaPlanilhaItem, "")
        relatorioController.adicionarNovaCelula("O", ChecklistItemData.linhaPlanilhaItem, "X")
    }
    let valor: string = ChecklistItemRespostaData.setor.checklistPasta !== null ? '=HYPERLINK("' + ChecklistItemRespostaData.setor.checklistPasta + '"; "Pasta") ' : "";
    relatorioController.adicionarNovaCelula("Q", ChecklistItemData.linhaPlanilhaItem, valor)

    valor = ChecklistItemRespostaData.linkDocumento !== null ? '=HYPERLINK("' + ChecklistItemRespostaData.linkDocumento + '"; "Doc") ' : "";
    relatorioController.adicionarNovaCelula("R", ChecklistItemData.linhaPlanilhaItem, valor)

    valor = ChecklistItemRespostaData.comentario !== null ? ChecklistItemRespostaData.comentario : "";
    relatorioController.adicionarNovaCelula("S", ChecklistItemData.linhaPlanilhaItem, valor)

    // Enviar para tabela na nuvem
    relatorioController.batchUpdateNovasCelulas().then(() => {
        console.log("ChecklistItemResposta : Atualizacao realizada com sucesso")
    }).catch((err) => {
        console.log("ChecklistItemResposta : Erro ao atualizar tabela : " + err)
    })
}

