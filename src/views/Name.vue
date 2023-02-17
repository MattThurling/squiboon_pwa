<template>
  <div class="h-screen flex flex-col justify-center items-center py-28 px-4">
    <h1 class="text-4xl mb-12">
      What name would you like to be known by?
    </h1>
    <input
      type="text"
      name="name"
      v-model="name"
      placeholder="Enter your name"
      class="input input-bordered input-lg w-full max-w-xs"
    />
    <div class="mt-12">
      <button class="btn btn-lg btn-outline btn-primary mx-4" @click="router.back()">
        Back
      </button>
      <button class="btn btn-lg btn-primary mx-4" @click="handleClick">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'
  import { supabaseClient } from '../supabase';
  const name=ref<string>('')
  const userStore = useUserStore()
  const router = useRouter()

  onMounted(() => {
    getName()
  })

  const getName = async() => {
    try {
      const { data, error } = await supabaseClient
      .from('profiles')
      .select('username')
      .eq('id', userStore.$state.id)
      if (data) {
        name.value = data[0].username
      }
    } catch (error) {
      console.log(error)
    }    
  }

  const handleClick = async() => {
    try {
      const { data, error } = await supabaseClient
      .from('profiles')
      .update({ username: name.value })
      .eq('id', userStore.$state.id)
      .select()
      if (data) {
        if (data[0].username === name.value) router.push('/clubs-belong')
      }
    } catch (error) {
      console.log(error)
    }    
  }
</script>