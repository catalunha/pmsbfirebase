
export default class QuestionarioAplicadoTemplate {

    constructor() {
       
    }

    private docDefinition: any = {
        content: [],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                
            },
            subheader: {
                fontSize: 12
            },
            parametrost: {
              fontSize: 14
            },
            superMargin: {
                margin: [30, 0, 100, 10],
                fontSize: 15
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            parametros: {
                fontSize: 14
            },
        },
    }

    public getDocDefinition() {
        return this.docDefinition
    }

    public addContentElement(contentElement: any) {
        this.docDefinition.content.push(contentElement);
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

    public adicionarPerguntaImagem() {
        this.addContentElement({

        });
    }

    public adicionarPerguntaTexto() {
        this.addContentElement({

        });
    }


    public adicionarPerguntaCoordenada() {
        this.addContentElement({

        });
    }


    public adicionarPerguntaNumero() {
        this.addContentElement({

        });
    }


    public adicionarPerguntaEscolhaUnica() {
        this.addContentElement({

        });
    }


    public adicionarPerguntaEscolhaMultipla() {
        this.addContentElement({

        });
    }

}