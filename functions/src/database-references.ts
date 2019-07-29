import * as admin from 'firebase-admin';

admin.initializeApp();
const databaseReferences = admin.firestore();

export default class DatabaseReferences{
    //referencia geral
    public static db = databaseReferences;
    //referencias auxiliares
    public static usuariosRef = databaseReferences.collection('Usuario');
    public static pefilRef = databaseReferences.collection('Perfil');
    public static uploadRef = databaseReferences.collection('Upload');
    public static usuarioPerfilRef = databaseReferences.collection('UsuarioPerfil');
}