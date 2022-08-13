import { useState } from 'react';
import styles from './logUserCard.module.css'

function LogUserCard({email}){

    

    return <div className={styles.card}>
        <div><span>EMAIL : {email} <style></style></span></div>
     
    </div>

}

export default LogUserCard;