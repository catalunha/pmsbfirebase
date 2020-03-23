
import GoogleApiControllerTemplateBase from "../api_controller_template_base";
import * as GoogleApiController from "../google_api_controller_map";

const { google } = require('googleapis');

export class SpreadSheetsApiController extends GoogleApiControllerTemplateBase {

    public spreadModel: GoogleApiController.SpreadSheetsBatchUpdateModel;
    public spreadSheetID: string;
    public sheets: any;

    constructor(spreadSheetID: string) {
        super()
        this.spreadModel = new GoogleApiController.SpreadSheetsBatchUpdateModel(spreadSheetID, this.getOAuth2Client());
        this.spreadSheetID = spreadSheetID;
        this.sheets = google.sheets('v4');
    }

    public getSpreadSheetID() {
        return this.spreadSheetID;
    }

    // Axiliares 

    public columnToLetter(column: any) {
        var temp, letter = '';
        while (column > 0) {
            temp = (column - 1) % 26;
            letter = String.fromCharCode(temp + 65) + letter;
            column = (column - temp - 1) / 26;
        }
        return letter;
    }

    public letterToColumn(letter: any) {
        var column = 0, length = letter.length;
        for (var i = 0; i < length; i++) {
            column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
        }
        return column;
    }

    public filtrarDadosPorPosicao(posicao: any, lista: any, valorFiltro: any) {
        return new Promise((resolve, reject) => {
            lista.forEach((x: any, index: any) => {
                if (x[posicao] == valorFiltro) {
                    resolve({ index: index, valor: x })
                }
            });
        })
    }

    public filtrarDadosDeLista(lista: any, valorFiltro: any) {
        return new Promise((resolve, reject) => {
            lista.forEach((x: any, index: any) => {
                if (x == valorFiltro) {
                    resolve({ index: index, valor: x })
                }
            });
        })

    }


    // Privates

    public getDadosDaTabela(range: any) {
        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.get({
                auth: this.getOAuth2Client(),
                spreadsheetId: this.getSpreadSheetID(),
                range: range,
            }, (err: any, res: any) => {
                if (err) {
                    // console.log("getDadosDaTabela >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })

    }

    public getTodoOsDadosTabela() {
        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.batchGetByDataFilter({
                auth: this.getOAuth2Client(),
                spreadsheetId: this.getSpreadSheetID(),
                resource: {
                    dataFilters: [
                        {
                            gridRange: {
                                startRowIndex: 0
                            }
                        }
                    ]
                }
            }, (err: any, res: any) => {
                if (err) {
                    console.log("getDadosDaTabela >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })
    }

    public batchUpdateNovaCelula(requestData: any) {
        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.batchUpdate(requestData, (err: any, res: any) => {
                if (err) {
                    // console.log("batchUpdateNovaCelula >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })
    }


    /**
     * @param coluna Paramentro da posição da celula que tera o valor alterado
     * @param linha Paramentro da linha da celula que tera o valor alterado
     * @param valor Valor que sera inserido na nova posicao
     */
    public adicionarNovaCelula(coluna: string, linha: string, valor: string) {
        var range: string = coluna + linha;
        this.spreadModel.adicionarNovaCelula(range, valor);
    }

    /**
     * Funcao responsavel por enviar celulas alteradas a tabela
     */
    public batchUpdateNovasCelulas() {
        return new Promise((resolve: any, reject: any) => {
            let spreadModelList = this.spreadModel.getModel();
            this.sheets.spreadsheets.values.batchUpdate(spreadModelList, (err: any, res: any) => {
                if (err) {
                    // console.log("appendNovaCelula >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })
    }


    public appendNovaCelula(requestData: any) {
        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.append(requestData, (err: any, res: any) => {
                if (err) {
                    // console.log("appendNovaCelula >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })
    }

}