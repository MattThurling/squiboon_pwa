<template>
  <div class="h-screen">
    <div class="grid grid-cols-3 mt-16">
      <div class="text-center">
        <h2 class="text-3xl">Michael Cera</h2>
      </div>
      <div class="text-center">
        <div class="avatar">
          <div class="w-32 rounded-full">
            <img src="/michael-cera-medium.jpg" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <p>Email: ceram@gmail.com</p>
        <p>Phone: 07777 123456</p>
      </div>
    </div>

    <div class="mt-16">
      <div class="card bg-gray-100 rounded-lg p-4 m-4">
        <h3 class="text-xl">Activities I do</h3>
        <hr class="mb-2">
        <ul class="list-disc ml-4">
          <li>Activity One</li>
          <li>Activity Two</li>
          <li>Activity Three</li>
          <li>Activity Four</li>
        </ul>
      </div>
      <div class="card bg-gray-100 rounded-lg p-4 m-4">
        <h3 class="text-xl">Conversation topics of interest</h3>
        <hr class="mb-2">
        <ul class="list-disc ml-4">
          <li>Activity One</li>
          <li>Activity Two</li>
          <li>Activity Three</li>
          <li>Activity Four</li>
        </ul>
      </div>
      <div class="card bg-gray-100 rounded-lg p-4 m-4">
        <h3 class="text-xl">Skills I need</h3>
        <hr class="mb-2">
        <ul class="list-disc ml-4">
          <li>Activity One</li>
          <li>Activity Two</li>
          <li>Activity Three</li>
          <li>Activity Four</li>
        </ul>
      </div>
      <div class="card bg-gray-100 rounded-lg p-4 m-4">
        <h3 class="text-xl">Skills I can offer</h3>
        <hr class="mb-2">
        <ul class="list-disc ml-4">
          <li>Activity One</li>
          <li>Activity Two</li>
          <li>Activity Three</li>
          <li>Activity Four</li>
        </ul>
      </div>
    </div>
    <div class="text-center py-16">
      <h2 class="text-2xl">Are you happy with your profile?</h2>
      <a href="/summary" @click=upsertProfile class="btn btn-lg btn-primary mx-5 mt-12">
        Yes, sumbit
      </a>
      <a href="/summary" @click=upsertProfile class="btn btn-lg btn-secondary mx-5 mt-12">
        No, edit
      </a>
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { supabaseClient } from '../supabase'
  import { useSessionStore } from "../stores/session"
  import { pinia } from "../stores"
  const sessionStore = useSessionStore(pinia)

  const upsertProfile = async () => {
    try {
      const { user } = sessionStore.$state.session

      const updates = {
        id: user.id,
        username: "Joey",
        avatar_url: "https://joey.com/avatar.png",
        updated_at: new Date(),
      }

      let { error } = await supabaseClient.from('profiles').upsert(updates)

      if (error) throw error
    } catch (error) {
      console.log('error', error)
      alert('Oops')
    } finally {
      console.log('Done it')
      // loading.value = false
    }
  }
</script>