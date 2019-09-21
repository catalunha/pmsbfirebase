import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarUpdateCollectionEixo(uploadSnap: any) {
    const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    const uploadSnapId = uploadSnap.after.id;

    console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
    console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DE EIXO NAS DEMAIS COLLECTIONS")
        //Usuario
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'eixoID.id', uploadSnapId, { 'eixoID.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'eixoIDAcesso.id', uploadSnapId, { 'eixoIDAcesso.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'eixoIdAtual.id', uploadSnapId, { 'eixoIdAtual.nome': uploadSnapAfterData.nome })
        //Questionario
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Questionario', 'eixo.id', uploadSnapId, { 'eixo.nome': uploadSnapAfterData.nome })
        //QuestionarioAplicado
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'eixo.id', uploadSnapId, { 'eixo.nome': uploadSnapAfterData.nome })
        //Produto
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Produto', 'eixoID.id', uploadSnapId, { 'eixoID.nome': uploadSnapAfterData.nome })
    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE EIXO")
    }
}