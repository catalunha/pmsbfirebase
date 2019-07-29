import DatabaseReferences from "../database-references";

export function criarRelacaoComPerfil(perfilRef: any, perfilId: any) {
    console.log("perfilId >> " + perfilId.id);
    _verificarAtualizarSePerfilJaTemRelacaoUsuarioPerfil(perfilId.id, perfilRef).then((usuarioPerfil: any) => {
        console.log("USUARIO FILTRADOS DEPOIS PROMISE : " + usuarioPerfil.length);
    }).catch(() => {
        //console.log("USUARIO NAO ENCONTRADOS");
        _criarRelacaoPerfilComUsuarioPerfil(perfilRef);
    });
};

/**
 * CRIACAO DE DA RELACAO PERFIL COM USUARIO PERFIL
 */

export function _criarRelacaoPerfilComUsuarioPerfil(perfilRef: any) {
    DatabaseReferences.usuariosRef.get().then((snap: any) => {
        snap.forEach((user: any) => {
            _criarNovoDocUsuarioPerfil(perfilRef, user);
        });
    }).catch((err: any) => {
        console.log('Error getting usuarios-enviarNoticiaTodoUsuarios', err);
    });
}

export function _criarNovoDocUsuarioPerfil(perfilRef: any, usuarioRef: any) {
    const perfilData = perfilRef.data();
    const usuarioData = usuarioRef.data();

    DatabaseReferences.usuarioPerfilRef.doc().set({
        perfilID: {
            contentType: perfilData.contentType,
            id: perfilRef.id,
            nome: perfilData.nome,
        },
        usuarioId: {
            id: usuarioRef.id,
            nome: usuarioData.nome
        }
    }).then(() => {
        console.log("RELACAO CRIADA : PERFIL >> USUARIOPERFIL : " + usuarioData.nome)
    })
}

/**
 * ALTERACAO DE DADOS DA RELACAO DE PERFIL COM USUARIOPERFIL QUE JA EXISTEM
 */

export function _verificarAtualizarSePerfilJaTemRelacaoUsuarioPerfil(idPerfil: string, perfilRef: any) {
    return new Promise((resolve, reject) => {
        DatabaseReferences.usuarioPerfilRef.where('perfilID.id', '==', idPerfil).get().then(async (usuarios_perfil_filtrados: any) => {
            if (usuarios_perfil_filtrados.docs.length > 0) {
                usuarios_perfil_filtrados.docs.forEach(async (perfilUsuario: any, index_filt: any, array_filt: any) => {
                    //console.log(">> usuarios_perfil_filtrados >>" + JSON.stringify(user));
                    console.log("---------\nPERFIL-ID >> " + perfilUsuario.id);
                    _atualizarDadosUsuariosPerfil(perfilUsuario, perfilRef);
                    if (index_filt >= array_filt.length) {
                        resolve(usuarios_perfil_filtrados);
                    }
                })
            } else {
                reject()
            }
        }).catch((err: any) => {
            console.log('Error getting documents', err);
        });
    });
}

export function _atualizarDadosUsuariosPerfil(perfilUsuario: any, perfilRef: any) {
    const perfilData = perfilRef.data()

    DatabaseReferences.usuarioPerfilRef.doc(perfilUsuario.id).update({
        "perfilID.contentType": perfilData.contentType,
        "perfilID.nome": perfilData.nome
    })
}

/**
 * REMOCAO DE DADOS DA RELACAO DE PERFIL COM USUARIOPERFIL QUE JA EXISTEM
 */

export function _removerRelacoesDePerfilJaTemRelacaoUsuarioPerfil(idPerfil: string) {
    return new Promise((resolve, reject) => {
        DatabaseReferences.usuarioPerfilRef.where('perfilID.id', '==', idPerfil).get().then(async (usuarios_perfil_filtrados: any) => {
            if (usuarios_perfil_filtrados.docs.length > 0) {
                usuarios_perfil_filtrados.docs.forEach(async (perfilUsuario: any, index_filt: any, array_filt: any) => {
                    //console.log(">> usuarios_perfil_filtrados >>" + JSON.stringify(user));
                    console.log("REMOVE >> PERFIL-ID : " + perfilUsuario.id);
                    DatabaseReferences.usuarioPerfilRef.doc(perfilUsuario.id).delete()
                    if (index_filt >= array_filt.length) {
                        resolve(usuarios_perfil_filtrados);
                    }
                })
            } else {
                console.log("REMOVER PERFIL >> PERFIL USUARIO : nao foi encontrado nenhum perfil usuario !");
                reject()
            }
        }).catch((err: any) => {
            console.log('Error getting documents', err);
        });
    });
}