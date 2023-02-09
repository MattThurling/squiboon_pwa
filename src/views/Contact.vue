<template>
  <div class="h-screen flex flex-col justify-center items-center p-28">
    <h1 class="text-4xl mb-12">
      Please enter your contact information
    </h1>

    <div class="flex items-center justify-around w-full mb-5">
      <input
        type="email"
        placeholder="Enter your email"
        class="input input-bordered input-lg w-full max-w-xs"
      />
      <input
        v-model="showEmail"
        type="checkbox"
        class="checkbox checkbox-lg"
      />
    </div>

    <div class="flex items-center justify-around w-full">
      <input
        v-model="phone"
        type="phone"
        placeholder="Enter your phone"
        class="input input-bordered input-lg w-full max-w-xs" />
      <input
        v-model="showPhone"
        type="checkbox"
        class="checkbox checkbox-lg"
       />
    </div>
    
    <button class="btn btn-lg btn-primary mx-5 mt-12" @click="handleClick">
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useFormStore } from '../stores/form';

  const phone=ref<string>('')
  const showPhone=ref<boolean>(false)
  const showEmail=ref<boolean>(false)

  const formStore = useFormStore()

  const handleClick = () => {
    formStore.setPhone(formStore.$state, {
      number: phone.value,
      show: showPhone.value
    })
    formStore.setEmail(formStore.$state, {
      show: showEmail.value
    })
  }
</script>