import { createRouter, createWebHistory } from "vue-router"
import { useSessionStore } from "../stores/session"
import { supabaseClient } from "../supabase"
import { pinia } from "../stores"
import Welcome from "../views/Welcome.vue"
import Name from "../views/Name.vue"
import ClubsAvailable from "../views/ClubsAvailable.vue"
import Photo from "../views/Photo.vue"
import Contact from "../views/Contact.vue"
import Profile from "../views/Profile.vue"
import Summary from "../views/Summary.vue"
import Auth from "../views/Auth.vue"

const sessionStore = useSessionStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/",
      name: "welcome",
      component: Welcome,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/name",
      name: "name",
      component: Name,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/clubs-available",
      name: "clubs-available",
      component: ClubsAvailable,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/photo",
      name: "photo",
      component: Photo,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/summary",
      name: "summary",
      component: Summary,
      meta: {
        requiresAuth: true,
      }
    },
  ],
})

supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) {
    sessionStore.setSession(sessionStore.$state, data.session)
  } else {
    // TODO create a an action in the store to do this
    sessionStore.setSession(sessionStore.$state, { session: {user: {id: null}} })
  }
})

supabaseClient.auth.onAuthStateChange((_, _session) => {
  if (_session) {
    sessionStore.setSession(sessionStore.$state, _session)
  } else {
    // TODO create a an action in the store to do this
    sessionStore.setSession(sessionStore.$state, { session: {user: {id: null}} })
  }
})


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = sessionStore.$state.session.user;

  if(requiresAuth && !currentUser.id) {
    next({name: 'auth'})
  // } else if(!requiresAuth && currentUser.id) {
  //   next({name: 'welcome'})
  // }
  } else next()
})

export default router;
