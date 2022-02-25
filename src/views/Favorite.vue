<template>
  <strong class="text-teal-9">Favorite Passwords</strong>
  <q-list bordered separator v-if="storePass.passwordFavorite.length > 0">
    <q-item v-for="(password, index) in storePass.passwordFavorite" :key="index">
      <q-item-section avatar>
        <q-icon name="favorite" color="teal-9" />
      </q-item-section>
      <q-item-section>{{ password.p_value }}</q-item-section>
      <q-item-section side>
        <q-btn
          flat
          round
          color="teal-9"
          icon="delete"
          size="20px"
          @click="storePass.deletePassword(password.id)"
        />
      </q-item-section>
    </q-item>
  </q-list>

  <div v-else class="q-pa-md q-gutter-xs">
    <div class="q-gutter-md row justify-center" style="font-size: 2em">
      <q-spinner-ball color="teal-9" size="xl" />
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'
import { sPassword } from "../stores/password";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { deleteDoc,doc } from "firebase/firestore";
import { db } from "../main";
const router = useRouter()
const storePass = sPassword();
const auth = getAuth();
const authListerner = onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert('you must be logged in to view this. redirecting to the home page')
    router.push('/')
  } else {
    storePass.setPId(user.uid);
    storePass.getPasswords();
  }
});
onBeforeUnmount(() => {
  authListerner();
})


async function deletePassword(id) {
  try {
    console.log(id);
    await deleteDoc(doc(db, "passwords", id));
  } catch (error) {
    console.error(error);
  }
}


</script>
<style scoped>
strong{
  font-size: 30px;
}

@media only screen and (max-width:500px) {
  strong{
    font-size: 25px;
  }
}
@media only screen and (max-width:396px) {
  strong{
    font-size: 20px;
  }
}
@media only screen and (max-width:328px) {
  strong{
    font-size: 17px;
  }
}
</style>