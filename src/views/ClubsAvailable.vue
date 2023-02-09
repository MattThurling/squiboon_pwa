<template>
  <div class="h-screen flex flex-col justify-center items-center p-28">
    <h1 class="text-4xl mb-12">
      The following clubs and activities are available at Whiteley Village. Please say which (if any) you currently belong to:
    </h1>
    <div class="w-full grid grid-cols-3">
      <div class="form-control bg-gray-100 p-4 m-4 rounded-lg" v-for="choice in choices" :key="choice.id">
        <label class="cursor-pointer label">
          <span class="label-text text-xl">{{ choice.clubs.name }}</span>
          <input v-model="choice.selected" type="checkbox" class="checkbox checkbox-lg" />
        </label>
      </div>
    </div>
    <div class="mt-12">
      <button class="btn btn-lg btn-primary" @click="handleClick">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { supabaseClient } from "../supabase"
  import { useFormStore } from '../stores/form'
  import { useRouter } from 'vue-router'

  const choices = ref([{id: '', clubs: {name: ''}, selected: false}])
  const formStore = useFormStore()
  const router = useRouter()

  onMounted(() => {
    getOrganisation()
  })

  const setChoices = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      data[i].selected = false
    }
    choices.value = data
  }

  const handleClick = () => {
    let availableClubsSelected = []
    for (let i = 0; i < choices.value.length; i++) {
      if (choices.value[i].selected) {
        availableClubsSelected.push(choices.value[i].id)
      }
    }
    formStore.setClubs(formStore.$state, availableClubsSelected)
    router.push('/photo')
  }

  const getOrganisation = async() => {
    try {
      let { data, error, status } = await supabaseClient
        .from('organisation_clubs')
        .select(`
          id,
          clubs (name)`)
        .eq('organisation_id', 'cbb1d90e-65d1-43a1-9d21-cddc1042b40a')


      if (error && status !== 406) throw error

      if (data) {
        setChoices(data)
        console.log(data)
      }
    } catch (error) {
      // Figure out error types
      alert('Error')
    } finally {
      console.log('Done')
    }
  }
</script>