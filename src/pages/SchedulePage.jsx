import NavigationHeader from "../navigation/MainNavigation";
import styles from "./SchedulePage.module.css";
import {
    getUserFromDatabase,
    addUser,
    userPath,
    postUser,
} from "../utils/dbCalls";
import { useEffect, useRef, useState } from "react";
import UserCard from "../component/userCard";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { database } from "..";

function SchedulePage() {
    const [users, setUsers] = useState([]);
    const [scheduleUsers, setScheduleUsers] = useState([]);
    const [reserveUsers, setReserveUsers] = useState([]);

    const itemOnDrag = useRef();
    const listOverItem = useRef();
    const listLeftItem = useRef();

    const  usersDB= useRef([]);

    async function updateDbSchedule(Schedulepath,users) {
        const storedScheduleId = await getDocs(
            collection(database, userPath(), Schedulepath)
        ).then((shot) => {
            let temp = [];
            shot.docs.map((doc) => temp.push(doc.id));
            return temp;
        });

        storedScheduleId.map(async (id) => {
            await deleteDoc(doc(database, userPath(), Schedulepath, id));
        });

        users.map(async (user) => {
            console.log(user.id);
            //  if (storedScheduleId.includes(user.id)) return;
            return await postUser(
                user,
                doc(database, userPath(), Schedulepath, user.id)
            );
        });
        console.log(
            "database : ",
            storedScheduleId,
            "schedule : ",
            users
        );
    }

    useEffect(() => {

        getUserFromDatabase('schedule1').then((value) => setUsers(value));
        getUserFromDatabase('schedule2').then((value) => setScheduleUsers(value));
        getUserFromDatabase('schedule3').then((value) => setReserveUsers(value));
        getUserFromDatabase().then(users=>{usersDB.current=[...users] }).then(()=>console.log(usersDB));
    }, []);

    function startDrag(position, leftItem) {
        itemOnDrag.current = position;
        listOverItem.current = null;
        listLeftItem.current = leftItem;
    }

    function drop() {
        const listRef = listOverItem.current;
        const listLeftRef = listLeftItem.current;

        console.log(listRef,listLeftRef,usersDB.current.find(value=>value.id==itemOnDrag.current),usersDB)

        if (listRef.list == null || listLeftRef.list == listRef.list){console.log('dropped in same area'); return;}
        try{ listRef.set([...listRef.list, usersDB.current.find(value=>value.id==itemOnDrag.current)]);
        listLeftRef.set(
            listLeftRef.list.filter(
                (value) => value.id != itemOnDrag.current
            )
        );
        itemOnDrag.current = null;}
        catch(error){console.log(error)}
       
    }

    function enterDrag(Setlist, list) {
        listOverItem.current = { set: Setlist, list: list };
    }

    function ColumnDragAndDrop({ setList, list, name }) {
        let prova = { cursor: "grab" };

        return (
            <div
                className={styles.Column}
                onDragEnter={() => enterDrag(setList, list)}
            >
                <h3>{name}</h3>
                <button onClick={() => setList([])}> cancella tutto </button>
                {list.map((value) => (
                    <div
                        className={styles.card}
                        draggable
                        onDragExit={() => {
                            if (listOverItem.current == list)
                                listOverItem.current = null;
                        }}
                        onDragEnd={drop}
                        onDragStart={() =>
                            startDrag(value.id, { set: setList, list: list })
                        }
                    >
                        <UserCard
                            style={prova}
                            removeHandle={() =>
                                setList(list.filter((v) => v != value))
                            }
                            user={value}
                            isFilter={true}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div style={{ width: "full", height: "full" }}>
            <NavigationHeader />
            <div className={styles.title}><h1 className={styles.name}>Schedari</h1>
            <button onClick={()=>{updateDbSchedule('schedule2',scheduleUsers).then(()=>updateDbSchedule('schedule3',reserveUsers))
            .then(()=>updateDbSchedule('schedule1',users)).then(alert('disposizione salvata'));
            }}>salva disposizione</button>
            <button onClick={()=>{getUserFromDatabase().then(value=>setUsers(value))
                .then(()=>{setReserveUsers([]);setScheduleUsers([])})}}>resetta</button>
            </div>
            
            <div className={styles.main}>
                    <ColumnDragAndDrop
                        setList={setUsers}
                        list={users}
                        name="archivio"
                    />

                <ColumnDragAndDrop
                    setList={setScheduleUsers}
                    list={scheduleUsers}
                    name="schedario principale"
                />
                <ColumnDragAndDrop
                    setList={setReserveUsers}
                    list={reserveUsers}
                    name="schedario riservato"
                />
            </div>
        </div>
    );
}

export default SchedulePage;
