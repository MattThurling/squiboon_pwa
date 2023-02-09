<template>
  <div class="h-screen flex flex-col justify-center items-center p-28">
    <h1 class="text-4xl mb-12">
      Add a photo to your profile if you would like
    </h1>
    <div class="mb-8">
      <input
        type="file"
        class="file-input file-input-bordered file-input w-full max-w-xs"
        @change="uploadFromDevice"
      />
      <button class="btn ml-4" @click="takePicture">Take Picture</button>
    </div>
    <div class="">
      <div class="avatar">
        <div class="w-64 rounded-lg">
          <img :src="imageSrc ? imageSrc : 'Portrait_Placeholder.png'" />
        </div>
      </div>
    </div>
    <div class="mt-12">
      <a href="/profile" class="btn btn-lg btn-primary">
        Next
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const imageSrc = ref<string | null>(null);
    let stream: MediaStream | null = null;

    function uploadFromDevice(event: Event) {
      const file = (event.target as HTMLInputElement).files![0];
      imageSrc.value = URL.createObjectURL(file);
      uploadToSupabase(file);
    }

    function takePicture() {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const vendorUrl = window.URL || (window as any).webkitURL;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(s => {
          stream = s;
          video.srcObject = stream;
          video.play();
        });

      video.addEventListener('canplay', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context!.drawImage(video, 0, 0);
        // video.pause();
        (stream!.getTracks() as MediaStreamTrack[]).forEach(function(track) {
          track.stop();
        });
        const dataUri = canvas.toDataURL('image/jpeg');
        imageSrc.value = dataUri;
        const blob = dataURItoBlob(dataUri);
        uploadToSupabase(blob);
      });
    }

    function uploadToSupabase(file: Blob) {
      // Code to upload file to Supabase storage
    }

    function dataURItoBlob(dataURI: string) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    }

    return {
      imageSrc,
      uploadFromDevice,
      takePicture
    };
  }
};
</script>


