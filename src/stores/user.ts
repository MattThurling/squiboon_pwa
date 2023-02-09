import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      id: null,
      email: null,
    }
  },
  actions: {
    setUser(state: any, user: any) {
      state.id = user.id
      state.email = user.email
    }
  }
})
