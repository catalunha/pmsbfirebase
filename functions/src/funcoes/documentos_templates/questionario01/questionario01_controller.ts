import Questionario01Template from "./questionario01_template";
import DatabaseReferences from "../../../database-references";

export class RelatorioQuestionario01Controller {

    private questionario01Template: Questionario01Template;

    constructor() {
        this.questionario01Template = new Questionario01Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise((resolve: any, reject: any) => {

            DatabaseReferences.eixoRef.doc(relatorioData.document).get().then((data: any) => {
                this.questionario01Template.adicionarIndice(data.data().nome);
            })

            // Pegar a lista de questionarios
            DatabaseReferences.questionarioRef.where("eixo.id", '==', relatorioData.document).orderBy("ordem", "asc").get().then(async (questionariosLista: any) => {
                // Percorrer a lista e adicionar cada um dos questionarios ao relatorio
                questionariosLista.docs.forEach((questionario: any, index_filt: any, array_filt: any) => {
                    this.prencherRelatorio(questionario);
                    if ((index_filt + 1) >= array_filt.length) {
                        let docDefinition = this.questionario01Template.getDocDefinition()
                        console.log("resultado : " + docDefinition)
                        resolve(docDefinition)
                    }
                })

            }).catch((err: any) => {
                console.log('Error getting documents : Questionarios de um eixo ', err)
            })

        })
    }

    private prencherRelatorio(questRef: any) {

        let questData = questRef.data();
        let questId = questRef.id;

        // Pegar todas as perguntas de um questionario

        // return new Promise(async (resolve) => {
        this.questionario01Template.adicionarCabecalhoQuestionario(questData, questId);
        DatabaseReferences.perguntaRef.where("questionario.id", '==', questId).orderBy("ordem", "asc").get().then(async (perguntas: any) => {
            perguntas.docs.forEach(async (pergunta: any, index_filt: any, array_filt: any) => {
                this.questionario01Template.adicionarPergunta(pergunta.data(), pergunta.id)
                // if ((index_filt + 1) >= array_filt.length) {
                //     resolve()
                // }
            })
        })

        // }).catch((err: any) => {
        //     console.log('Error getting documents : Pergunta ', err)
        // })

    }

}

