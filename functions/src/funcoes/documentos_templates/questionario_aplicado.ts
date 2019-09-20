import TemplateBase from './template_base';

export default class QuestionarioAplicadoTemplate extends TemplateBase {

    constructor() {
        super();
    }


    public adicionarCabecalho(titulo: any, subtitulo: any) {
        this.addContentElement({
            stack: [
                'PMSB-TO-22',
                { text: 'RELATÓRIO DO QUESTIONÁRIO APLICADO', style: 'subheader' },
            ],
            style: 'header',
        });
    }

    public adicicionarQuestionarioID(nomeQuestionario: any) {
        this.addContentElement({
            stack: [
                { text: "Questionario ID: ", style: 'parametros' },
                nomeQuestionario

            ],
            margin: [0, 10],
        });
    }

    public adicionarEixo(nomeEixo: any) {
        this.addContentElement({
            stack: [
                { text: "Eixo : ", style: 'parametros' },
                nomeEixo

            ],
            margin: [0, 10],
        });
    }

    public adicionarPergunta(textoPergunta: any, tipoPergunta: any) {
        this.addContentElement({
            text: '\n_______________________________________________________________________________________________\n',
        })
        this.addContentElement({
            text: ['Tipo : ', { text: tipoPergunta, style: 'parametrost' },],
            margin: [0, 0],
        });
        this.addContentElement({
            text: ['Texto : ', { text: textoPergunta, style: 'parametrost' },],
            margin: [0, 0],
        });
    }

    // public adicionarPerguntaImagem() {
    //     this.addContentElement({

    //     });
    // }

    // public adicionarPerguntaTexto() {
    //     this.addContentElement({

    //     });
    // }


    // public adicionarPerguntaCoordenada() {
    //     this.addContentElement({

    //     });
    // }


    // public adicionarPerguntaNumero() {
    //     this.addContentElement({

    //     });
    // }


    // public adicionarPerguntaEscolhaUnica() {
    //     this.addContentElement({

    //     });
    // }


    // public adicionarPerguntaEscolhaMultipla() {
    //     this.addContentElement({

    //     });
    // }

}