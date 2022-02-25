import { defineStore } from "pinia";
import { addDoc, collection, onSnapshot,deleteDoc,doc } from "firebase/firestore";
import { db } from "../main";

export const sPassword = defineStore({
    id: "passwordStore",
    state: () => ({
        password: '',
        p_uid: '',
        passwordFavorite: []
    }),
    actions: {
        setPId(uid) {
            this.p_uid = uid;
        },
        getPasswords() {
            onSnapshot(
                collection(db, "passwords"),
                (querySnapshot) => {
                    let favorites = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    this.passwordFavorite=[];
                    for (let index = 0; index < favorites.length; index++) {
                        if (favorites[index].p_id === this.p_uid) {
                            this.passwordFavorite.push(favorites[index]);
                        }
                    }
                },
                (err) => {
                    alert(err.message);
                    console.error(err);
                }
            );
        },
        async savePassword() {

            try {
                await addDoc(collection(db, "passwords"), {
                    p_id: this.p_uid,
                    p_value: this.password,
                    createdAt: Date.now(),
                });
            } catch (error) {
                alert(error.message);
                console.error(error);
            }
        },
        async deletePassword(pid) {
            try {
                console.log(pid);
                await deleteDoc(doc(db, "passwords", pid));
                this.getPasswords();
            } catch (error) {
                console.error(error);
            }
        }
    }
})
