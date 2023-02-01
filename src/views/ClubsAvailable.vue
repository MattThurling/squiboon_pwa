<template>
  <div class="h-screen flex flex-col justify-center items-center p-28">
    <h1 class="text-4xl mb-12">
      The following clubs and activities are available at Whiteley Village. Please say which you currently belong to:
    </h1>
    <div class="w-full grid grid-cols-2">
      <div>
        <select name="c1" id="c1" class="select select-bordered select-lg w-full max-w-sm mb-3">
          <option disabled selected>Select</option>
          <option v-for="club in clubs">{{ club }}</option>
        </select>

        <select name="c1" id="c1" class="select select-bordered select-lg w-full max-w-sm mb-3">
          <option disabled selected>Select</option>
          <option v-for="club in clubs">{{ club }}</option>
        </select>

        <select name="c1" id="c1" class="select select-bordered select-lg w-full max-w-sm mb-3">
          <option disabled selected>Select</option>
          <option v-for="club in clubs">{{ club }}</option>
        </select>

        <select name="c1" id="c1" class="select select-bordered select-lg w-full max-w-sm mb-3">
          <option disabled selected>Select</option>
          <option v-for="club in clubs">{{ club }}</option>
        </select>

      </div>
      <div class="flex flex-col justify-center items-center">
        <div class="flex">
          <p>I don't belong to any currently</p>
          <input type="checkbox" :checked="false" class="checkbox checkbox-lg ml-4" />
        </div>
      </div> 
    </div>
    <div class="mt-12">
      <a href="/photo" class="btn btn-lg btn-primary">
        Next
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  const clubs = [
    'Tennis',
    'Bowls',
    'Bridge',
    'Knitting',
    'Painting',
  ]
</script>