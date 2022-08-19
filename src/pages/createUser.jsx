
import { collection, addDoc } from "firebase/firestore"; 
import { useRef } from "react";
import styles from './createUser.module.css'


import { auth, database } from "..";
import { Navigate } from "react-router-dom";
import NavigationHeader from "../navigation/MainNavigation";
import { sendEmailVerification } from "firebase/auth";
import { addUser } from "../utils/dbCalls";

const CreateUser=(props)=>{
    

    const name=useRef();
    const secondName=useRef();
    const bornDate=useRef();

    function submitHandle(event){
      event.preventDefault();
      const data= {
        first: name.current.value,
        last: secondName.current.value,
        born: parseInt(bornDate.current.value)
      }
      addUser(data,collection(
        database,
        "users",
        auth.currentUser.uid,
        "usersData"
    ));
    }

    var actionCodeSettings = {
      url: 'https://response.data.free/?email=' + auth.currentUser.email,
    
    };
   


  function handleSignUpEMail(){
     //sendSignInLinkToEmail(auth,'mlauvbwbcshqrwbnkt@kvhrw.com',actionCodeSettings).catch(error=>console.log(error.message))
     sendEmailVerification(auth.currentUser,actionCodeSettings)
     .then(function() {
         console.log('send')
     })
     .catch(function(error) {
         console.log(error)

     });

  }

    function autoFill(){
      name.current.value='luca'
      secondName.current.value='moscatelli'
      bornDate.current.value=1997
    }

    return <div style={{width:'full',height:'full',marginBottom:'3rem'}}><NavigationHeader/>
       <h1 style={{textTransform:'uppercase'}}> creazione utente</h1>
        <form onSubmit={submitHandle}>
          <div>
          <div>  <span>nome : </span> <input type={'text'} ref={name}></input></div>
         
          <div>  <span>cognome : </span> <input type={'text'}ref={secondName}></input></div>
         
          <div>  <span>data di nascita : </span> <input type={'number'}ref={bornDate}></input></div>
         </div>
        <button  style={{marginLeft:'20px'}}>carica nuovo utente</button>
        </form>
        <button className={styles.autoFill} onClick={autoFill}>riempi in automatico</button>

        
    </div>
}

export default CreateUser;