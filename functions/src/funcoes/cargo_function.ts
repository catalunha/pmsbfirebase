import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarUpdateCollectionCargo(uploadSnap: any) {
    const uploadSnapBeforeData = uploadSnap.before.data();
    const uploadSnapAfterData = uploadSnap.after.data();
    const uploadSnapId = uploadSnap.after.id;

    console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
    console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DE USUARIO NAS DEMAIS COLLECTIONS")
        //Usuario
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Usuario', 'cargoID.id', uploadSnapId, { 'cargoID.nome': uploadSnapAfterData.nome })
    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE USUARIO")
    }
}