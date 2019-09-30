// import DatabaseReferences from "../database-references";
import * as Relatorios from "./documentos_templates/documento_templates"

const admin = require('firebase-admin');
let pdfMake = require('pdfmake/build/pdfmake.js');
let font = require('pdfmake/build/vfs_fonts.js');



const options = {}

export function iniciaOnCreate(snap: any) {
    const uploadSnapId = snap.id;
    const relatorioData = snap.data()
    return iniciarGeracaoRelatorio(snap, uploadSnapId, relatorioData)
};

export function iniciaOnUpdate(snap: any) {
    const uploadSnapId = snap.after.id;
    const relatorioData = snap.after.data()
    return iniciarGeracaoRelatorio(snap.after, uploadSnapId, relatorioData)
};

export function iniciarGeracaoRelatorio(snapRef: any, uploadSnapId: any, relatorioData: any) {
    return relatorioData.pdfGerar ? criarPdf(uploadSnapId, relatorioData).then((bufferData: any) => {
        const bucket = admin.storage().bucket();
        const file = bucket.file('relatorioPdfMake/' + uploadSnapId + '.pdf');
        return file.save(bufferData).then(() => {
            return snapRef.ref.set({
                pdfGerado: true,
                pdfGerar: false,
            }, { merge: true });
        })
    }).catch(() => {
        console.log("ERROR")
    }) : 0;
}


export function criarPdf(snapId: any, relatorioData: any) {
    return new Promise(async (resolve: any, reject: any) => {
        pdfMake.vfs = font.pdfMake.vfs
        console.log("INICIA CRIAR PDF")

        switch (relatorioData.tipo) {
            case "resposta01":
                gerarRelatorioResposta01(snapId, relatorioData, resolve, reject);
                break;
            case "controle01":
                gerarRelatorioResposta01(snapId, relatorioData, resolve, reject);
                break;
            case "controle02":
                gerarRelatorioControle02(snapId, relatorioData, resolve, reject);
                break;
            default:
                console.log('Nenhum tipo de relatorio encontrado')
                break;
        }
    })
}

export function gerarPdfDocDefinition(docDefinition: any, resolve: any) {
    var pdfDoc = pdfMake.createPdf(docDefinition, options);
    pdfDoc.getBuffer((data: any) => {
        resolve(data);
    });
    console.log("PDF gerado ! ")
}

export function gerarRelatorioResposta01(snapId: any, relatorioData: any, resolve: any, reject: any) {
    let relatorioQuestionarioAplicado = new Relatorios.RelatorioQuestionarioAplicadoController()
    relatorioQuestionarioAplicado.gerarDocDefinitionContent(relatorioData, snapId).then(async (docDefinition) => {
        gerarPdfDocDefinition(docDefinition, resolve)
        // var pdfDoc = await pdfMake.createPdf(docDefinition, options);
        // pdfDoc.getBuffer((data: any) => {
        //     resolve(data);
        // });
        // console.log("PDF gerado ! ")
    }).catch(() => {
        reject();
    })
}

export function gerarRelatorioControle01(snapId: any, relatorioData: any, resolve: any, reject: any) {
    let relatorioControle01 = new Relatorios.RelatorioControle01Controller()
    relatorioControle01.gerarDocDefinitionContent(relatorioData, snapId).then(async (docDefinition) => {
        gerarPdfDocDefinition(docDefinition, resolve)
    }).catch(() => {
        reject();
    })
}

export function gerarRelatorioControle02(snapId: any, relatorioData: any, resolve: any, reject: any) {
    let relatorioControle02 = new Relatorios.RelatorioControle02Controller()
    relatorioControle02.gerarDocDefinitionContent(relatorioData, snapId).then(async (docDefinition) => {
        gerarPdfDocDefinition(docDefinition, resolve)
    }).catch(() => {
        reject();
    })
}