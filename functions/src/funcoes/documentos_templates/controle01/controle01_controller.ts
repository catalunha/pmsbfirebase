import Controle01Template from "./controle01_template";

export class RelatorioControle01Controller {

    private controle01Template: Controle01Template;

    constructor() {
        this.controle01Template = new Controle01Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise(async (resolve: any, reject: any) => {
            this.controle01Template.addContentElement({
                text: "collection: " + relatorioData.collection,
                style: "A2"
            })

            this.controle01Template.addContentElement({
                text: "document: " + relatorioData.document,
                style: "A2"
            })

            this.controle01Template.addContentElement({
                text: "tipo: " + relatorioData.tipo,
                style: "A2"
            })

            let docDefinition = this.controle01Template.getDocDefinition()
            resolve(docDefinition)
        })

    }
}

