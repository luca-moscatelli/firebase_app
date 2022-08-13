
import { collection, addDoc } from "firebase/firestore"; 
import { useRef } from "react";
import styles from './createUser.module.css'


import { auth, database } from "..";
import { Navigate } from "react-router-dom";
import NavigationHeader from "../navigation/MainNavigation";
import { sendEmailVerification } from "firebase/auth";

const CreateUser=(props)=>{

   async function postUser(db,data){

        try {
          const docRef = await addDoc(collection(db, "users",auth.currentUser.uid,"usersData"), {
            first: data.first,
            last: data.last,
            born: data.born
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

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
      postUser(database,data);
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

    return <div style={{width:'full',height:'full'}}><NavigationHeader/>
       <h1 style={{textTransform:'uppercase'}}> creazione utente</h1>
        <form onSubmit={submitHandle}>
          <div>
          <div>  <span>nome : </span> <input type={'text'} ref={name}></input></div>
         
          <div>  <span>cognome : </span> <input type={'text'}ref={secondName}></input></div>
         
          <div>  <span>data di nascita : </span> <input type={'number'}ref={bornDate}></input></div>
         </div>
        <button  style={{marginLeft:'20px'}}>carica nuovo utente</button>
        </form>

        
    </div>
}

export default CreateUser;