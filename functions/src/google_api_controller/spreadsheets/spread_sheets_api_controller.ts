
import GoogleApiControllerTemplateBase from "../api_controller_template_base";
import { SpreadSheetsBatchUpdateModel } from "./spread_sheet_model";

export class SpreadSheetsApiController extends GoogleApiControllerTemplateBase {

    public spreadSheetID: string;

    constructor(spreadSheetID: string) {
        super()
        this.spreadSheetID = spreadSheetID;
    }

    public getId() {
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

    private getDadosDaTabela(range: any) {
        // const { google } = require('googleapis');
        // const OAuth2 = google.auth.OAuth2;

        // const oAuth2Client = new OAuth2(
        //     "1092622474927-9dgqh9vmoq384jq8dd58p027hk6oa1fh.apps.googleusercontent.com",
        //     "NXuw1CAF1upMYLCSdvB4xi-z",
        //     "https://developers.google.com/oauthplayground"
        // );

        // oAuth2Client.setCredentials({
        //     refresh_token: "1/cGTNyhlCKlehB0K-HN6yu4sAFu7L6pi90JBdhaHe5HeTrOX94FqpnK1iQB1KjPYJ"
        // });


        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.get({
                auth: this.oAuth2Client,
                spreadsheetId: this.spreadSheetID,
                range: "A:A",
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

    private setNovaCelulaNaTabela(requestData: any) {
        return new Promise((resolve: any, reject: any) => {
            this.sheets.spreadsheets.values.batchUpdate(requestData, (err: any, res: any) => {
                if (err) {
                    console.log("setNovaCelulaNaTabela >> " + err)
                    reject('The API returned an error: ' + err);
                }
                else {
                    resolve(res.data)
                }
            });
        })

    }

    // Public

    public addicionarNovaCelulaCabecalhoNaColuna(dadoCelula: any) {
        this.getDadosDaTabela("A:A").then((dadosTablela: any) => {

            let quantElementos = dadosTablela.values.length;
            console.log(" dadosTablela.values.length >> " + dadosTablela.values.length)

            let spreadModel = new SpreadSheetsBatchUpdateModel(this.spreadSheetID, this.oAuth2Client);
            spreadModel.adicionarNovaCelula(this.columnToLetter(quantElementos), dadoCelula)

            let model = spreadModel.getModel();
            console.log(model)

            this.setNovaCelulaNaTabela(model).then(() => {
                console.log("FOI")
            }).catch((err) => {
                console.log(err)
            })


        }).catch((err: any) => {
            console.error("inserir nova coluna na tabela : " + err)
        })
    }

}