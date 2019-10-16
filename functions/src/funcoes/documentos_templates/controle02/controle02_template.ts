import { Timestamp } from "@google-cloud/firestore";
import moment = require("moment");

export default class Controle02Template {
    public nomeTarefa: any;
    constructor(nomeTarefa: any) {
        this.nomeTarefa = nomeTarefa
    }

    private docDefinition: any = {
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
            parametrost: {
                fontSize: 16,
                margin: [0, 0]
            },
            sistema: {

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
        footer: (currentPage: any, pageCount: any) =>{ return { text: this.nomeTarefa + ' - '+ currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin: [0, 0, 40, 50], color: "gray" } },
    }

    public addContentElement(contentElement: any) {
        this.docDefinition.content.push(contentElement);
    }

    public getDocDefinition() {
        return this.docDefinition
    }

    // ---------------------------------

    public adicionarIndice(nome: any) {
        this.addContentElement({
            toc: {
                title: { text: 'RELATÓRIO CONTROLE\n' + nome, style: 'header' },
                margin: [0, 150, 0, 0],
                numberStyle: { bold: true },
            },
        })

        this.addContentElement({ text: '\n\n_______________________________________________________________________________________________\n\n', bold: true })
    }

    public adicionarCabecalhoRelatorio(controleData: any, controleId: any) {
        this.addContentElement(
            {
                text: controleData.nome,
                style: 'header',
                tocItem: true,
                tocStyle: { bold: true },
                tocMargin: [0, 50, 0, 0],
                tocNumberStyle: { bold: true },
            }
        )

        this.addContentElement(
            {
                stack: [
                    { text: 'Alguns dados importantes sobre esta tarefa.', style: 'subheader' },

                ],
                alignment: 'left',
                margin: [0, 20],
            }
        )

        let content: any = {
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: '', style: 'tableHeader', bold: true }, { text: '', style: 'tableHeader', bold: true, color: 'white' }],
                ]
            },
            layout: 'noBorders'
        }

        // Tarefa concluida

        if (controleData.concluida) {
            content.table.body.push([{ text: 'Concluída:', style: 'tableHeader', bold: true }, { text: 'Sim', style: 'tableHeader', bold: true, color: 'green' }])
        } else {
            content.table.body.push([{ text: 'Concluída:', style: 'tableHeader', bold: true }, { text: 'Não', style: 'tableHeader', bold: true, color: 'red' }])
        }


        // datas

        let timestamp, horario: any, data;

        // Outros
        content.table.body.push([{ text: 'Setor:', style: 'tableHeader', bold: true }, { text: controleData.setor.nome, style: 'tableHeader', bold: false, color: 'black' }])
        content.table.body.push([{ text: 'Remetente:', style: 'tableHeader', bold: true }, { text: controleData.remetente.nome, style: 'tableHeader', bold: false, color: 'black' }])
        content.table.body.push([{ text: 'Destinatário:', style: 'tableHeader,', bold: true }, { text: controleData.destinatario.nome, style: 'tableHeader', bold: false, color: 'black' }])

        timestamp = (controleData.inicio as Timestamp).toDate()
        timestamp.setHours(timestamp.getHours() - 3);
        horario = timestamp.toLocaleTimeString();
        data = moment(timestamp.toLocaleDateString(), "YYYY-MM-DD").utc().format("DD-MM-YYYY").toString();

        content.table.body.push([{ text: 'Início:', style: 'tableHeaer', bold: true }, { text: data + " " + horario, style: 'tableHeader', bold: false, color: 'black' }])

        timestamp = (controleData.fim as Timestamp).toDate()
        timestamp.setHours(timestamp.getHours() - 3);
        horario = timestamp.toLocaleTimeString();
        data = moment(timestamp.toLocaleDateString(), "YYYY-MM-DD").utc().format("DD-MM-YYYY").toString();

        content.table.body.push([{ text: 'Fim:', style: 'tableHeader', bold: true }, { text: data + " " + horario, style: 'tableHeader', bold: false, color: 'black' }])

        timestamp = (controleData.modificada as Timestamp).toDate()
        timestamp.setHours(timestamp.getHours() - 3);
        horario = timestamp.toLocaleTimeString();
        data = moment(timestamp.toLocaleDateString(), "YYYY-MM-DD").utc().format("DD-MM-YYYY").toString();

        content.table.body.push([{ text: 'Atualizada: ', style: 'tablHeader', bold: true }, { text: data + " " + horario, style: 'tableHeader', bold: false, color: 'black' }])
        content.table.body.push(
            [{ text: 'Uso do sistema: ', style: 'tableHeader', bold: true, color: "gray", fontSize: 9 }, { text: 'Id: ' + controleId + ' Ref:' + controleData.referencia, color: "gray", fontSize: 9 }],
        )

        this.addContentElement(content)

        this.addContentElement(
            {
                stack: [
                    { text: 'Lista de ações desta tarefa:', style: 'subheader' },

                ],
                alignment: 'left',
                margin: [0, 18],
            }
        )
    }


    public adicionarAcao(acaoData: any, acaoId: any) {

        this.addContentElement(
            { text: '\n_______________________________________________________________________________________________\n', color: 'gray' }
        )

        this.addContentElement(
            {
                text: acaoData.nome,
                bold: true,
                style: 'subheader',
                tocItem: true,
                tocStyle: { italics: true },
                tocMargin: [30, 9, 0, 0],

            }
        )
        this.addContentElement({ text: '\n' })

        let content: any = {
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: '', style: 'tableHeader', bold: false }, { text: '', style: 'tableHeader', bold: false, color: 'white' }]
                ]
            },
            layout: 'noBorders'
        }

        // Acao concluida

        if (acaoData.concluida) {
            content.table.body.push([{ text: 'Concluída:', style: 'tableHeader', bold: true }, { text: 'Sim', style: 'tableHeader', bold: true, color: 'green' }])
        } else {
            content.table.body.push([{ text: 'Concluída:', style: 'tableHeader', bold: true }, { text: 'Não', style: 'tableHeader', bold: true, color: 'red' }])
        }

        // observacao
        if (acaoData.observacao) {
            content.table.body.push([{ text: 'Observação:', style: 'tableHeader', bold: true }, { text: acaoData.observacao, style: 'tableHeader', bold: false, color: 'black' }])
        }

        if (acaoData.url) {
            content.table.body.push([{ text: 'Url:', style: 'tableHeader', bold: true }, { text: "Clique aqui para ver o anexo", style: 'tableHeader', link: acaoData.url, decoration: 'underline', color: "blue" }])
        }

        let timestamp, horario: any, data;

        timestamp = (acaoData.modificada as Timestamp).toDate()
        timestamp.setHours(timestamp.getHours() - 3);
        horario = timestamp.toLocaleTimeString();
        data = moment(timestamp.toLocaleDateString(), "YYYY-MM-DD").utc().format("DD-MM-YYYY").toString();

        content.table.body.push([{ text: 'Atualizada:', style: 'tableHeader', bold: true }, { text: data + " " + horario, style: 'tableHeader', bold: false, color: 'black' }])

        content.table.body.push(
            [{ text: 'Uso do sistema: ', style: 'tableHeader', bold: true, color: "gray", fontSize: 9 }, { text: 'Id: ' + acaoId + ' Ref:' + acaoData.referencia, color: "gray", fontSize: 9 }],
        )
        // content.table.body.push([{ text: 'ID:', style: 'tableHeader,', bold: true }, { text: acaoId, style: 'tableHeader', bold: false, color: 'black' }])
        // content.table.body.push([{ text: 'Referência:', style: 'tableHeader', bold: true }, { text: acaoData.referencia, style: 'tableHeader', bold: false, color: 'black' }])


        this.addContentElement(content)

    }

}