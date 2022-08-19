import NavigationHeader from "../navigation/MainNavigation";
import styles from "./SchedulePage.module.css";
import {
    getUserFromDatabase,
    addUser,
    userPath,
    postUser,
    db_setNcolumn,
    db_getNColumn,
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
    const [reserveUsers1, setReserveUsers1] = useState([]);
    const [reserveUsers2, setReserveUsers2] = useState([]);
    const [done,setDone]=useState(false);
    const [column, setColumn] = useState(0);

    const itemOnDrag = useRef();
    const listOverItem = useRef();
    const listLeftItem = useRef();
    const nColumnDragRef = useRef(3);
    const useEffectCalls=useRef(0);

    const usersDB = useRef([]);

    const exe = [];

    exe.push(
        <ColumnDragAndDrop setList={setUsers} list={users} name="archivio" />
    );
    exe.push(
        <ColumnDragAndDrop
            setList={setScheduleUsers}
            list={scheduleUsers}
            name="schedario principale"
        />
    );
    exe.push(
        <ColumnDragAndDrop
            setList={setReserveUsers}
            list={reserveUsers}
            name="schedario riservato"
        />
    );
    exe.push(
        <ColumnDragAndDrop
            setList={setReserveUsers1}
            list={reserveUsers1}
            name="schedario riservato 1"
        />
    );  exe.push(
        <ColumnDragAndDrop
            setList={setReserveUsers2}
            list={reserveUsers2}
            name="schedario riservato 2"
        />
    );

    async function updateDbSchedule(Schedulepath, users) {
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
        console.log("database : ", storedScheduleId, "schedule : ", users);
    }

    function checkedUseEffectCall(){
        useEffectCalls.current++;
        if(useEffectCalls.current>=7) setDone(true);
    }

    useEffect(() => {
        useEffectCalls.current=0;
        console.log(useEffectCalls.current)
        db_getNColumn().then((value)=>setColumn(value)).then(checkedUseEffectCall)
        getUserFromDatabase("schedule1").then((value) => setUsers(value)).then(checkedUseEffectCall);
        getUserFromDatabase("schedule2").then((value) =>
            setScheduleUsers(value)
        ).then(checkedUseEffectCall);
        getUserFromDatabase("schedule3").then((value) =>
            setReserveUsers(value)
        ).then(checkedUseEffectCall);
        getUserFromDatabase("schedule4").then((value) =>
        setReserveUsers1(value)
    ).then(checkedUseEffectCall); getUserFromDatabase("schedule5").then((value) =>
    setReserveUsers2(value)
).then(checkedUseEffectCall);
        getUserFromDatabase()
            .then((users) => {
                usersDB.current = [...users];
            })
            .then(() => console.log(usersDB)).then(checkedUseEffectCall);
    }, []);

    function startDrag(position, leftItem) {
        itemOnDrag.current = position;
        listOverItem.current = null;
        listLeftItem.current = leftItem;
    }

    function changeNColumn() {
        const nCol=nColumnDragRef.current.value;
        if (nCol) setColumn(nCol);
       console.log(nCol);
    }

    function drop() {
        const listRef = listOverItem.current;
        const listLeftRef = listLeftItem.current;

        console.log(
            listRef,
            listLeftRef,
            usersDB.current.find((value) => value.id == itemOnDrag.current),
            usersDB
        );

        if (listRef.list == null || listLeftRef.list == listRef.list) {
            console.log("dropped in same area");
            return;
        }
        try {
            listRef.set([
                ...listRef.list,
                usersDB.current.find((value) => value.id == itemOnDrag.current),
            ]);
            listLeftRef.set(
                listLeftRef.list.filter(
                    (value) => value.id != itemOnDrag.current
                )
            );
            itemOnDrag.current = null;
        } catch (error) {
            console.log(error);
        }
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
            <NavigationHeader />{done&&<div>
            <div className={styles.title}>
                <h1 className={styles.name}>Schedari</h1>
                <button
                    onClick={() => {
                        updateDbSchedule("schedule2", scheduleUsers)
                            .then(() =>
                                updateDbSchedule("schedule3", reserveUsers)
                            )
                            .then(() => updateDbSchedule("schedule1", users))
                            .then(() => updateDbSchedule("schedule4", reserveUsers1))
                            .then(() => updateDbSchedule("schedule5", reserveUsers2))
                            .then(()=>db_setNcolumn(column))
                            .then(alert("disposizione salvata"));
                    }}
                >
                    salva spostamenti
                </button>
                {/* <input type={"number"} ref={nColumnDragRef}></input>
                <button
                    onClick={() => changeNColumn(nColumnDragRef.current.value)}
                >
                    numero
                </button> */}
                <select  ref={nColumnDragRef} defaultValue={column} onChange={changeNColumn}>
                    <option  value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button
                    onClick={() => {
                        getUserFromDatabase()
                            .then((value) => setUsers(value))
                            .then(() => {
                                setReserveUsers([]);
                                setScheduleUsers([]);
                            });
                    }}
                >
                    resetta
                </button>
            </div>

            <div className={styles.main}>
                {exe.map((value, index) => {
                    if (index < column) return value;
                })}
            </div>
            </div>
}
        </div>
    );
}

export default SchedulePage;
