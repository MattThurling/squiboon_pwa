import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../stores/user"
import { pinia } from "../stores"
import Welcome from "../views/Welcome.vue"
import Name from "../views/Name.vue"
import ClubsAvailable from "../views/ClubsAvailable.vue"
import Photo from "../views/Photo.vue"
import Contact from "../views/Contact.vue"
import Profile from "../views/Profile.vue"
import Summary from "../views/Summary.vue"
import Auth from "../views/Auth.vue"

const userStore = useUserStore(pinia)

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


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = userStore.$state
  console.log('currentUser', currentUser.id)
  console.log('requiresAuth', requiresAuth)

  if(requiresAuth && !currentUser.id) {
    next({name: 'auth'})
  } else if(!requiresAuth && currentUser.id) {
    next({name: 'welcome'})
  } else next()
})

export default router;
