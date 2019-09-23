import DatabaseReferences from "../database-references";


export function iniciarControleTarefaOnUpdate(uploadSnap: any) {
    // Antes
    const uploadSnapBeforeData = uploadSnap.before.data();
    // Depois
    const uploadSnapAfterData = uploadSnap.after.data();

    console.log(" NOME CONTROLE TAREFA ANTES >> " + uploadSnapBeforeData.nome);
    console.log(" NOME CONTROLE TAREFA DEPOIS >> " + uploadSnapAfterData.nome);

    if (uploadSnapBeforeData.concluida == false) {
        if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
            console.log("ALTERANDO NOME DO TAREFA")
            DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('ControleTarefa', 'referencia', uploadSnapBeforeData.referencia, { 'nome': uploadSnapAfterData.nome })
        } else {
            console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME EM CONTROLETAREFA")
        }
    }
    return 0;
}