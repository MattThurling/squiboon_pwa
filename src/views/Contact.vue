<template>
  <div class="h-screen flex flex-col justify-center items-center p-28">
    <h1 class="text-4xl mb-12">
      Please enter your contact information
    </h1>

    <div class="flex items-center justify-around w-full mb-5">
      <input type="email" placeholder="Enter your email" class="input input-bordered input-lg w-full max-w-xs" />
      <input type="checkbox" class="checkbox checkbox-lg" :checked="false" />
    </div>

    <div class="flex items-center justify-around w-full">
      <input type="phone" placeholder="Enter your phone" class="input input-bordered input-lg w-full max-w-xs" />
      <input type="checkbox" class="checkbox checkbox-lg" :checked="false" />
    </div>
    
    <a href="/profile" class="btn btn-lg btn-primary mx-5 mt-12">
      Next
    </a>
  </div>
</template>