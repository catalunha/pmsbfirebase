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
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'eixoAtual.eixoID', uploadSnapId, { 'eixoAtual.nome': uploadSnapAfterData.nome })
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'eixo.eixoID', uploadSnapId, { 'eixo.nome': uploadSnapAfterData.nome })
        
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'cargo.cargoID', uploadSnapId, { 'cargo.nome': uploadSnapAfterData.nome })

    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE EIXO")
    }
}