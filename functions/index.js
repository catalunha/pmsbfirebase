/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.firestore();

//variaveis universais
var usuarios_lista = {}

//referencias auxiliares - referentes ao banco de dados
var opcao_referencia = { 'cargo': 'cargos', 'eixo': 'eixos' }
var destinatario_referencia = { 'cargo': 'cargo', 'eixo': 'eixoAtual' }


//referencias ao banco de dados
var usuarios = db.collection('usuario_teste')
var noticia_usuarios = db.collection('noticias_usuarios_teste')

//funcoes

exports.enviarNoticiaUsuario = async (id, noticia_ref, user_ref) => {
    noticia_usuarios.doc(id).set({
        noticia: noticia_ref,
        userId: user_ref,
        visualizada: false
    })
}

exports.enviarNoticiaUsuarioLista = (noticia) => {
    console.log({usuarios_lista_final:usuarios_lista})
    for (var [key, value] of Object.entries(usuarios_lista)) {
        var user = usuarios_lista[key];
        console.log({ 'id': user})
        this.enviarNoticiaUsuario(user.id + "_" + noticia.id, noticia.ref, user.ref)
    }
}

exports.enviarNoticiaTodoUsuarios = async (noticia_snap) => {
    await usuarios.get().then((snap) => {
        snap.forEach((doc) => {
            console.log('   - novo noticia usuario : ' + doc.id);
            this.enviarNoticiaUsuario(noticia_snap.ref, doc.ref)
        });
    }).catch((err) => {
        console.log('Error getting usuarios-enviarNoticiaTodoUsuarios', err);
    });
}

exports.adcionarUsuariosLista = async (user) => {
    if (user) {
        var verificar_usuario = usuarios_lista.filter((usuario_filtro) => { return user.id === usuario_filtro.id })
        if (verificar_usuario.length <= 0) {
            await usuarios_lista.push(user)
        }
    }
}

exports.filtrarPorOpcao = async (noticia, noticia_snap) => {

    usuarios_lista = {}
    await noticia.destinatarios.forEach((not, index_dest, array_dest) => {
        var idRef = not.destinatario.id;
        console.log({ Id_ref: idRef })
        var teamDbRef = db.collection(opcao_referencia[not.opcao]).doc(idRef);
        usuarios.where(destinatario_referencia[not.opcao], '==', teamDbRef).get().then(async (usuarios_filtrados) => {
            usuarios_filtrados.docs.forEach(async (user, index_filt, array_filt) => {
                usuarios_lista[user.id] = user;
                if ((index_dest+1 >= array_dest.length) && (index_filt+1 >= array_filt.length)) {
                    await this.enviarNoticiaUsuarioLista(noticia_snap)
                }
            })
        }).catch((err) => {
            console.log('Error getting documents', err);
        });

    });
}

exports.sendNoticias = functions.firestore.document('noticias_teste/{noticiaId}').onCreate(
    async (noticia_snap) => {
        //pega os dados do banco
        var usuarios = db.collection('usuario_teste')
        var noticia_usuarios = db.collection('noticias_usuarios_teste')
        const noticia = noticia_snap.data();

        //filtra os dados recebidos do banco e verifica se todos estao marcados
        var resultado_filtro_todos = await noticia.destinatarios.filter((data) => { return data.opcao === 'todos' });

        //se todos marcados entao mandar noticias para todos
        if (resultado_filtro_todos.length > 0) {
            console.log('resultado_filtro_todos foi identificado')
            await this.enviarNoticiaTodoUsuarios(noticia_snap)
        } else {
            console.log("INICIO")
            await this.filtrarPorOpcao(noticia, noticia_snap).then(() => {
                console.log({ lista_final: usuarios_lista })
            })
            await console.log("FIM")
        }
    });