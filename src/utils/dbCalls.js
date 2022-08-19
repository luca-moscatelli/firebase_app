import { async } from "@firebase/util";
import {
    collection,
    deleteDoc,
    getDocs,
    orderBy,
    query,
    addDoc,
    setDoc,
    DocumentReference,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { auth, database } from "..";

export async function getUserFromDatabase(segmentPath) {
    const UserCol = collection(
        database,
        "users",
        auth.currentUser.uid,
        segmentPath == undefined ? "usersData" : segmentPath
    );

    const q = query(UserCol);
    const UserSnapshot = await getDocs(q);
    const UserList = UserSnapshot.docs.map((doc) => {
        const data = doc.data();
        data["ref"] = doc.ref;
        data["id"] = doc.id;
        data["filter"] = true;
        return data;
    });

    return UserList;
}

export async function db_getNColumn() {
    try {
        const docRef = doc(database, userPath());

        const Snapshot = await getDoc(docRef);

        return Snapshot.data().n_Column;
    } catch (e) {
        console.log(e);
    }
}

export async function db_setNcolumn(nColumn) {

  const nCol=parseInt(nColumn);

    try {
        const docRef = doc(database, userPath());

        await updateDoc(docRef, { n_Column: nCol});

        console.log("done");
    } catch (e) {
        console.log(e);
    }
}

export async function addUser(data, collection) {
    try {
        const docRef = await addDoc(collection, {
            first: data.first,
            last: data.last,
            born: data.born,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function postUser(data, documentRef) {
    try {
        const docRef = await setDoc(documentRef, {
            first: data.first,
            last: data.last,
            born: data.born,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getUserBornFromDatabase() {
    const UserCol = collection(
        database,
        "users",
        auth.currentUser.uid,
        "usersData"
    );
    const q = query(UserCol, orderBy("born", "desc"));
    const UserSnapshot = await getDocs(q);
    const bornData = UserSnapshot.docs.map((doc) => {
        const data = doc.data();
        return data.born;
    });
    return console.log(bornData);
}

export function userPath() {
    return "users/" + auth.currentUser.uid;
}
