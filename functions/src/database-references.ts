import * as admin from 'firebase-admin';

admin.initializeApp();
const databaseReferences = admin.firestore();

export default class DatabaseReferences {
    //referencia geral
    public static db = databaseReferences;

    //referencias auxiliares
    public static usuariosRef = databaseReferences.collection('Usuario');
    public static questionarioAplicadoRef = databaseReferences.collection('QuestionarioAplicado');
    public static PerguntaAplicadaRef = databaseReferences.collection('PerguntaAplicada');

    public static pefilRef = databaseReferences.collection('Perfil');
    public static uploadRef = databaseReferences.collection('Upload');
    public static usuarioPerfilRef = databaseReferences.collection('UsuarioPerfil');
    public static documentoRef = databaseReferences.collection('Documento');

    public static setorCensitarioPainelRef = databaseReferences.collection('SetorCensitarioPainel');
    public static painelRef = databaseReferences.collection('Painel');
    public static setorCensitarioRef = databaseReferences.collection('SetorCensitario');

    public static questionarioRef = databaseReferences.collection('Questionario');
    public static perguntaRef = databaseReferences.collection('Pergunta');
    public static eixoRef = databaseReferences.collection('Eixo');

    public static controleTarefaRef = databaseReferences.collection('ControleTarefa');
    public static controleAcaoRef = databaseReferences.collection('ControleAcao');


    public static atualizarNomeDeCollectionEmOutrasCollections(collectionNome: any, whereRefId: any, novaRefId: any, updateJsonData: any) {
        this.db.collection(collectionNome).where(whereRefId, '==', novaRefId).get().then(async (dadosFiltrado: any) => {
            if (dadosFiltrado.docs.length > 0) {
                dadosFiltrado.docs.forEach(async (dadoFiltrado: any, index_filt: any, array_filt: any) => {
                    this.db.collection(collectionNome).doc(dadoFiltrado.id).update(updateJsonData).then(() => {
                        //console.log("ATUALIZAR NOME COLECTION " + collectionNome + " >> " + dadoFiltrado.id);
                    })
                })
            }
        }).catch((err: any) => {
            console.log('Error getting documents : atualizarNomeUsuarioEmCollection ', err)
        })

    }

    public static atualizarDadosDeCollectionEmOutrasCollectionsMerge(collectionNome: any, whereRefId: any, novaRefId: any, updateJsonData: any) {
        this.db.collection(collectionNome).where(whereRefId, '==', novaRefId).get().then(async (dadosFiltrado: any) => {
            if (dadosFiltrado.docs.length > 0) {
                dadosFiltrado.docs.forEach(async (dadoFiltrado: any, index_filt: any, array_filt: any) => {
                    this.db.collection(collectionNome).doc(dadoFiltrado.id).set(updateJsonData,{merge:true}).then(() => {
                        //console.log("ATUALIZAR NOME COLECTION " + collectionNome + " >> " + dadoFiltrado.id);
                    })
                })
            }
        }).catch((err: any) => {
            console.log('Error getting documents : atualizarNomeUsuarioEmCollection ', err)
        })

    }

    public static apagarDocDeCollectionEmOutrasCollections(collectionNome: any, whereRefId: any, novaRefId: any) {
        this.db.collection(collectionNome).where(whereRefId, '==', novaRefId).get().then(async (dadosFiltrado: any) => {
            if (dadosFiltrado.docs.length > 0) {
                dadosFiltrado.docs.forEach(async (dadoFiltrado: any, index_filt: any, array_filt: any) => {
                    this.db.collection(collectionNome).doc(dadoFiltrado.id).delete().then(() => {
                        console.log("DELETAR DOC NA COLECTION " + collectionNome + " >> " + dadoFiltrado.id);
                    })
                })
            }
        }).catch((err: any) => {
            console.log('Error getting documents : apagarDocDeCollectionEmOutrasCollections ', err)
        })

    }
}