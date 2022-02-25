<template>
  <strong class="text-teal-9">Create an Account</strong>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>

  <div class="q-pa-md q-gutter-sm">
    <q-btn
      @click="register"
      push
      color="white"
      text-color="teal-9"
      label="Register"
      aria-label="#fff"
    />
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
import { sUser } from '../stores/user'

const email = ref('')
const password = ref('')
const auth = getAuth();
const router = useRouter();

const store = sUser()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      store.iUser = userCredential.user;
      alert('Successfully registered!');
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      alert(errorMessage);
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