import Questionario02Template from "./questionario02_template";
import DatabaseReferences from "../../../database-references";

export class RelatorioQuestionario02Controller {

    private questionario02Template: Questionario02Template;

    constructor() {
        this.questionario02Template = new Questionario02Template("-");
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise((resolve: any, reject: any) => {

            // DatabaseReferences.eixoRef.doc(relatorioData.document).get().then((data: any) => {
            // })

            let questionarioRef = DatabaseReferences.questionarioRef.doc(relatorioData.document)
            questionarioRef.get().then((questionarioAplicadoData: any) => {
                if (!questionarioAplicadoData.exists) {
                    console.log('No such document! : questionarioAplicadoData');
                    reject()
                } else {
                    this.questionario02Template = new Questionario02Template(questionarioAplicadoData.data().nome);
                    this.questionario02Template.adicionarIndice(questionarioAplicadoData.data().nome);

                    // PEGAR A LISTA DE PERGUNTAS DO QUESTIONARIO APLICADO
                    DatabaseReferences.perguntaRef.where("questionario.id", '==', questionarioAplicadoData.id).orderBy("ordem", "asc").get().then(async (perguntas: any) => {
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

        this.questionario02Template.adicionarCabecalhoQuestionario(questData, questId);

        /**
         * Percorre a lista de pergunta e insere uma de cada vez
         */
        if (perguntas.docs.length > 0) {
            perguntas.docs.forEach(async (pergunta: any, index_filt: any, array_filt: any) => {
                this.adicionarElementoPerguntaContent(pergunta);
                if ((index_filt + 1) >= array_filt.length) {
                    let docDefinition = this.questionario02Template.getDocDefinition()
                    resolve(docDefinition)
                }
            })
        }
    }

    private adicionarElementoPerguntaContent(pergunta: any) {

        /**
         * Implementar swich case pra filtrar o tipo da pergunta [perguntaData.tipo.id]
        */
       this.questionario02Template.adicionarPergunta(pergunta.data(), pergunta.id)

    }

}

