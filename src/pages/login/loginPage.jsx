import {
    isSignInWithEmailLink,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef } from "react";
import { Route, Router, Link } from "react-router-dom";
import { database, auth } from "../..";
import styles from "./loginPage.module.css";

function LoginPage(props) {
    const emailRef = useRef();
    const passWordRef = useRef();

    useEffect(() => {
        if (auth.currentUser != null) {
            console.log("auth.currentUser");
            window.location.href = "main";
        }
    }, []);

    function submitHandle(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passWordRef.current.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => (window.location.href = "main"))
            .then(() => {
                return console.log(" ee");
            })
            .catch((error) => {
                console.log(error.message, auth.currentUser);
                alert('error')
            });
    }

    return (
        <section>
            <div className={styles.divFromLog}>
                <h1>benvenuto in questa app prego loggati</h1>
                <form onSubmit={submitHandle}>
                    <span>email : </span>
                    <input type={"text"} ref={emailRef}></input>
                    <span>password: </span>
                    <input type={"password"} defaultValue='zavorra' ref={passWordRef}></input>
                    <i id="togglePassword"></i>
                    <button>accedi</button>
                    <div>
                        oppure{" "}
                        <Link className={styles.link} to="/SignUp">
                            iscriviti
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LoginPage;
