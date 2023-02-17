import { supabaseClient } from '../supabase'
import { useUserStore } from '../stores/user'
import { pinia } from '../stores'

const userStore = useUserStore(pinia)

const getItems = async(itemType: string) => {
  try {
    let { data, error, status } = await supabaseClient
      .from(`organisation_${itemType}s`)
      .select(`
        id,
        ${itemType}s (name)`)
      .eq('organisation_id', import.meta.env.VITE_WHITELEY_ID) // TODO: shouldn't be in env


    if (error && status !== 406) throw error

    if (data) {
      return data
    }
  } catch (error) {
    // Figure out error types
    alert('Error')
  } finally {
    console.log('Done')
  }
}

const getSelections = async(itemType: string) => {
  try {
    let { data, error, status } = await supabaseClient
      .from(`user_${itemType}s`)
      .select(`
        id,
        organisation_${itemType}_id,
        user_id`)
      .eq('user_id', userStore.$state.id)

    if (error && status !== 406) throw error

    if (data) {
      return data
    }
  } catch (error) {
    // Figure out error types
    alert('Error')
  } finally {
    console.log('Done')
  }
}

const updateItems = async(table_name: string, column_name: string, items: any) => {
  console.log('updateItems', items)
  let incomings = []
  let outgoings = []
  for (let i = 0; i < items.length; i++) {
    console.log('item', items[i])
    let item = { user_id: userStore.$state.id, organisation_topic_id: items[i].id}
    if (items[i].selected) {
      incomings.push(item)
    } else {
      outgoings.push(item)
    }
  }
  console.log('incoming', incomings)
  console.log('outgoing', outgoings)
  for (const incoming of incomings) {
    try {
      const { data, error } = await supabaseClient.rpc(
        'insert_unique_value', {
          p_user_id: userStore.$state.id,
          p_table_name: table_name,
          p_column_name: column_name,
          p_value: incoming,
        }
      )
      if (data) {
        console.log('returned', data)
      }
    } catch (error) {
      alert(error)
    }
  }
}

const destroy = async(table_name: string, column_name: string, value: string) => {
  console.log('destroy', table_name, column_name, value)
}

export { getItems, getSelections, updateItems, destroy }