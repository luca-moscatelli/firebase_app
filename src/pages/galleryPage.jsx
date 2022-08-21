import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { database } from "..";
import NavigationHeader from "../navigation/MainNavigation";
import { db_addPhoto, db_getAllPhoto, userPath } from "../utils/dbCalls";
import styles from './galleryPage.module.css'

function GalleryPage() {
    const [galleryDoc, setGalleryDoc] = useState([]);

    useEffect(() => {
        getDocs(collection(database, userPath(), "gallery")).then((snap) =>
            setGalleryDoc(snap.docs)
        );
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
                <button
                    onClick={() => {
                        db_addPhoto(
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg"
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
