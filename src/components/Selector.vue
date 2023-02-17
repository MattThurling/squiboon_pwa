<template>
  <div class="flex flex-col justify-center items-center py-12 px-4">
    <h1 class="text-2xl mb-12">
      <slot></slot>
    </h1>
    <div class="w-full">
      <div class="form-control bg-gray-100 p-4 my-4 rounded-lg" v-for="choice in choices" :key="choice.id">
        <label class="cursor-pointer label">
          <span class="label-text text-xl">{{ choice.name }}</span>
          <input v-model="choice.selected" type="checkbox" class="checkbox checkbox-lg" />
        </label>
      </div>
      
      <div v-if="allowSuggestions" class="mt-4">
        <hr class="my-8">
        <input
          type="text"
          :placeholder="`Other ${itemType}s`"
          class="input input-lg input-bordered w-full p-4 text-xl"
          v-model="suggestion" />
      </div>
      
    </div>
    <div class="mt-12">
      <button class="btn btn-lg btn-outline btn-primary mx-4" @click="router.back()">
        Back
      </button>
      <button class="btn btn-lg btn-primary mx-4" @click="goNext">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabaseClient } from '../supabase'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    itemType: {
      type: String,
      required: true
    },
    itemRelation: {
      type: String,
      required: true
    },
    relationFilter: {
      type: String,
      required: false
    },
    allowSuggestions: {
      type: Boolean,
      required: false
    },
    next: {
      type: String,
      required: true
    }
  })

  const choices = ref([{id: '', name: '', selected: false, show: true}])
  const suggestion = ref('')
  const userStore = useUserStore()
  const router = useRouter()

  onMounted(async () => {
    let items = await getItems()
    console.log('items', items)
    let selections = await getSelections()
    console.log('selections', selections)
    setChoices(items, selections)
  })

  /**
   * getItems gets the items of the given itemType available for the active organisation
   * 
   * @returns {Promise<any>}
   */

  const getItems = async() => {
    try {
      let { data, error, status } = await supabaseClient
        .from(`organisation_${props.itemType}s`)
        .select(`
          id,
          ${props.itemType}s (name)`)
        .eq('organisation_id', import.meta.env.VITE_WHITELEY_ID) // TODO: shouldn't be in env
      if (error && status !== 406) throw error
      if (data) {
        return data
      }
    } catch (error) {
      alert(error)
    }
  }
  
  /**
   * getSelections gets any available items of the given itemType previously chosen by the active user
   * 
   * @returns {Promise<any>}
   */

   const getSelections = async() => {
    try {
      let { data, error, status } = await supabaseClient
        .from(`user_${props.itemType}s`)
        .select(`
          id,
          relation,
          organisation_${props.itemType}_id,
          user_id`)
        .eq('user_id', userStore.$state.id)
      if (error && status !== 406) throw error
      if (data) {
        return data
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
   * setChoices combines the items and selections into the choices array
   * @param items
   * @param selections
   * @returns 
   */

  const setChoices = (items: any, selections: any) => {
    for (let i = 0; i < items.length; i++) {
      items[i].name = items[i][`${props.itemType}s`].name
      items[i].show = true
      // Hide filtered relations, eg clubs that the user already belongs to
      if (props.relationFilter) {
        if (selections.some((s: any) => s[`organisation_${props.itemType}_id`] === items[i].id && s.relation === props.relationFilter)) {
          items[i].show = false
        }
      }
      if (selections.some((s: any) => s[`organisation_${props.itemType}_id`] === items[i].id && s.relation === props.itemRelation)) {
        items[i].selected = true
      } else {
        items[i].selected = false
      }
      items[i].user_id = userStore.$state.id
    }
    choices.value = items.filter((i: any) => i.show)
  }

  /**
   * updateItems persists the user-chosen items to the database
   * 
   */

  const updateItems = async() => {
    for (const choice of choices.value) {
      if (choice.selected) {
        let conflict = await itemExists(choice)
        if (!conflict) insertItem(choice)
      } else {
        deleteItem(choice)
      }
    }
  }

  /**
   * itemExists checks if a record already exists
   * 
   */

  const itemExists = async(item: any) => {
    try {
      let { count, error } = await supabaseClient
        .from(`user_${props.itemType}s`)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userStore.$state.id)
        .eq(`organisation_${props.itemType}_id`, item.id)
        .eq('relation', props.itemRelation)
        return count
    } catch (error) {
      alert(error)
    }
  } 

  /**
   * insertItem ensures a unique record
   * This will be inefficient if there are many items
   * Done this way for now because of restrictions on multiple updates and unique constraints
   * both with the API and the RPC provided by Supabase
   * 
   */
  const insertItem = async(item: any) => {
    try {
      const { data, error } = await supabaseClient
        .from(`user_${props.itemType}s`)
        .insert([
          {
            user_id: userStore.$state.id,
            [`organisation_${props.itemType}_id`]: item.id,
            relation: props.itemRelation
          }
        ])
      if (data) {
        console.log('returned', data)
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
   * deleteItem deletes any existing record if choice is unchecked 
   * 
   */
  const deleteItem = async(item: any) => {
    try {
      const { data, error } = await supabaseClient
        .from(`user_${props.itemType}s`)
        .delete()
        .eq('user_id', userStore.$state.id)
        .eq(`organisation_${props.itemType}_id`, item.id)
        .eq('relation', props.itemRelation)
      if (data) {
        console.log('returned', data)
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
   * deleteItem deletes any existing record if choice is unchecked 
   * 
   */

  const insertSuggestion = async() => {
    try {
      const { data, error } = await supabaseClient
        .from('user_suggestions')
        .insert([
          {
            user_id: userStore.$state.id,
            item_type: props.itemType,
            relation: props.itemRelation,
            suggestion: suggestion.value,
          }
        ])
      if (data) {
        console.log('returned', data)
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
   * next handles the next button click
   * 
   */

  const goNext = async() => {
    await updateItems()
    if (suggestion.value) await insertSuggestion()
    router.push(props.next)
  }

</script>