import Controle02Template from "./controle02_template";

export class RelatorioControle02Controller {

    private controle02Template: Controle02Template;

    constructor() {
        this.controle02Template = new Controle02Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise(async (resolve: any, reject: any) => {
            this.controle02Template.addContentElement({
                text: "collection: " + relatorioData.collection,
                style: "A2"
            })

            this.controle02Template.addContentElement({
                text: "document: " + relatorioData.document,
                style: "A2"
            })

            this.controle02Template.addContentElement({
                text: "tipo: " + relatorioData.tipo,
                style: "A2"
            })

            let docDefinition = this.controle02Template.getDocDefinition()
            resolve(docDefinition)
        })

    }
}

