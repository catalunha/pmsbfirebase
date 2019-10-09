import Controle04Template from "./controle04_template";

export class RelatorioControle04Controller {

    private controle04Template: Controle04Template;

    constructor() {
        this.controle04Template = new Controle04Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise(async (resolve: any, reject: any) => {
            this.controle04Template.addContentElement({
                text: "collection: " + relatorioData.collection,
                style: "A2"
            })

            this.controle04Template.addContentElement({
                text: "document: " + relatorioData.document,
                style: "A2"
            })

            this.controle04Template.addContentElement({
                text: "tipo: " + relatorioData.tipo,
                style: "A2"
            })

            let docDefinition = this.controle04Template.getDocDefinition()
            resolve(docDefinition)
        })

    }
}

