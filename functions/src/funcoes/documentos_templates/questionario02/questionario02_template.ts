//import { Timestamp } from "@google-cloud/firestore";
// import * as moment from "moment";

export default class Questionario02Template {

    public nomeQuest: any;

    constructor(nomeQuest: any) {
        this.nomeQuest = nomeQuest
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
        footer: (currentPage: any, pageCount: any) => { return { text: currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin: [0, 0, 40, 50], color: "gray" } },
        header: (currentPage: any, pageCount: any, pageSize: any) => {
            return [
                { text: this.nomeQuest, italics: true, color: 'gray', alignment: 'right', margin: [0, 10, 10, 0] },
            ]
        }
    }

    public addContentElement(contentElement: any) {
        this.docDefinition.content.push(contentElement);
    }

    public getDocDefinition() {
        return this.docDefinition
    }

    // ----------------------------------------------------

    public adicionarIndice(nome: any) {
        this.addContentElement({
            toc: {
                title: { text: 'RELATÓRIO QUESTIONÁRIO\n' + nome, style: 'header' },
                margin: [0, 150, 0, 0],
                numberStyle: { bold: true },
            },
        })
    }

    public async adicionarCabecalhoQuestionario(questData: any, questId: any) {

        this.addContentElement({
            text: '\nQuestionário ' + questData.ordem + ' - ' + questData.nome,
            style: 'header',
            tocItem: true,
            tocStyle: { bold: true },
            tocMargin: [0, 50, 0, 0],
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

        this.addContentElement({
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: 'Eixo:', style: 'tableHeader', bold: true }, { text: questData.eixo.nome, style: 'tableHeader' }],
                    [{ text: 'ID: ', style: 'tableHeader', bold: true }, { text: questId, style: 'tableHeader' }],
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
                    [{ text: 'ID:', style: 'tableHeader', bold: true }, { text: perguntaId, style: 'tableHeader' }],
                    [{ text: 'Tipo:', style: 'tableHeader', bold: true }, { text: perguntaData.tipo.nome, style: 'tableHeader' }],
                ]
            },
            layout: 'noBorders'
        }

        //Requisitos

        let requesitos: any = [
            { text: 'Requisitos:', style: 'tableHeader', bold: true },
            { text: 'Nenhum', style: 'tableHeader' },
        ]

        if (perguntaData.requisitos != null && Object.entries(perguntaData.requisitos).length > 0) {
            console.log("Here")
            requesitos = [
                { text: 'Requisitos:', style: 'tableHeader', bold: true },
                { ul: [] }
            ]
            Object.entries(perguntaData.requisitos).forEach((value: any) => {
                requesitos[1]['ul'].push({ text: value[0] })
            })

        }

        content.table.body.push(requesitos)

        content.table.body.push([{ text: 'Texto:', style: 'tableHeader', bold: true }, { text: perguntaData.textoMarkdown, style: 'tableHeader' }])

        // multiplas escolhas

        let multiplas_escolhas: any = []

        if (perguntaData.escolhas != null && Object.entries(perguntaData.escolhas).length > 0) {
            multiplas_escolhas = [
                { text: 'Escolhas:', style: 'tableHeader', bold: true },
                { ul: [] }
            ]
            Object.entries(perguntaData.escolhas).sort((a: any, b: any) => { return a[1].ordem - b[1].ordem }).forEach((value: any) => {
                multiplas_escolhas[1]['ul'].push({ text: value[1].texto })
            })
            content.table.body.push(multiplas_escolhas)
        }


        this.addContentElement(content)
    }
}