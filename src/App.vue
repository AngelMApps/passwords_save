<template>
  <div>
    <nav>
      <strong>Passwords App</strong>
      <div class="div-routes">
        <router-link to="/" class="routes">Create Password</router-link>
        <span v-if="store.isLoggedIn">
          <router-link to="/favorite" class="routes">Favorite</router-link>
        </span>
        <span v-if="store.isLoggedIn">
          <button class="btn-auth" @click="signout">Logout</button>
        </span>
        <template v-else>
          <router-link to="/register" class="routes">Register</router-link>
          <router-link to="/sign-in" class="routes">Login</router-link>
        </template>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { sUser } from './stores/user'

const store = sUser()

const router = useRouter()

onMounted(() => {
  store.validateUser()
});

const signout = () => {
  store.auth.signOut();
  router.push('/')
}
</script>

<style scope>
nav {
  position: fixed;
  top: 0;
  display: flex !important;
  padding: 0px 0px 0px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #00695c;
  height: 3rem;
  color: #fff;
}
strong {
  font-size: 20pt;
}
.routes {
  color: #fff;
  text-decoration: none;
  transition: color ease-in-out 0.5s;
}
.routes:hover {
  color: #97f3df;
  transition: color ease-in-out 0.5s;
}

.div-routes {
  height: 100%;
  width: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.btn-auth {
  border: 3px solid transparent;
  border-radius: 35px;
  padding: 5px 10px;
  color: #fff;
  background-color: #37a09b;
  transition: color ease-in-out 0.5s, border ease-in-out 0.5s,
    border-radius ease-in-out 0.5s, background-color ease-in-out 0.5s;
}
.btn-auth:hover {
  border: 3px solid #97f3de;
  border-radius: 5px;
  color: #97f3df;
  background-color: transparent;
}

@media only screen and (max-width: 550px) {
  nav {
    padding: 10px 0px 0px 0px;
    height: 7rem;
    flex-direction: column;
  }
}
</style>
