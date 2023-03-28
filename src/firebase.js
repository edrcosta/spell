import { collection, doc, setDoc,getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default class SpellFirebase {
    app
    database
    firebaseSettings = {
        apiKey: null,
        authDomain: null,
        projectId: null,
        storageBucket: null,
        messagingSenderId: null,
        appId: null,
        measurementId: null,
    };
    
    initialize(settings){
        this.firebaseSettings.apiKey = settings.apiKey;
        this.firebaseSettings.authDomain = settings.authDomain;
        this.firebaseSettings.projectId = settings.projectId;
        this.firebaseSettings.storageBucket = settings.storageBucket;
        this.firebaseSettings.messagingSenderId = settings.messagingSenderId;
        this.firebaseSettings.appId = settings.appId;
        this.firebaseSettings.measurementId = settings.measurementId;

        this.app = initializeApp(this.firebaseSettings);
        this.database = getFirestore(this.app);
    }

    create = (path, data) => {
        const document = doc(collection(this.database, path))
        setDoc(document, data);
        return document
    }

    async __execQuery(q){
        const querySnapshot = await getDocs(q);
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
            ...(doc.data())
          })
        });
        return data
    }

    async getDocument(collectionName, id){
        const collectionRef = collection(this.database, collectionName)
        const docRef = doc(collectionRef, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ?  docSnap.data(): false
    }

    async updateDocument(collectionName, id, data){
        const collectionRef = collection(this.database, collectionName)

        return await updateDoc(doc(collectionRef, id), data);
    }
}