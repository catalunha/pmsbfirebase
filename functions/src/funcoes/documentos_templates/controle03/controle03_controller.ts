import Controle03Template from "./controle03_template";

export class RelatorioControle03Controller {

    private controle03Template: Controle03Template;

    constructor() {
        this.controle03Template = new Controle03Template();
    }

    public gerarDocDefinitionContent(relatorioData: any, relatorioId: any) {
        return new Promise(async (resolve: any, reject: any) => {
            this.controle03Template.addContentElement({
                text: "collection: " + relatorioData.collection,
                style: "A2"
            })

            this.controle03Template.addContentElement({
                text: "document: " + relatorioData.document,
                style: "A2"
            })

            this.controle03Template.addContentElement({
                text: "tipo: " + relatorioData.tipo,
                style: "A2"
            })

            let docDefinition = this.controle03Template.getDocDefinition()
            resolve(docDefinition)
        })

    }
}

