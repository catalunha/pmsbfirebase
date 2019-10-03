
import GoogleApiControllerTemplateBase from "../api_controller_template_base";
const { google } = require('googleapis');

export class SpreadSheetsApiController extends GoogleApiControllerTemplateBase {

    public spreadSheetID: string;
    public sheets: any;

    constructor(spreadSheetID: string) {
        super()
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

    // Privates

    public getDadosDaTabela(range: any) {
        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.get({
                auth: this.getOAuth2Client(),
                spreadsheetId: this.getSpreadSheetID(),
                range: range,
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
                    console.log("batchUpdateNovaCelula >> " + err)
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
                    console.log("appendNovaCelula >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })
    }

}