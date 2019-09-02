import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarUpdateCollectionQuestionario(uploadSnap: any) {
    const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    const uploadSnapId = uploadSnap.after.id;

    console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
    console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DE QUESTIONARIO NAS DEMAIS COLLECTIONS")
        //Pergunta
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Pergunta', 'questionario.id', uploadSnapId, { 'questionario.nome': uploadSnapAfterData.nome })

    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE QUESTIONARIO")
    }
}