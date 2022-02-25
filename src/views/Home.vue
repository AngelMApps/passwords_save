<template>
  <div class="home">
    <div class="q-pa-sm">
      <div class="column items-center">
        <div class="container-select q-mb-md">
          <q-select
            color="teal-9"
            label="caracteres"
            title="caracteres"
            transition-show="flip-up"
            transition-hide="flip-down"
            filled
            v-model="model"
            :options="options"
            :options-dense="denseOpts"
          />
        </div>
        <div class="q-gutter-sm col-6 check-div">
          <q-checkbox dense v-model="mayus" label="Mayusculas" title="Mayusculas" color="teal-9" />
          <q-checkbox
            dense
            v-model="cEspeciales"
            label="Caracteres Especiales"
            title="Caracteres Especiales"
            color="teal-9"
          />
          <q-checkbox dense v-model="numbers" label="Numeros" title="Numeros" color="teal-9" />
        </div>
      </div>
    </div>

    <div class="column justify-evenly q-ma-lg" v-if="storePass.password !== ''">
      <span class="text-teal-9 text-h4">Contraseña:</span>
      <strong class="text-teal-6 text-password">{{ storePass.password }}</strong>
      <div style="display: flex;justify-content: center;align-items: center;">
        <q-btn push color="white" text-color="teal-9" round icon="favorite" @click="savefavorite" />
      </div>
    </div>
    <div class="q-pa-md q-gutter-xs" v-else>
      <div class="q-gutter-md row justify-center" style="font-size: 2em">
        <q-spinner-puff color="teal-9" class="spinner" />
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        @click="getPassword"
        push
        color="white"
        text-color="teal-9"
        label="Password"
        aria-label="#fff"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { sUser } from '../stores/user';
import { sPassword } from "../stores/password";


const router = useRouter();
const store = sUser();
const storePass = sPassword();
let arrayPassword = reactive([]);
let mayus = ref(false);
let cEspeciales = ref(false);
let numbers = ref(false);
let model = ref(null);
let denseOpts = true;
let options = [
  '6', '7', '8', '9', '10', '11', '12', '13', '14'
];



const getPassword = () => {
  axios(`https://backend-passwords.herokuapp.com/password/${model.value}/${mayus.value}/${cEspeciales.value}/${numbers.value}`)
    .then(response => {
      arrayPassword[0] = reactive(response.data);
      storePass.password = arrayPassword[0].password;
      storePass.p_uid = store.iUser.uid;
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    })
}

const savefavorite = () => {
  store.validateUser();
  if (store.iUser.length <= 0) {
    alert('You must be logged in to be able to save the password')
    router.push('/sign-in')
  } else {
    storePass.getPasswords();
    storePass.savePassword();
  }
}

</script>

<style>
.check-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.input-len {
  margin-bottom: 2rem;
}
.container-select {
  width: 30rem;
}
.spinner {
  font-size: 4rem;
}
.text-password{
  font-size: 30px;
}
@media only screen and (max-width: 505px) {
  .container-select {
    width: 90%;
  }
  .check-div {
    width: 90%;
    flex-direction: column;
    align-items: flex-start;
  }
}
@media only screen and (max-width: 275px) {
  .text-password{
    font-size: 25px;
  }
}
</style>