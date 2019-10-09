//import { Timestamp } from "@google-cloud/firestore";
// import * as moment from "moment";

export default class Controle03Template {

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

    public addContentElement(contentElement: any) {
        this.docDefinition.content.push(contentElement);
    }

    public getDocDefinition() {
        return this.docDefinition
    }

}