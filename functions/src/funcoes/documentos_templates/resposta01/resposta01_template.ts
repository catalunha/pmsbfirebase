import { Timestamp } from "@google-cloud/firestore";
import moment = require("moment");
import axios from 'axios';


export default class Resposta01Template {

    public nomeQuest: any;

    constructor(nomeQuest: any) {
        this.nomeQuest = nomeQuest
    }

    public tabela: any = {
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
                return (i === node.table.widths.length - 1) ? 15 : 15;
            }
        }
    }

    public docDefinition: any = {
        content: [],
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                alignment: 'center',
            },
            subheader: {
                fontSize: 14,
                bold: true,
            },
        },
        footer: (currentPage: any, pageCount: any) => { return { text: this.nomeQuest + " - " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin: [10, 0, 35, 0], color: "gray" } },
    }

    public addContentElement(contentElement: any) {
        this.docDefinition.content.push(contentElement);
    }

    public getDocDefinition() {
        return this.docDefinition
    }


    //ESTRUTURA DA TABELA 


    private addTableRow(pergunta: any) {
        let per_respo: any = "";
        if (pergunta.foiRespondida) {
            per_respo = "Foi respondida"
        } else {
            per_respo = "Nao foi respondida"
        }
        this.tabela.table.body.push([`${pergunta['ordem']} - ${pergunta['titulo']}`, `${per_respo} `])
    }

    public adicionarTabelaAoDocDefinition() {
        this.addContentElement({ text: '\n\n_______________________________________________________________________________________________\n\n', bold: true })
        this.addContentElement({ text: 'Resumo:\n', margin: [0, 10, 0, 5], fontSize: 14, bold: true })
        this.addContentElement(this.tabela)
    }

    // ----------------------------------------------------

    public adicionarIndice(nome: any) {
        this.addContentElement({
            toc: {
                title: { text: 'RELATÓRIO QUESTIONÁRIO APLICADO\n' + nome, style: 'header' },
                margin: [0, 150, 0, 0],
                numberStyle: { bold: true },
            },
        })
        this.addContentElement({ text: '\n\n_______________________________________________________________________________________________\n\n', bold: true })
    }

    public async adicionarCabecalhoQuestionario(questData: any, questId: any) {

        this.addContentElement({
            text: '\nQuestionário ' + questData.ordem + ' - ' + questData.nome,
            style: 'header',
            tocItem: true,
            tocStyle: { bold: true },
            tocMargin: [0, 30, 0, 0],
            tocNumberStyle: { bold: true },
        })

        this.addContentElement(
            {
                stack: [
                    { text: 'Alguns dados importantes sobre este questionário.', style: 'subheader' },
                ],
                alignment: 'left',
                margin: [0, 20],
            })

        let timestamp = (questData.aplicado as Timestamp).toDate()
        timestamp.setHours(timestamp.getHours() - 3);
        let horario = timestamp.toLocaleTimeString();
        let data = moment(timestamp.toLocaleDateString(), "YYYY-MM-DD").utc().format("DD-MM-YYYY").toString();

        this.addContentElement({
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: 'Uso do sistema: ', style: 'tableHeader', bold: true, color: "gray", fontSize: 9 }, { text: 'Id: ' + questId, color: "gray", fontSize: 9 }],
                    [{ text: 'Eixo:', style: 'tableHeader', bold: true }, { text: questData.eixo.nome, style: 'tableHeader' }],
                    [{ text: 'Setor:', style: 'tableHeader', bold: true }, { text: questData.setorCensitarioID.nome, style: 'tableHeader' }],
                    [{ text: 'Aplicador:', style: 'tableHeader', bold: true }, { text: questData.aplicador.nome, style: 'tableHeader' }],
                    [{ text: 'Aplicado:', style: 'tableHeader', bold: true }, { text: data + " " + horario, style: 'tableHeader' }],
                ]
            },
            layout: 'noBorders'
        })
        
        this.addContentElement({
            stack: [
                { text: 'Lista que perguntas desse questionário:', style: 'subheader' },
            ],
            alignment: 'left',
            margin: [0, 18],
        })

        try {
            let result = await axios.get('https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg', {
                responseType: 'arraybuffer'
            })
            let image = new Buffer(result.data, 'binary').toString('base64');

            let finalImage = `data:image/jpeg;base64,${image}`

            let comp = {
                image: finalImage,
                width: 150,
                height: 150
            };

            this.addContentElement(comp)

            console.log("base64: " + finalImage);
            // console.log("RequestAnswer: " + result.data)
        } catch (err) {
            return console.log("Erro image : " + err.message)
        }

    }


    public adicionarPergunta(perguntaData: any, perguntaId: any) {

        this.addContentElement({ text: '\n_______________________________________________________________________________________________\n\n', color: 'gray' })

        this.addContentElement({
            text: 'Pergunta ' + perguntaData.ordem + ' - ' + perguntaData.titulo,
            bold: true,
            style: 'subheader',
            tocItem: true,
            tocStyle: { italics: true },
            tocMargin: [30, 9, 0, 0],
        })

        this.addContentElement({ text: '\n' })

        let content = {
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: ' ', style: 'tableHeader', bold: true }, { text: ' ', style: 'tableHeader' }],
                    [{ text: 'Uso do sistema: ', style: 'tableHeader', bold: true, color: "gray", fontSize: 9 }, { text: 'Id: ' + perguntaId, color: "gray", fontSize: 9 }],
                ]
            },
            layout: 'noBorders'
        }

        //Requisitos
        let requesitos: any = [
            { text: 'Requisitos:', style: 'tableHeader', bold: true, color: "gray", fontSize: 9 },
            { text: 'Nenhum', style: 'tableHeader', color: "gray", fontSize: 9 },
        ]

        if (perguntaData.requisitos != null && Object.entries(perguntaData.requisitos).length > 0) {
            console.log("Here")
            requesitos = [
                { text: 'Requisitos:', style: 'tableHeader', bold: true, color: "gray", fontSize: 9 },
                { ul: [] }
            ]
            Object.entries(perguntaData.requisitos).forEach((value: any) => {
                requesitos[1]['ul'].push({ text: value[0], color: "gray", fontSize: 9 })
            })
        }

        content.table.body.push(requesitos)

        let temPendencias = perguntaData.temPendencias ? "Tem pendência" : "Não tem pendência";
        let foiRespondida = perguntaData.foiRespondida ? "Foi respondida" : "Não foi respondida";

        // let temRespostaValida = !perguntaData.foiRespondida && perguntaData.temRespostaValida ? "Informado como rascunho" : "Não foi informado o rascunho";

        content.table.body.push([{ text: 'Pendência:', style: 'tableHeader', bold: true }, { text: temPendencias, style: 'tableHeader' }])
        content.table.body.push([{ text: 'Respondida:', style: 'tableHeader', bold: true }, { text: foiRespondida, style: 'tableHeader' }])
        // content.table.body.push([{ text: 'Resposta válida:', style: 'tableHeader', bold: true }, { text: temRespostaValida, style: 'tableHeader' }])


        content.table.body.push([{ text: 'Pergunta:', style: 'tableHeader', bold: true }, { text: perguntaData.textoMarkdown, style: 'tableHeader' }])
        content.table.body.push([{ text: 'Tipo:', style: 'tableHeader', bold: true }, { text: perguntaData.tipo.nome, style: 'tableHeader' }])

        switch (perguntaData.tipo.id) {
            case 'texto':
                this.adicionarPerguntaTexto(content, perguntaData, perguntaId)
                break;
            case 'numero':
                this.adicionarPerguntaNumero(content, perguntaData, perguntaId)
                break;
            case 'imagem':
                this.adicionarPerguntaImagem(content, perguntaData, perguntaId)
                break;
            case 'arquivo':
                this.adicionarPerguntaArquivo(content, perguntaData, perguntaId)
                break;
            case 'coordenada':
                this.adicionarPerguntaCoordenada(content, perguntaData, perguntaId)
                break;
            case 'escolhaunica':
                this.adicionarPerguntaEscolhas(content, perguntaData, perguntaId)
                break;
            case 'escolhamultipla':
                this.adicionarPerguntaEscolhas(content, perguntaData, perguntaId)
                break;
            default:
                console.log("Tipo pergunta nao identificada")
                break;
        }

        if (perguntaData.observacao != null) {
            content.table.body.push([{ text: 'Obervação:', style: 'tableHeader', bold: true }, { text: perguntaData.observacao, style: 'tableHeader' }])
        } else {
            content.table.body.push([{ text: 'Obervação:', style: 'tableHeader', bold: true }, { text: " Não tem observação ", style: 'tableHeader' }])
        }

        this.addTableRow(perguntaData)
        this.addContentElement(content)
    }

    // TEXTO ------------------------------------------------------------------------------------------------
    public adicionarPerguntaTexto(content: any, pergunta: any, perguntaId: any) {
        if (pergunta.texto != null) {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: pergunta.texto, style: 'tableHeader' }])
        } else {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: "Nada informado.", style: 'tableHeader' }])
        }
    }

    // NUMERO ------------------------------------------------------------------------------------------------
    public adicionarPerguntaNumero(content: any, pergunta: any, perguntaId: any) {
        if (pergunta.numero != null) {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: pergunta.numero, style: 'tableHeader' }])
        } else {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: "Nada informado.", style: 'tableHeader' }])
        }
    }

    // IMAGEM ------------------------------------------------------------------------------------------------
    public adicionarPerguntaImagem(content: any, pergunta: any, perguntaId: any) {

        let lista: any = []
        if (pergunta.arquivo != null && Object.entries(pergunta.arquivo).length > 0) {

            lista = [
                { text: 'Resposta:', style: 'tableHeader', bold: true },
                { ul: [] }
            ]

            let contador = 1;
            for (var item in pergunta.arquivo) {

                lista[1]['ul'].push({ text: "Imagem " + contador + ' . Click para visualizar.', link: pergunta.arquivo[item]['url'], decoration: 'underline', color: "blue" })
                contador++;
            }
            content.table.body.push(lista)
        } else {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: "Nada informado.", style: 'tableHeader' }])
        }
    }

    // ARQUIVO ------------------------------------------------------------------------------------------------
    public adicionarPerguntaArquivo(content: any, pergunta: any, perguntaId: any) {

        let lista: any = []
        if (pergunta.arquivo != null && Object.entries(pergunta.arquivo).length > 0) {

            lista = [
                { text: 'Resposta:', style: 'tableHeader', bold: true },
                { ul: [] }
            ]

            let contador = 1;
            for (var item in pergunta.arquivo) {

                lista[1]['ul'].push({ text: "Imagem " + contador + ' . Click para visualizar.', link: pergunta.arquivo[item]['url'], decoration: 'underline', color: "blue" })
                contador++;
            }
            content.table.body.push(lista)
        } else {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: "Nada informado.", style: 'tableHeader' }])
        }
    }

    // COORDENADA ------------------------------------------------------------------------------------------------
    public adicionarPerguntaCoordenada(content: any, pergunta: any, perguntaId: any) {

        let lista: any = []
        if (pergunta.coordenada != null && pergunta.coordenada.length > 0) {

            lista = [
                { text: 'Resposta:', style: 'tableHeader', bold: true },
                { ul: [] }
            ]

            for (var item in pergunta.coordenada) {
                lista[1]['ul'].push({ text: `(${pergunta.coordenada[item]["latitude"]},${pergunta.coordenada[item]["longitude"]})`, style: 'A3' })
            }
            content.table.body.push(lista)
        } else {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: "Nada informado.", style: 'tableHeader' }])
        }
    }

    // ESCOLHA UNICA ------------------------------------------------------------------------------------------------
    public adicionarPerguntaEscolhas(content: any, pergunta: any, perguntaId: any) {
        // multiplas escolhas
        let multiplas_escolhas: any = []

        if (pergunta.escolhas != null && Object.entries(pergunta.escolhas).length > 0) {
            multiplas_escolhas = [
                { text: 'Resposta:', style: 'tableHeader', bold: true },
                { ul: [] }
            ]
            Object.entries(pergunta.escolhas).sort((a: any, b: any) => { return a[1].ordem - b[1].ordem }).forEach((value: any) => {
                if (pergunta.tipo.id == "escolhamultipla") {

                    if (value[1].marcada) {
                        multiplas_escolhas[1]['ul'].push({ text: "[ X ] " + value[1].texto })
                    } else {
                        multiplas_escolhas[1]['ul'].push({ text: "[   ] " + value[1].texto })
                    }

                } else if (pergunta.tipo.id == "escolhaunica") {

                    if (value[1].marcada) {
                        multiplas_escolhas[1]['ul'].push({ text: "( X ) " + value[1].texto })
                    } else {
                        multiplas_escolhas[1]['ul'].push({ text: "(   ) " + value[1].texto })
                    }

                } else {
                    multiplas_escolhas[1]['ul'].push({ text: value[1].texto })
                }
            })
            content.table.body.push(multiplas_escolhas)
        } else {
            content.table.body.push([{ text: 'Resposta:', style: 'tableHeader', bold: true }, { text: "  ", style: 'tableHeader' }])
        }
    }
}