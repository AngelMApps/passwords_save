<template>
  <strong class="text-teal-9">Login to Your Account</strong>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>

  <div class="q-pa-md q-gutter-sm">
    <q-btn
      @click="signIn"
      push
      color="white"
      text-color="teal-9"
      label="SignIn"
      aria-label="#fff"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
import { sUser } from '../stores/user'

const store = sUser()
// import router
const email = ref('')
const password = ref('')
const errMsg = ref();
const router = useRouter() // get a reference to our vue router

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      store.iUser = userCredential.user;
      console.log('Successfully logged in!');
      console.log(store.iUser.uid);
      router.push('/')
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
      alert(errMsg.value);
    });
}
</script>

<style scoped>
strong {
  font-size: 30px;
}
input {
  border: 2px solid #00695c;
  border-radius: 5px;
  padding: 5px;
}

@media only screen and (max-width: 500px) {
  strong {
    font-size: 25px;
  }
}
@media only screen and (max-width: 396px) {
  strong {
    font-size: 20px;
  }
}
@media only screen and (max-width: 328px) {
  strong {
    font-size: 17px;
  }
}
</style>