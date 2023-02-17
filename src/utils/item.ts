import { supabaseClient } from '../supabase'
import { useUserStore } from '../stores/user'
import { pinia } from '../stores'

const userStore = useUserStore(pinia)

class Item {
  itemType: string

  constructor(itemType: string) {
    this.itemType = itemType
  }
  //
  getItems = async() => {
    try {
      let { data, error, status } = await supabaseClient
        .from(`organisation_${this.itemType}s`)
        .select(`
          id,
          ${this.itemType}s (name)`)
        .eq('organisation_id', import.meta.env.VITE_WHITELEY_ID) // TODO: shouldn't be in env
      if (error && status !== 406) throw error
      if (data) {
        return data
      }
    } catch (error) {
      alert('Error')
    } finally {
      console.log('Done')
    }
  }
  //
  getSelections = async() => {
    try {
      let { data, error, status } = await supabaseClient
        .from(`user_${this.itemType}s`)
        .select(`
          id,
          organisation_${this.itemType}_id,
          user_id`)
        .eq('user_id', userStore.$state.id)
      if (error && status !== 406) throw error
      if (data) {
        return data
      }
    } catch (error) {
      alert(error)
    } finally {
      console.log('Done')
    }
  }

}

export { Item }
