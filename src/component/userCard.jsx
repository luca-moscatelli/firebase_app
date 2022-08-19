import { useState } from 'react';
import styles from './userCard.module.css'

function UserCard({user,removeHandle,isActive,isFilter,deleteWord}){

    if(user==undefined) return <></>;
    if(deleteWord==undefined) deleteWord='elimina';

    

    return <div className={styles.card} style={{backgroundColor:isActive?'greenyellow':isFilter?'':'red'}}>
        <div><span>Nome : {user.first} <style></style></span></div>
        <div><span>Cognome : {user.last}</span></div>
        <div><span>Data di nascita : {user.born}</span></div>
        <button onClick={removeHandle}>{deleteWord}</button>
    </div>

}

export default UserCard;