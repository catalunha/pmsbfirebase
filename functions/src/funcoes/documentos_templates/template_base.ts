export default class TemplateBase {

    private pdfContent: any = {
        content: [],
        style: {
            header: {
                fontSize: 18,
                bold: true
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            parametros: {
                fontSize: 14
            },
            superMargin: {
                margin: [30, 0, 100, 10],
                fontSize: 15
            }
        },
    }

    constructor() {
    }

    public getPdfContent() {
        return this.pdfContent
    }

    public addContentElement(contentElement: any) {
        this.pdfContent.content.push(contentElement);
    }

}