import {
    collection,
    deleteDoc,
    getDocs,
    query,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, database } from "..";
import styles from "./GetUsers.module.css";
import UserCard from "../component/userCard";
import NavigationHeader from "../navigation/MainNavigation";
import { db_deleteUser, getUserFromDatabase } from "../utils/dbCalls";

const GetUser = () => {
    const [dbUsers, setdbUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [cardActive, setcardActive] = useState("");
    const [filterMode,setFilterMode]=useState('color');

    const filterDateRef = useRef();
    const filterNameRef = useRef();
    const changeNameRef = useRef();
    const filterNameModeRef = useRef();

    

    function filterUser() {

        setcardActive(null);

        if (filterMode=='delete') {
            setUsers(
                dbUsers.filter(
                    (value) =>
                        value.born > filterDateRef.current.value &&
                        value.first.startsWith(filterNameRef.current.value)
                )
            );
        }

        if(filterMode=='color'){

         

            setUsers(
                dbUsers.map(
                    (value) =>{const user=value; if(
                        value.born > filterDateRef.current.value &&
                        value.first.startsWith(filterNameRef.current.value)){
                            user.filter=true;
                            
                        }
                        else user.filter=false;

                        return user;
                    }
                )
            );

        }
    }

    useEffect(() => {
        //  checkLoginUserToPushMainPage();
        console.log(auth.currentUser);
        refreshPage();
    }, []);

    function refreshPage() {
        getUserFromDatabase().then((UserList) => {
            setdbUser(UserList);
            setUsers(UserList);
        });
    }

    function deleteUser(ref) {
      db_deleteUser(ref)
            .then(() => refreshPage())
            .catch((error) => console.log(error));
    }

    function SelectOption() {
        return (
            <select
                ref={filterNameModeRef}
                value={filterMode}
                onChange={() => setFilterMode(filterNameModeRef.current.value)}
            >
                <option value="color">colora</option>
                <option value="delete">elimina</option>
            </select>
        );
    }

    return (
        <div>
            <NavigationHeader />
            <h1 className={styles.title}>utenti caricati</h1>
            <div className={styles.cards}>
                {users.map((value) => (
                    <div onClick={() => setcardActive(value.ref)}>
                        <UserCard
                            user={value}
                            isActive={value.ref === cardActive}
                            isFilter={value.filter}
                            deleteWord='elimina definitivamente'
                            removeHandle={() => {
                                deleteUser(value.id);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <span>quelli nati dopo il : </span>
                    <input
                        ref={filterDateRef}
                        type={"number"}
                        defaultValue={0}
                        onChange={filterUser}
                        style={{ marginRight: "1rem" }}
                    ></input>
                    <span>quelli che si chiamano : </span>
                    <input
                        ref={filterNameRef}
                        type={"text"}
                        defaultValue={""}
                        onChange={() => {
                            filterUser(database);
                        }}
                    ></input>{" "}
                    <SelectOption />
                </div>
            </div>

            <div className={styles.changeName}>
                <span>cambia il nome : </span>{" "}
                <input type={"text"} ref={changeNameRef}></input>
                <button
                    className={styles.backButton}
                    onClick={() => {
                        const user = {
                            ...users.find((user) => user.ref === cardActive),
                        };
                        const ref = user.ref;
                        delete user.ref;
                        delete user.filter;
                        updateDoc(ref, {
                            ...user,
                            first: changeNameRef.current.value,
                        }).then(refreshPage);
                    }}
                >
                    MODIFICA IL NOME
                </button>
            </div>
            <button
                className={styles.backButton}
                onClick={() => {
                    window.location.replace("/");
                }}
            >
                torna indietro
            </button>
        </div>
    );
};

export default GetUser;
