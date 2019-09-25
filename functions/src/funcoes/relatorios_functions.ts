// import * as functions from 'firebase-functions';
import DatabaseReferences from "../database-references";
import QuestionarioAplicadoTemplate from './documentos_templates/questionario_aplicado_template'

const admin = require('firebase-admin');
let pdfMake = require('pdfmake/build/pdfmake.js');
let font = require('pdfmake/build/vfs_fonts.js');


let questionarioRelatorio = new QuestionarioAplicadoTemplate();

const options = {
    // ...
}

export function iniciaOnUpdate(snap: any) {
    questionarioRelatorio = new QuestionarioAplicadoTemplate();
    const uploadSnapId = snap.after.id;
    const questData = snap.after.data()

    return criarPdf(uploadSnapId, questData).then((bufferData: any) => {
        const bucket = admin.storage().bucket();
        const file = bucket.file('relatorios-questionario-aplicado/' + uploadSnapId + '.pdf');
        file.save(bufferData).then(() => {
            //
        })
    }).catch(() => {
        console.log("ERROR")
    })
};

// export function salvarUrlDoArquivo(file: any) {

//     file.getSignedUrl({
//         action: 'read',
//         expires: '03-09-2491'
//     }).then((urlArquivo: any) => {
//         // urlArquivo -> url retornada do arquivo
//         console.log(" Url do arquivo >> " + urlArquivo[0])
//     });
// }

export function criarPdf(snapId: any, questData: any) {
    return new Promise(async (resolve: any) => {
        pdfMake.vfs = font.pdfMake.vfs
        console.log("INICIA CRIAR PDF")
        await gerarDocDefinitionContent(snapId, questData).then(async () => {
            var pdfDoc = await pdfMake.createPdf(questionarioRelatorio.getDocDefinition(), options);
            pdfDoc.getBuffer((data: any) => {
                resolve(data)
            });
            console.log("PDF gerado ! ")
        })


    })
}

export function gerarDocDefinitionContent(snapId: any, questData: any) {
    return new Promise(async (resolve: any) => {
        DatabaseReferences.PerguntaAplicadaRef.where("questionario.id", '==', snapId).orderBy("ordem", "asc").get().then(async (perguntas: any) => {
            prencherRelatorio(resolve, perguntas, questData, snapId)
        }).catch((err: any) => {
            console.log('Error getting documents : PerguntaAplicada ', err)
        })
    })

}

export function prencherRelatorio(resolve: any, perguntas: any, questData: any, questId: any) {

    /**
     * Os elementos devem ser inseridos em ordem
     */
    questionarioRelatorio.adicionarCabecalho(questData)
    questionarioRelatorio.adicicionarSubCabecalho(questData, questId)

    /**
     * Percorre a lista de pergunta e insere uma de cada vez
     */
    if (perguntas.docs.length > 0) {
        perguntas.docs.forEach(async (pergunta: any, index_filt: any, array_filt: any) => {
            adicionarElementoPerguntaContent(pergunta);
            if ((index_filt + 1) >= array_filt.length) {
                questionarioRelatorio.adicionarTabelaAoDocDefinition()
                resolve("")
            }
        })
    }
}

export function adicionarElementoPerguntaContent(pergunta: any) {
    let perguntaData = pergunta.data()

    /**
     * Implementar swich case pra filtrar o tipo da pergunta [perguntaData.tipo.id]
    */

    switch (perguntaData.tipo.id) {
        case 'texto':
            questionarioRelatorio.adicionarPerguntaTexto(perguntaData, pergunta.id)
            break;
        case 'numero':
            questionarioRelatorio.adicionarPerguntaNumero(perguntaData, pergunta.id)
            break;
        case 'imagem':
            questionarioRelatorio.adicionarPerguntaImagem(perguntaData, pergunta.id)
            break;
        case 'arquivo':
            questionarioRelatorio.adicionarPerguntaArquivo(perguntaData, pergunta.id)
            break;
        case 'coordenada':
            questionarioRelatorio.adicionarPerguntaCoordenada(perguntaData, pergunta.id)
            break;
        case 'escolhaunica':
            questionarioRelatorio.adicionarPerguntaEscolhaUnica(perguntaData, pergunta.id)
            break;
        case 'escolhamultipla':
            questionarioRelatorio.adicionarPerguntaEscolhaMultipla(perguntaData, pergunta.id)
            break;
        default:
            break;
    }
}