import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, database, logUser} from "..";
import LogOut from "../component/LogOut";
import LogUserCard from "../component/logUserCard";
import UserCard from "../component/userCard";
import styles from './mainNavigation.module.css'

function NavigationHeader() {

    const [email,setEmail]=useState('load')
    const [done,setDone]=useState(false);

    onAuthStateChanged(auth,(user)=>{if(!done){setEmail(user.email);setDone(true)}});

   

    return (
        <div
            style={{ width: "100vw", height: "60px", backgroundColor: "green",justifyContent:'center',display:'flex' }}
        >
           {true&&<div className={styles.log} ><LogUserCard  email={email}/></div>} 

            <div style={{ flexDirection: "row",fontSize:20,width:'60%'
            ,justifyContent:'space-around',display:'flex' }}>
                <Link to='/addUser' className={styles.link}>  Crea utente </Link>
                <Link to='/getUser' className={styles.link}>  Guarda utenti </Link>
                <Link to='/Schedule' className={styles.link}>  Schedari </Link>
                <Link to='/gallery' className={styles.link}>  galleria presonale </Link>

                <LogOut/>

                  
               
            </div>
        </div>
    );
}

export default NavigationHeader;

