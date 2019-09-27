import RelatorioQuestionarioAplicadoTemplate from "./questionario_aplicado_template";
import DatabaseReferences from "../../../database-references";

export class RelatorioQuestionarioAplicadoController {

    private questionarioRelatorio: RelatorioQuestionarioAplicadoTemplate;

    constructor() {
        this.questionarioRelatorio = new RelatorioQuestionarioAplicadoTemplate();
    }

    public gerarDocDefinitionContent(documentData: any, documentId: any) {
        return new Promise(async (resolve: any) => {
            DatabaseReferences.db.collection(documentData.collection).doc(documentData.document).get().then((questionarioAplicadoData: any) => {
                DatabaseReferences.PerguntaAplicadaRef.where("questionario.id", '==', questionarioAplicadoData.id).orderBy("ordem", "asc").get().then(async (perguntas: any) => {
                    this.prencherRelatorio(resolve, perguntas, questionarioAplicadoData.data(), questionarioAplicadoData.id)
                }).catch((err: any) => {
                    console.log('Error getting documents : PerguntaAplicada ', err)
                })
            })
        })
    }

    private prencherRelatorio(resolve: any, perguntas: any, questData: any, questId: any) {
        /**
         * Os elementos devem ser inseridos em ordem
         */
        this.questionarioRelatorio.adicionarCabecalho(questData)
        this.questionarioRelatorio.adicicionarSubCabecalho(questData, questId)

        /**
         * Percorre a lista de pergunta e insere uma de cada vez
         */
        if (perguntas.docs.length > 0) {
            perguntas.docs.forEach(async (pergunta: any, index_filt: any, array_filt: any) => {
                this.adicionarElementoPerguntaContent(pergunta);
                if ((index_filt + 1) >= array_filt.length) {
                    this.questionarioRelatorio.adicionarTabelaAoDocDefinition()
                    resolve(this.questionarioRelatorio)
                }
            })
        }
    }

    private adicionarElementoPerguntaContent(pergunta: any) {
        let perguntaData = pergunta.data()

        /**
         * Implementar swich case pra filtrar o tipo da pergunta [perguntaData.tipo.id]
        */

        switch (perguntaData.tipo.id) {
            case 'texto':
                this.questionarioRelatorio.adicionarPerguntaTexto(perguntaData, pergunta.id)
                break;
            case 'numero':
                this.questionarioRelatorio.adicionarPerguntaNumero(perguntaData, pergunta.id)
                break;
            case 'imagem':
                this.questionarioRelatorio.adicionarPerguntaImagem(perguntaData, pergunta.id)
                break;
            case 'arquivo':
                this.questionarioRelatorio.adicionarPerguntaArquivo(perguntaData, pergunta.id)
                break;
            case 'coordenada':
                this.questionarioRelatorio.adicionarPerguntaCoordenada(perguntaData, pergunta.id)
                break;
            case 'escolhaunica':
                this.questionarioRelatorio.adicionarPerguntaEscolhaUnica(perguntaData, pergunta.id)
                break;
            case 'escolhamultipla':
                this.questionarioRelatorio.adicionarPerguntaEscolhaMultipla(perguntaData, pergunta.id)
                break;
            default:
                break;
        }
    }

}

