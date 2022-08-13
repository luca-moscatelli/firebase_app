import {
    collection,
    deleteDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, database } from "..";

export async function getUserFromDatabase() {
    const UserCol = collection(
        database,
        "users",
        auth.currentUser.uid,
        "usersData"
    );
    const q = query(UserCol);
    const UserSnapshot = await getDocs(q);
    const UserList = UserSnapshot.docs.map((doc) => {
        const data = doc.data();
        data["ref"] = doc.ref;
        data['filter']=true;
        return data;
    });

    return UserList;
}

export async function getUserBornFromDatabase() {
    const UserCol = collection(
        database,
        "users",
        auth.currentUser.uid,
        "usersData"
    );
    const q = query(UserCol,orderBy('born','desc'));
    const UserSnapshot = await getDocs(q);
    const bornData=UserSnapshot.docs.map((doc)=>{
         const data=doc.data();
         return data.born;
    })
    return console.log(bornData);
}