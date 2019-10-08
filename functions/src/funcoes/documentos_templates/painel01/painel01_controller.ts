import Painel01Template from "./painel01_template";

export class RelatorioPainel01Controller {

    private painel01Template: Painel01Template;

    constructor() {
        this.painel01Template = new Painel01Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise(async (resolve: any, reject: any) => {
            this.painel01Template.addContentElement({
                text: "collection: " + relatorioData.collection,
                style: "A2"
            })

            this.painel01Template.addContentElement({
                text: "document: " + relatorioData.document,
                style: "A2"
            })

            this.painel01Template.addContentElement({
                text: "tipo: " + relatorioData.tipo,
                style: "A2"
            })

            let docDefinition = this.painel01Template.getDocDefinition()
            resolve(docDefinition)
        })

    }
}

