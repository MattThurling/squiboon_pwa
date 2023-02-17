<template>
    <div class="mb-8">
      <input
        type="file"
        id="single"
        accept="image/*"
        class="file-input file-input-bordered file-input w-full max-w-xs"
        @change="uploadAvatar" :disabled="uploading"
      />
    </div>
    <div class="">
      <div class="avatar">
        <div class="w-64 rounded-lg">
          <img :src="src ? src : 'Portrait_Placeholder.png'" />
        </div>
      </div>
    </div>
</template>


<script setup lang="ts">
    import { ref, toRefs, watch } from 'vue'
    import { supabaseClient } from '../supabase'
    const prop = defineProps({
        path: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    })
    const { path, size } = toRefs(prop)
    const emit = defineEmits(['upload', 'update:path'])
    const uploading = ref(false)
    const src = ref('')
    const files = ref()
    const downloadImage = async () => {
        try {
            const { data, error } = await supabaseClient.storage
                .from('avatars')
                .download(path.value)
            if (error) throw error
            src.value = URL.createObjectURL(data)
        } catch (error: any) {
            console.error('Error downloading image: ', error.message)
        }
    }
    const uploadAvatar = async (evt: any) => {
        files.value = evt.target.files
        try {
            uploading.value = true
            if (!files.value || files.value.length === 0) {
                throw new Error('You must select an image to upload.')
            }
            const file = files.value[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${Math.random()}.${fileExt}`
            let { error: uploadError } = await supabaseClient.storage
                .from('avatars')
                .upload(filePath, file)
            if (uploadError) throw uploadError
            emit('update:path', filePath)
            emit('upload')
        } catch (error: any) {
            alert(error.message)
        } finally {
            uploading.value = false
        }
    }
    watch(path, () => {
        if (path.value) downloadImage()
    })
</script>
  
 
