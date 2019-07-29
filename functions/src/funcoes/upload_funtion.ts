import DatabaseReferences from "../database-references";

export async function iniciarAlterarUploadFunction(uploadSnap: any) {
    const snapBeforeData = uploadSnap.before.data();
    const snapAfterData = uploadSnap.after.data();
    if (snapBeforeData.upload == false && snapAfterData.upload == true) {
        getCollectionPartirUpload(uploadSnap.after.data(), uploadSnap.after.id);
    }
}

function getCollectionPartirUpload(uploadSnapData: any, uploadSnapId: any) {
    let aux: string = uploadSnapData.updateCollection.field;
    let fields = aux.split('.');
    //fields[0] - doc id ,  fields[1 ao 2] - campos
    DatabaseReferences.db.collection(uploadSnapData.updateCollection.collection).doc(fields[0]).get().then(doc => {
        if (doc.exists) {
            let docData: any = doc.data();
            console.log('Document data:', docData);
            console.log('Document data field value:', docData[fields[1]][fields[2]]);
        } else {
            console.log('No such document!');
        }
    }).catch(err => {
        console.log('Error getting document', err);
    });
}