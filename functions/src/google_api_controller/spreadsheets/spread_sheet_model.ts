
export class SpreadSheetsBatchUpdateModel {

    public model: any;

    constructor(spreadSheetID: any, oAuth2Client: any) {
        this.model = {
            spreadsheetId: spreadSheetID,

            resource: {
                data: [],
                "valueInputOption": "USER_ENTERED"

            },

            auth: oAuth2Client,
        }
    }

    public getModel() {
        return this.model;
    }

    public adicionarNovaCelula(range: any, value: any) {
        this.model.resource.data.push(
            {
                "range": range,
                "values": [
                    [
                        value
                    ]
                ]
            }
        )
    }

}