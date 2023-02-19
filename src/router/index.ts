import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../stores/user"
import { pinia } from "../stores"
import { supabaseClient } from "../supabase"
import Welcome from "../views/Welcome.vue"
import Name from "../views/Name.vue"
import ClubsBelong from "../views/ClubsBelong.vue"
import ClubsWanted from "../views/ClubsWanted.vue"
import TopicsWanted from "../views/TopicsWanted.vue"
import SkillsOffered from "../views/SkillsOffered.vue"
import SkillsWanted from "../views/SkillsWanted.vue"
import Nfc from "../views/Nfc.vue"
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
      path: "/clubs-belong",
      name: "clubs-belong",
      component: ClubsBelong,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/clubs-wanted",
      name: "clubs-wanted",
      component: ClubsWanted,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/topics-wanted",
      name: "topics-wanted",
      component: TopicsWanted,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/skills-wanted",
      name: "skills-wanted",
      component: SkillsWanted,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/skills-offered",
      name: "skills-offered",
      component: SkillsOffered,
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
    {
      path: "/nfc",
      name: "nfc",
      component: Nfc,
    },
  ],
})


router.beforeEach(async(to, from, next) => {
  const { data } = await supabaseClient.auth.getUser()
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
