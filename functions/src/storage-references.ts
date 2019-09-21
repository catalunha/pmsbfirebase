import * as admin from 'firebase-admin';

admin.initializeApp();

const storage = admin.storage();
storage.bucket()
