import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const sUser = defineStore({
    id: 'userStore',
    state: () => ({
        isLoggedIn: true,
        errMsg:'',
        email:'',
        password:'',
        iUser: [],
        auth: getAuth(),
    }),
    actions: {
        validateUser() {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.isLoggedIn = true;
                    this.iUser=user;
                } else {
                    this.isLoggedIn = false
                }
            });
        },
    },
})
