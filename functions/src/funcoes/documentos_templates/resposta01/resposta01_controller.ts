import Resposta01Template from "./resposta01_template";
import DatabaseReferences from "../../../database-references";

export class Relatorioresposta01Controller {

    private resposta01Template: Resposta01Template;

    constructor() {
        this.resposta01Template = new Resposta01Template("-");
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise((resolve: any, reject: any) => {

            let questionarioRef = DatabaseReferences.questionarioAplicadoRef.doc(relatorioData.document)
            questionarioRef.get().then((questionarioAplicadoData: any) => {
                if (!questionarioAplicadoData.exists) {
                    console.log('No such document! : questionarioAplicadoData');
                    reject()
                } else {
                    this.resposta01Template = new Resposta01Template(questionarioAplicadoData.data().nome);
                    this.resposta01Template.adicionarIndice(questionarioAplicadoData.data().nome);

                    // PEGAR A LISTA DE PERGUNTAS DO QUESTIONARIO APLICADO
                    DatabaseReferences.PerguntaAplicadaRef.where("questionario.id", '==', questionarioAplicadoData.id).orderBy("ordem", "asc").get().then(async (perguntas: any) => {
                        this.prencherRelatorio(resolve, perguntas, questionarioAplicadoData.data(), questionarioAplicadoData.id)
                    }).catch((err: any) => {
                        console.log('Error getting documents : PerguntaAplicada ', err)
                    })
                }

            }).catch((err: any) => {
                console.log('Error getting documents :' + relatorioData.collection, err)
            })
        })
    }

    private prencherRelatorio(resolve: any, perguntas: any, questData: any, questId: any) {
        /**
         * Os elementos devem ser inseridos em ordem
         */

        this.resposta01Template.adicionarCabecalhoQuestionario(questData, questId);

        /**
         * Percorre a lista de pergunta e insere uma de cada vez
         */
        if (perguntas.docs.length > 0) {
            perguntas.docs.forEach(async (pergunta: any, index_filt: any, array_filt: any) => {
                this.adicionarElementoPerguntaContent(pergunta);
                if ((index_filt + 1) >= array_filt.length) {
                    this.resposta01Template.adicionarTabelaAoDocDefinition()
                    let docDefinition = this.resposta01Template.getDocDefinition()
                    resolve(docDefinition)
                }
            })
        }
    }

    private adicionarElementoPerguntaContent(pergunta: any) {

        /**
         * Implementar swich case pra filtrar o tipo da pergunta [perguntaData.tipo.id]
        */
       this.resposta01Template.adicionarPergunta(pergunta.data(), pergunta.id)

    }

}

