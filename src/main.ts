import { createApp } from "vue"
import { pinia } from "./stores"
import { supabaseClient } from "./supabase"
import { useUserStore } from "./stores/user"

import App from "./App.vue"
import router from "./router"

import "./assets/main.css"

const nfc = new window.NDEFReader();
console.log(nfc)

const app = createApp(App)

app.use(pinia)
const userStore = useUserStore()
// TODO: tidy up the auth. Currently calling the database on the router when 
// it should be able to do it with the session
// Without the workaround, the auth page doesn't redirect
supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) {
    userStore.setUser(userStore.$state, data.session.user)
    console.log('session', data.session.user)
  } else {
    console.log('no session', data)
    userStore.setUser(userStore.$state, {id: null, email: null} )
  }
})

supabaseClient.auth.onAuthStateChange((_, _session) => {
  if (_session) {
    console.log('_session', _session.user)
    userStore.setUser(userStore.$state, _session.user)
    console.log('store', userStore.$state)
  } else {
    console.log('_', _session)
    userStore.setUser(userStore.$state, {id: null, email: null})
  }
})

app.use(nfc);
app.use(router);



app.mount("#app");
