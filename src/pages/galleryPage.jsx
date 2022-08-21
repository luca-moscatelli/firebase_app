import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { database } from "..";
import NavigationHeader from "../navigation/MainNavigation";
import { db_addPhoto , userPath } from "../utils/dbCalls";
import styles from './galleryPage.module.css'

function GalleryPage() {
    const [galleryDoc, setGalleryDoc] = useState([]);

    const inputUrlRef=useRef();

    useEffect(() => {
       refreshPage();
    }, []);

    function refreshPage() {
        getDocs(collection(database, userPath(), "gallery")).then((snap) =>
            setGalleryDoc(snap.docs)
        );
    }

    async function deleteAll() {
        await galleryDoc.map(async (doc) => {
            await deleteDoc(doc.ref);
        });
        refreshPage();
    }

    return (
        <div style={{ width: "full", height: "full" }}>
            <NavigationHeader />
            <div>
                <input type={"url"} ref={inputUrlRef}></input>
                <button
                    onClick={() => {
                        db_addPhoto(
                            inputUrlRef.current.value
                        ).then(refreshPage);
                    }}
                >
                    aggiungi foto
                </button>
                <button onClick={deleteAll}>cancella tutto</button>
                <div className={styles.images}>
                    {galleryDoc.map((doc) => {
                        return (
                            <img
                                src={doc.data().url}
                                width={300}
                                height={300}
                            ></img>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default GalleryPage;
