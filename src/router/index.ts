import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue"
import Name from "../views/Name.vue"
import ClubsAvailable from "../views/ClubsAvailable.vue"
import Photo from "../views/Photo.vue"
import Contact from "../views/Contact.vue"
import Profile from "../views/Profile.vue"
import Summary from "../views/Summary.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/name",
      name: "name",
      component: Name,
    },
    {
      path: "/clubs-available",
      name: "clubs-available",
      component: ClubsAvailable,
    },
    {
      path: "/photo",
      name: "photo",
      component: Photo,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/summary",
      name: "summary",
      component: Summary,
    },
  ],
});

export default router;
