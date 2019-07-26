import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

export default class DatabaseReferences{
    public static usuariosRef = db.collection('Usuario');
    public static pefilRef = db.collection('Perfil');
    public static usuarioPerfilRef = db.collection('UsuarioPerfil');
}