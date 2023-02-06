import { defineStore } from "pinia"

export const useSessionStore = defineStore("session", {
  state: () => {
    return {
      session: {
        user: {
          id: null
        }
      }
    }
  },
  actions: {
    setSession(state: any, session: any) {
      state.session = session
    }
  }
})
