
import { createUserWithEmailAndPassword,sendSignInLinkToEmail,sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { auth, database } from "../..";
import styles from "./loginPage.module.css";

function SignUpPage(props) {
    const emailRef = useRef();
    const passWordRef = useRef();
    const nameRef = useRef();

    useEffect(() => {
        if (auth.currentUser != null) {
            console.log("auth.currentUser");
            window.location.href = "main";
        }
    }, []);

    async function writeUserData(userId, email, name) {
        const ref = doc(database, "/users/" + userId);

        await setDoc(ref, {
            email: email,
            name: name,
        });
    }

  

    function submitHandle(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passWordRef.current.value;
        const name = nameRef.current.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                console.log(userCredential.user.uid);
                return userCredential.user;
            })
            .then((user) => {
                return writeUserData(user.uid, user.email, name);
            })
            .then(() => (window.location.href = "main"))
            .catch((error) => console.log(error));
    }

    return (
        <section>
            <div className={styles.divFromLog}>
                <h1>benvenuto in questa app prego iscriviti</h1>
                <form onSubmit={submitHandle}>
                    <span>email : </span>
                    <input type={"text"} ref={emailRef}></input>
                    <span>nome : </span>
                    <input type={"text"} ref={nameRef}></input>
                    <span>password: </span>
                    <input type={"password"} ref={passWordRef}></input>
                    <i id="togglePassword"></i>
                    <button>iscriviti</button>
                </form>
                {/* <button onClick={()=>{writeUserData('poro','michele')}}>test</button> */}
            </div>
        </section>
    );
}

export default SignUpPage;
