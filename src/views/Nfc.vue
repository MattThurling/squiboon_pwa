<template>
  <div class="h-screen flex flex-col justify-center items-center py-12 px-4">
    <h1 class="text-4xl mb-12">
      Identify yourself with your NFC tag
    </h1>
    <button class="btn btn-lg btn-primary mx-4" @click="scan">
      Scan
    </button>
    <div class="text-center mt-8">
      <p>{{ info }}</p>
      <p>{{ sId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nfc } from '../nfc'
  import { ref } from 'vue'

  const sId = ref('---')
  const info = ref('Press the button to scan your NFC tag.')
  const scan = async () => {
  console.log('scan')
  try {

    await nfc.scan()
    console.log('> Scan started')
    info.value = 'Scan started. Hold your NFC tag near the device.'

    const listenerObject: EventListenerObject = {
      handleEvent: (e: any) => {
        sId.value = e.serialNumber
        console.log(`> Serial Number: ${e.serialNumber}`)
        console.log(`> Records: (${e.message.records.length})`)
      },
    }

    nfc.addEventListener('reading', listenerObject)
    nfc.addEventListener('readingerror', () => {
      console.log('Argh! Cannot read data from the NFC tag. Try another one?')
    })
    } catch (error) {
      console.log('Argh! ' + error)
    }
  }
</script>




