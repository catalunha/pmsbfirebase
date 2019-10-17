import { Timestamp } from "@google-cloud/firestore";
import * as moment from "moment";

export default class RelatorioQuestionarioAplicadoTemplate {

    public nomeQuestionario:any;

    constructor(nomeQuestionario:any) {
        this.nomeQuestionario = nomeQuestionario;
    }

    private tabela: any = {
        style: 'tableExample',
        table: {
            headerRows: 1,
            body: [
                [{ text: 'Pergunta', style: 'T1' }, { text: 'Respondida', style: 'T1' }],
            ]
        },
        layout: {
            hLineWidth: function (i: any, node: any) {
                return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i: any, node: any) {
                return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i: any, node: any) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            paddingRight: function (i: any, node: any) {
                return (i === node.table.widths.length - 1) ? 10 : 10;
            }
        }
    }

    private docDefinition: any = {
        content: [],
        footer: (currentPage:any, pageCount:any)=>{ return { text: this.nomeQuestionario + " - " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin: [0, 0, 40, 50], color: "gray" } },
        header: function (currentPage:any, pageCount:any, pageSize:any) {
            // you can apply any logic and return any valid pdfmake element
            return [
                { text: 'Relatorio de questionario aplicado', alignment: 'right', margin: [0, 25, 40, 10], color: "gray" },
                { canvas: [{ type: 'rect', x: 10, y: 32, w: pageSize.width - 10, h: 60 }] }
            ]
        },
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                alignment: 'center',
            },
            subheader: {
                fontSize: 13
            },
            parametrost: {
                fontSize: 16,
                margin: [0, 0]
            },
            A1: {
                fontSize: 18,
                margin: [0, 5]
            },
            A2: {
                fontSize: 16,
                margin: [0, 5]
            },
            A3: {
                fontSize: 14,
                margin: [0, 5]
            },
            T1: {
                fontSize: 13,
                alignment: 'center',
                bold: true,
            },
            superMargin: {
                margin: [30, 0, 100, 10],
                fontSize: 15
            },
            margin: {
                margin: [0, 10, 0, 0],
            }
        },
    }

    private addContentElement(contentElement: any) {
        this.docDefinition.content.push(contentElement);
    }

    public getDocDefinition() {
        return this.docDefinition
    }

    /**
  *  ESTRUTURA DA TABELA 
  */

    private addTableRow(pergunta: any) {
        let per_respo: any = "";
        if (pergunta['foiRespondida']) {
            per_respo = "Foi respondida"
        } else {
            per_respo = "Nao foi respondida"
        }
        this.tabela.table.body.push([`${pergunta['ordem']} - ${pergunta['titulo']}`, `${per_respo} `])
    }

    public adicionarTabelaAoDocDefinition() {
        this.addContentElement({ text: 'Resumo:', margin: [0, 10, 0, 5] })
        this.addContentElement(this.tabela)
    }

    /**
  *  ESTRUTURA DO CABECALHO DO DOCUMENTO 
  */

    public adicionarCabecalho(questionarioData: any) {
        this.addContentElement({
            stack: [
                { text: questionarioData.nome, style: 'header' },
                { text: '___________________________________________________', style: 'header' },
            ],
            alignment: 'center',
            margin: [0, 20],
        });
    }

    public adicicionarSubCabecalho(questionarioData: any, questionarioId: any) {
        this.addContentElement({
            stack: [
                { text: '', style: 'parametrost' },

            ],
            margin: [0, 5],
        },
        );

        this.addContentElement({
            stack: [
                { text: 'Referência: ' + questionarioData.referencia, style: 'parametrost' },
                { text: '', style: 'margin' },
                { text: 'Alguns dados importantes sobre este questionário.', style: 'parametrost' },
            ],
        })
        let timestamp = (questionarioData.aplicado as Timestamp).toDate()
        timestamp.setHours(timestamp.getHours() - 3);
        let horario = timestamp.toLocaleTimeString();
        let data = moment(timestamp.toLocaleDateString(), "YYYY-MM-DD").utc().format("DD-MM-YYYY").toString();
        this.addContentElement({
            ol: [

                {
                    ul: [
                        {
                            text: [
                                'Eixo: ' + questionarioData.eixo.nome,
                            ], style: "subheader"
                        },
                        {
                            text: [
                                'Setor: ' + questionarioData.setorCensitarioID.nome,
                            ], style: "subheader"
                        },
                        {
                            text: [
                                'Aplicador: ' + questionarioData.aplicador.nome,
                            ], style: "subheader"
                        },
                        {
                            text: [
                                'Aplicado: ' + data + " " + horario,
                            ], style: "subheader"
                        },
                        {
                            text: [
                                'id: ' + questionarioId,
                            ], style: "subheader"
                        }

                    ]

                }
            ],
            margin: [0, 10],
        })
    }

    /**
     *  ESTRUTURA DA PERGUNTA 
     */

    private addCabecalhoPergunta(pergunta: any) {
        this.addContentElement({
            stack: [
                { text: `Pergunta ${pergunta['ordem']} - ${pergunta['titulo']}`, style: 'A1' },
                '_______________________________________________________________________________________________'
            ],
        });

        this.addContentElement({
            stack: [
                { text: `${pergunta['textoMarkdown']}`, style: 'A2' },
                { text: 'Resposta tipo: ' + pergunta['tipo']['nome'], style: 'A3' },
            ],

        });
    }

    private addSubCabecalhoPergunta(pergunta: any, perguntaId: any) {
        this.addContentElement({ text: 'Outras informações importantes:', style: 'A3' })

        let temPendencias = pergunta['temPendencias'] ? "Tem pendência" : "Não tem pendência";
        let foiRespondida = pergunta['foiRespondida'] ? "Foi respondida" : "Não foi respondida";
        let temRespostaValida = pergunta['temRespostaValida'] ? "Tem resposta válida" : "Não tem resposta válida";

        this.addContentElement({
            ol: [

                {
                    ul: [
                        {
                            text: [
                                'Observação: ' + pergunta['observacao'],
                            ], style: "subheader"
                        },
                        {
                            text: [
                                foiRespondida,
                            ], style: "subheader"
                        },
                        {
                            text: [
                                temRespostaValida
                            ], style: "subheader"
                        },
                        {
                            text: [
                                temPendencias,
                            ], style: "subheader"
                        },
                        {
                            text: [
                                'Id: ' + perguntaId,
                            ], style: "subheader"
                        }

                    ]

                }
            ],
            margin: [0, 10],
        });
    }

    // TEXTO ------------------------------------------------------------------------------------------------

    public adicionarPerguntaTexto(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta['pergunta.texto'] != null && Object.entries(pergunta.arquivo).length > 0) {
            this.addContentElement({ text: pergunta['pergunta.texto'], style: 'A3' })
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)

    }

    // NUMERO ------------------------------------------------------------------------------------------------

    public adicionarPerguntaNumero(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta['pergunta.texto'] != null && Object.entries(pergunta.arquivo).length > 0) {
            this.addContentElement({ text: pergunta['pergunta.texto'], style: 'A3' })
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)

    }

    // IMAGEM ------------------------------------------------------------------------------------------------

    public adicionarPerguntaImagem(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta.arquivo != null && Object.entries(pergunta.arquivo).length > 0) {
            let contador = 1;
            for (var item in pergunta.arquivo) {
                this.addContentElement({ text: "Imagem " + contador + ' . Click para visualizar.', link: pergunta.arquivo[item]['url'], decoration: 'underline', color: "blue" })
                contador++;
            }
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)

    }

    // ARQUIVO ------------------------------------------------------------------------------------------------

    public adicionarPerguntaArquivo(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta.arquivo != null && Object.entries(pergunta.arquivo).length > 0) {
            let contador = 1;
            for (var item in pergunta.arquivo) {
                this.addContentElement({ text: "Arquivo " + contador + ' . Click para visualizar.', link: pergunta.arquivo[item]['url'], decoration: 'underline', color: "blue" })
                contador++;
            }
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)

    }

    // COORDENADA ------------------------------------------------------------------------------------------------

    public adicionarPerguntaCoordenada(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta.coordenada != null && pergunta.coordenada.length > 0) {
            for (var item in pergunta.coordenada) {
                this.addContentElement({ text: `(${pergunta.coordenada[item]["latitude"]},${pergunta.coordenada[item]["longitude"]})`, style: 'A3' })
            }
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)

    }

    // ESCOLHA UNICA ------------------------------------------------------------------------------------------------

    public adicionarPerguntaEscolhaUnica(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta.escolhas != null && Object.entries(pergunta.escolhas).length > 0) {

            Object.entries(pergunta.escolhas).sort((a: any, b: any) => { return a[1].ordem - b[1].ordem }).forEach((value: any) => {
                if (value[1].marcada) {
                    this.addContentElement({ text: ` [ x ] ${value[1].texto}`, style: 'A3' })
                } else {
                    this.addContentElement({ text: ` [    ] ${value[1].texto}`, style: 'A3' })
                }
            })

            for (var item in pergunta.coordenada) {
                this.addContentElement({ text: `(${pergunta.coordenada[item]["latitude"]},${pergunta.coordenada[item]["longitude"]})`, style: 'A3' })
            }
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)

    }

    // ESCOLHA MULTIPLA ------------------------------------------------------------------------------------------------
    public adicionarPerguntaEscolhaMultipla(pergunta: any, perguntaId: any) {

        this.addCabecalhoPergunta(pergunta)

        if (pergunta.escolhas != null && Object.entries(pergunta.escolhas).length > 0) {

            Object.entries(pergunta.escolhas).sort((a: any, b: any) => { return a[1].ordem - b[1].ordem }).forEach((value: any) => {
                if (value[1].marcada) {
                    this.addContentElement({ text: ` [ x ] ${value[1].texto}`, style: 'A3' })
                } else {
                    this.addContentElement({ text: ` [    ] ${value[1].texto}`, style: 'A3' })
                }
            })

            for (var item in pergunta.coordenada) {
                this.addContentElement({ text: `(${pergunta.coordenada[item]["latitude"]},${pergunta.coordenada[item]["longitude"]})`, style: 'A3' })
            }
        } else {
            this.addContentElement({ text: 'Nada informado', style: 'A3' })
        }

        this.addSubCabecalhoPergunta(pergunta, perguntaId)
        this.addTableRow(pergunta)
    }

}