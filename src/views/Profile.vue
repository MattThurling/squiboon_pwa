<template>

  <div class="text-center mt-8">
    <div class="avatar">
      <div class="w-48 rounded-full">
        <img :src="avatarUrl" />
      </div>
    </div>
  </div>
  <div class="text-center mt-3">
    <h2 class="text-3xl">{{ name }}</h2>
  </div>
  <div class="text-center">
    <p>Email: {{ userStore.$state.email }}</p>
    <p>Phone: {{ phone }}</p>
  </div>

  <div class="mt-12">
    <div class="card bg-gray-100 rounded-lg p-4 m-4">
      <h3 class="text-xl">Activities I do</h3>
      <hr class="mb-2">
      <ul class="list-disc ml-4">
        <li v-for="club in clubsBelong">{{ club.name }}</li>
      </ul>
    </div>
    <div class="card bg-gray-100 rounded-lg p-4 m-4">
      <h3 class="text-xl">Conversation topics of interest</h3>
      <hr class="mb-2">
      <ul class="list-disc ml-4">
        <li v-for="topic in topics">{{ topic.name }}</li>
      </ul>
    </div>
    <div class="card bg-gray-100 rounded-lg p-4 m-4">
      <h3 class="text-xl">Skills I need</h3>
      <hr class="mb-2">
      <ul class="list-disc ml-4">
        <li v-for="skill in skillsWanted">{{ skill.name }}</li>
      </ul>
    </div>
    <div class="card bg-gray-100 rounded-lg p-4 m-4">
      <h3 class="text-xl">Skills I can offer</h3>
      <hr class="mb-2">
      <ul class="list-disc ml-4">
        <li v-for="skill in skillsOffered">{{ skill.name }}</li>
      </ul>
    </div>
  </div>
  <div class="text-center py-12">
    <h2 class="text-2xl">Are you happy with your profile?</h2>
    <div class="mt-8">
      <button class="btn btn-lg btn-outline btn-primary mx-4" @click="router.back()">
        Back
      </button>
      <button class="btn btn-lg btn-primary mx-4" @click="">
        Submit
      </button>
    </div>
    <hr class="my-8">
    <button class="btn btn-xs btn-secondary btn-outline mx-4" @click="signOut">
        Sign out
    </button>
  </div>
    

</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import { supabaseClient } from '../supabase'
  import { useUserStore } from "../stores/user"
  import { pinia } from "../stores"
  import { useRouter } from 'vue-router'

  interface Item {
    name: string;
    relation: string;
  }

  const name = ref('')
  const phone = ref('')
  const avatarUrl = ref('')
  const clubs = ref<Item[]>([])
  const topics = ref<Item[]>([])
  const skills = ref<Item[]>([])
  const router = useRouter()
  const userStore = useUserStore(pinia)

  onMounted(() => {
    getClubs()
    getTopics()
    getSkills()
    getProfile()
  })

  // TODO: refactor to use a single function and handle errors
  const getClubs = async() => {
    const { data } = await supabaseClient.rpc(
      'get_items', {
        item_type: 'club',
        user_id: userStore.$state.id
      }
    )
    if (data) clubs.value = data
  }

  const getTopics = async() => {
    const { data } = await supabaseClient.rpc(
      'get_items', {
        item_type: 'topic',
        user_id: userStore.$state.id
      }
    )
    if (data) topics.value = data
  }

  const getSkills = async() => {
    const { data } = await supabaseClient.rpc(
      'get_items', {
        item_type: 'skill',
        user_id: userStore.$state.id
      }
    )
    if (data) skills.value = data
  }

  const getProfile = async() => {
    let img = ''
    try {
      const { data, error } = await supabaseClient
      .from('profiles')
      .select(`username, avatar_url, phone`)
      .eq('id', userStore.$state.id)
      if (data) {
        name.value = data[0].username
        phone.value = data[0].phone
        img = data[0].avatar_url
        console.log(img)
      }

      avatarUrl.value = await getAvatarUrl(img)

    } catch (error) {
      console.log(error)
    }    
  }

  const getAvatarUrl = async(img: string) => {
    const { data } = supabaseClient
      .storage
      .from('avatars')
      .getPublicUrl(img)
    return data.publicUrl
  }

  const signOut = async() => {
    try {
        let { error } = await supabaseClient.auth.signOut()
        if (error) throw error
    } catch (error: any) {
        alert(error.message)
    }
    router.push('/')
}

  const clubsBelong = computed(() => {
    return clubs.value.filter((club) => club.relation === 'belong')
  })

  const skillsWanted = computed(() => {
    return skills.value.filter((skill) => skill.relation === 'wanted')
  })

  const skillsOffered = computed(() => {
    return skills.value.filter((skill) => skill.relation === 'offered')
  })

  
</script>