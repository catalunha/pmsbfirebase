import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarControleAcaoOnUpdate(uploadSnap: any) {
    // Antes
    const uploadSnapBeforeData = uploadSnap.before.data();
    // Depois
    const uploadSnapAfterData = uploadSnap.after.data();

    console.log(" NOME CONTROLE ACAO ANTES >> " + uploadSnapBeforeData.nome);
    console.log(" NOME CONTROLE ACAO DEPOIS >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
        console.log("ALTERANDO NOME DO  ACAO")
        DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('ControleAcao', 'referencia', uploadSnapBeforeData.referencia, { 'nome': uploadSnapAfterData.nome })
    } else {
        console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME EM CONTROLEACAO")
    }
}