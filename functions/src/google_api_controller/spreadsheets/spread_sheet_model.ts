
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
                range: range,
                values: [
                    [
                        value
                    ]
                ]
            }
        )
    }
}


export class SpreadSheetsAppendModel {

    public model: any;

    constructor(spreadSheetID: any, oAuth2Client: any, range: any) {
        this.model = {
            spreadsheetId: spreadSheetID,
            range: range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: []
            },
            auth: oAuth2Client,
        }
    }

    public getModel() {
        return this.model;
    }

    public setRange(range: any) {
        this.model['range'] = range;
    }

    public adicionarNovaCelula(value: any) {
        this.model.resource.values.push(
            [value]
        )
    }

}