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
      <button class="btn btn-lg btn-primary" @click="handleClick">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useFormStore } from '../stores/form'
  import { useRouter } from 'vue-router'
  const name=ref<string>('')
  const formStore = useFormStore()
  const router = useRouter()

  const handleClick = () => {
    console.log(name.value)
    formStore.setName(formStore.$state, name.value)
    router.push('/clubs-available')
  }
</script>