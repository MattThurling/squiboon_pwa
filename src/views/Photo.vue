<template>
  <div class="h-screen flex flex-col justify-center items-center py-12 px-4">
    <h1 class="text-4xl mb-12">
      Add a photo to your profile if you would like
    </h1>
    <avatar v-model:path="avatar_url" @upload="updateProfile" size="10"/>
    <div class="mt-12">
      <button class="btn btn-lg btn-outline btn-primary mx-4" @click="router.back()">
        Back
      </button>
      <button class="btn btn-lg btn-primary mx-4" @click="router.push('/contact')">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { supabaseClient } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import Avatar from '../components/Avatar.vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'
  const userStore = useUserStore()
  const loading = ref(true)
  const username = ref('')
  const avatar_url = ref('')
  const router = useRouter()

  onMounted(() => {
      getProfile()
  })

  const getProfile = async() => {
    try {
      loading.value = true
      let { data, error, status } = await supabaseClient
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', userStore.$state.id)
        .single()
      if (error && status !== 406) throw error
      if (data) {
        username.value = data.username
        avatar_url.value = data.avatar_url
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async() => {
    try {
      loading.value = true
      const updates = {
        id: userStore.$state.id,
        username: username.value,
        avatar_url: avatar_url.value,
        updated_at: new Date(),
      }
      let { error } = await supabaseClient.from('profiles').upsert(updates)
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>

