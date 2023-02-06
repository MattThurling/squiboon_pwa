<script setup lang="ts">
  import { ref } from 'vue'
  import { supabaseClient } from '../supabase'

  const loading = ref(false)
  const email = ref('')

  const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabaseClient.auth.signInWithOtp({
        email: email.value,
      })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div class="h-screen flex flex-col justify-center items-center p-28">
      <h1 class="text-5xl mb-12">
        Squiboon
      </h1>
      
        <p>Sign in via magic link with your email below</p>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          class="input input-bordered input-lg w-full max-w-xs mt-3 mb-8" />
        <input
            type="submit"
            class="btn btn-lg btn-primary"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
    </div>
  </form>
</template>