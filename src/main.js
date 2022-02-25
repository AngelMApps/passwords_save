import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

import {Quasar} from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js

const firebaseConfig = {
    apiKey: "AIzaSyCEW0_ezfzj1lfxTvKKVSkoYNtGyBfT7Qg",
    authDomain: "password-save-auth-db.firebaseapp.com",
    projectId: "password-save-auth-db",
    storageBucket: "password-save-auth-db.appspot.com",
    messagingSenderId: "972107460651",
    appId: "1:972107460651:web:acc3a6fa932619563ffa6e",
    measurementId: "G-TZV40LG65H"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
createApp(App)
    .use(router)
    .use(Quasar, {plugins: {},})
    .use(createPinia())
    .mount('#app')
