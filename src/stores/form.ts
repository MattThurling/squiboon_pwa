import { defineStore } from "pinia"

interface State {
  organisation: {
    id: number | null,
    name: string | null,
  },
  name: string,
  clubs: Array<any>,
  phone: {
    number: string,
    show: boolean,
  },
  email: {
    show: boolean,
  }
}

interface Actions {
  setName(state: State, name: string): void;
  setOrganisation(state: State, organisation: { id: number | null, name: string | null }): void;
  setClubs(state: State, clubs: Array<any>): void;
  setPhone(state: State, phone: { number: string, show: boolean }): void;
  setEmail(state: State, email: { show: boolean }): void;
}


export const useFormStore = defineStore<string, State, {}, Actions>("form", {
  state: () => {
    return {
      organisation: {
        id: null,
        name: null,
      },
      name: '',
      clubs: [],
      phone: {
        number: '',
        show: false,
      },
      email: {
        show: false,
      }
    }
  },
  actions: {
    setName(state: State, name: string) {
      state.name = name
    },
    setOrganisation(state: State, organisation: { id: number | null, name: string | null }) {
      state.organisation = organisation
    },
    setClubs(state: State, clubs: Array<any>) {
      state.clubs = clubs
    },
    setPhone(state: State, phone: { number: string, show: boolean }) {
      state.phone = phone
    },
    setEmail(state: State, email: { show: boolean }) {
      state.email = email
    }
  }
})