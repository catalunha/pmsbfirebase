import Controle02Template from "./controle02_template";
import DatabaseReferences from "../../../database-references";

export class RelatorioControle02Controller {

    public controle02Template: Controle02Template;

    constructor() {
        this.controle02Template = new Controle02Template("");
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise((resolve: any, reject: any) => {

            let controleRef = DatabaseReferences.controleTarefaRef.doc(relatorioData.document)

            controleRef.get().then((controleTarefa: any) => {
                if (!controleTarefa.exists) {
                    console.log('No such document! : ControleTarefa');
                    reject()
                } else {
                    this.controle02Template = new Controle02Template(controleTarefa.data().nome);
                    this.controle02Template.adicionarIndice(controleTarefa.data().nome)
                    // PEGAR A LISTA DE ControleAcao Do ControleTarefa 
                    DatabaseReferences.controleAcaoRef.where("tarefa.id", '==', controleTarefa.id).orderBy("ordem", "asc").get().then(async (listaControleAcao: any) => {
                        this.prencherRelatorio(resolve, listaControleAcao, controleTarefa.data(), controleTarefa.id)
                    }).catch((err: any) => {
                        console.log('Error getting documents : PerguntaAplicada ', err)
                    })
                }

            }).catch((err: any) => {
                console.log('Error getting documents :' + relatorioData.collection, err)
            })
        })

    }

    private prencherRelatorio(resolve: any, listaControleAcao: any, questData: any, questId: any) {

        this.controle02Template.adicionarCabecalhoRelatorio(questData, questId);

        // Percorre a lista de acoes e inserir uma de cada vez
        if (listaControleAcao.docs.length > 0) {
            listaControleAcao.docs.forEach(async (acao: any, index_filt: any, array_filt: any) => {
                this.controle02Template.adicionarAcao(acao.data(), acao.id);
                if ((index_filt + 1) >= array_filt.length) {
                    let docDefinition = this.controle02Template.getDocDefinition()
                    resolve(docDefinition)
                }
            })
        }

    }
}

