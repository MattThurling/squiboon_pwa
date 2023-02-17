<template>
  
  <div class="flex flex-col justify-center items-center pt-12 px-4">
    <h1 class="text-4xl mb-12 text-center">
      Please enter your contact information
    </h1>

    <div class="mb-8">
      <input
        type="email"
        class="input input-bordered input-lg w-full max-w-sm mb-2"
        :value="userStore.$state.email"
        disabled
      />
      <div class="grid grid-cols-9">
        <div class="col-span-8">
          Show in directory
        </div>
        <input
          v-model="showEmail"
          type="checkbox"
          class="checkbox checkbox-lg"
        />
      </div>
    </div>
    
    <div class="mb-8">
      <input
        placeholder="Enter your phone number"
        type="text"
        class="input input-bordered input-lg w-full max-w-sm mb-2"
        v-model="phone"
      />
      <div class="grid grid-cols-9">
        <div class="col-span-8">
          Show in directory
        </div>
        <input
          
          v-model="showPhone"
          type="checkbox"
          class="checkbox checkbox-lg"
        />
      </div>
    </div>
      


      <div class="mt-12">
        <button class="btn btn-lg btn-outline btn-primary mx-4" @click="router.back()" >
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
  import { supabaseClient } from '../supabase'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()
  const phone=ref<string>('')
  const showPhone=ref<boolean>(false)
  const showEmail=ref<boolean>(false)
  const router = useRouter()

  onMounted(async () => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select(`phone, show_phone, show_email`)
      .eq('id', userStore.$state.id)
      .single()
    console.log(error)
    if (data) {
      phone.value = data.phone
      showPhone.value = data.show_phone
      showEmail.value = data.show_email
    }
  })

  const handleClick = async() => {
    const { error } = await supabaseClient
      .from('profiles')
      .update({
        phone: phone.value,
        show_phone: showPhone.value,
        show_email: showEmail.value
      })
      .eq('id', userStore.$state.id)
      .select()
    router.push('/profile')
  }
</script>