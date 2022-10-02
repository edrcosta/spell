import { collection, doc, setDoc, getDocs, where} from "firebase/firestore"; 
import { query, orderBy, limit } from "firebase/firestore";  
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

    create = (path, data) => setDoc(doc(collection(this.database, path)), data);

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

    find = (path, _limit, orderby) =>{
        const reference = collection(this.database, path);   
        let q;
        if(_limit && orderby){
             q = query(reference, orderBy(orderby.field, orderby.order), limit(_limit));
        }else{
            q = reference
        }
        return this.__execQuery(q)
    }

    findWhere = (path, whereClause) => {
        const reference = collection(this.database, path);   
        const q = query(reference, where(whereClause[0], whereClause[1], whereClause[2]));
        return this.__execQuery(q)
    }
}