// import { Timestamp } from "@google-cloud/firestore";

export default class RelatorioControleTemplate {

    constructor() {

    }

    private docDefinition: any = {
        content: [],
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

    /*
     *  ESTRUTURA DA TABELA 
     */



    /*
     *  ESTRUTURA DO CABECALHO DO DOCUMENTO 
     */

    public adicionarCabecalho(controleData: any, controleId: any) {
        this.addContentElement({
            toc: {
                title: { text: 'RELATÓRIO DE TAREFAS REMETENTE', style: 'header' },
                margin: [0, 150, 0, 0],
                //textStyle: {italics: true},
                numberStyle: { bold: true },
            },
        });
    }

    /*
     *  ESTRUTURA DA TAREFA 
     */

    public addCabecalhoTarefa(pergunta: any) {
        this.addContentElement({
            text: 'Tarefa 01',
            style: 'header',
            tocItem: true,
            tocStyle: { bold: true },
            tocMargin: [0, 50, 0, 0],
            tocNumberStyle: { bold: true },
            pageBreak: 'before'
        })
        this.addContentElement({
            stack: [
                { text: 'Alguns dados importantes sobre esta tarefa.', style: 'subheader' },

            ],
            alignment: 'left',
            margin: [0, 20],
        })
        this.addContentElement({
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: 'Setor:', style: 'tableHeader', bold: true }, { text: 'Palmas', style: 'tableHeader' }],
                    [{ text: 'Remetente:', style: 'tableHeader', bold: true }, { text: 'Prof Catalunha', style: 'tableHeader' }],
                    [{ text: 'Destinatário:', style: 'tableHeader,', bold: true }, { text: 'Prof Catalunha', style: 'tableHeader' }],
                    [{ text: 'Início:', style: 'tableHeader', bold: true }, { text: '2019-09-26 08:06:17.104', style: 'tableHeader' }],
                    [{ text: 'Fim:', style: 'tableHeader', bold: true }, { text: '2019-09-26 08:06:17.104', style: 'tableHeader' }],
                    [{ text: 'Atualizada: ', style: 'tableHeader', bold: true }, { text: '2019-09-26 08:18:35.723', style: 'tableHeader' }],
                    [{ text: 'Status:', style: 'tableHeader', bold: true }, { text: 'Concluída', style: 'tableHeader' }],
                    [{ text: 'ID: ', style: 'tableHeader', bold: true }, { text: 'Xx07hxQ05UwKaGAaJAWZ', style: 'tableHeader' }],
                    [{ text: 'Referência: ', style: 'tableHeader', bold: true }, { text: '253d387a-5126-495d-a9c8-b6b596955ed4', style: 'tableHeader' }],
                ]
            },
            layout: 'noBorders'
        })
        this.addContentElement({
            stack: [
                { text: 'Lista de ações desta tarefa:', style: 'subheader' },

            ],
            alignment: 'left',
            margin: [0, 18],
        })
    }   
}