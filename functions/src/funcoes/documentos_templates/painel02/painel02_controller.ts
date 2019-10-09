import Painel02Template from "./painel02_template";

export class RelatorioPainel02Controller {

    private painel02Template: Painel02Template;

    constructor() {
        this.painel02Template = new Painel02Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise(async (resolve: any, reject: any) => {
            this.painel02Template.addContentElement({
                text: "collection: " + relatorioData.collection,
                style: "A2"
            })

            this.painel02Template.addContentElement({
                text: "document: " + relatorioData.document,
                style: "A2"
            })

            this.painel02Template.addContentElement({
                text: "tipo: " + relatorioData.tipo,
                style: "A2"
            })

            let docDefinition = this.painel02Template.getDocDefinition()
            resolve(docDefinition)
        })

    }
}

