<template>
  <div class="flex justify-center items-center h-screen w-full p-4">
    <div v-if="croppedImage" class="flex flex-col grid-margins">
      <div>
        <img :src="croppedImage" />
      </div>
      <div class="flex items-center justify-center mt-4">
        <button
          class="bg-blueGreen transition duration-300 hover:bg-blueGreenScreen text-white px-4 py-2 mr-4"
          @click="download"
        >
          Download
        </button>
        <button
          class="bg-blueGreen transition duration-300 hover:bg-blueGreenScreen text-white px-4 py-2"
          @click="reset"
        >
          Load a new image
        </button>
      </div>
    </div>
    <div
      v-if="image && !croppedImage"
      class="flex flex-col justify-center relative w-full h-screen grid-margins"
    >
      <div class="flex justify-center mb-3">
        <button
          class="bg-blueGreen hover:bg-blueGreenScreen transition duration-300 ease-in-out text-white p-2 mr-4"
          @click="zoom(1.5)"
        >
          <SVGIcon
            class="color-white fill-current w-6 h-6"
            name="zoom-in"
            title="Zoom in"
          />
        </button>
        <button
          class="bg-blueGreen hover:bg-blueGreenScreen transition duration-300 ease-in-out text-white p-2 mr-4"
          @click="zoom(0.5)"
        >
          <SVGIcon
            class="color-white fill-current w-6 h-6"
            name="zoom-out"
            title="Zoom out"
          />
        </button>
        <button
          class="bg-blueGreen hover:bg-blueGreenScreen transition duration-300 ease-in-out text-white p-2 mr-4"
          @click="crop"
        >
          <SVGIcon
            class="color-white fill-current w-6 h-6"
            name="save-icon"
            title="Save"
          />
        </button>
        <button
          class="bg-blueGreen hover:bg-blueGreenScreen transition duration-300 ease-in-out text-white p-2"
          @click="reset"
        >
          <SVGIcon
            class="color-white fill-current w-6 h-6"
            name="trash-icon"
            title="Delete"
          />
        </button>
      </div>
      <cropper
        ref="cropper"
        class="cropper"
        :debounce="false"
        :src="image"
        :stencil-props="{
          aspectRatio: 1.91,
        }"
      />
      <div class="mt-3 mx-auto max-w-lg text-center">
        <strong>Pro tip:</strong> Avoid words in images, as they detract from
        post or card titles and can be hard to read at small sizes.
      </div>
    </div>
    <div
      v-if="!image && !croppedImage"
      class="image-upload flex flex-col items-center cursor-pointer justify-center bg-white text-blueGreen text-center h-screen w-full max-w-2xl opacity-75 hover:opacity-100 transition-all duration-300 ease-in-out border-2 border-dashed rounded text-lg"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      @click="$refs.file.click()"
    >
      <input
        ref="file"
        class="hidden"
        type="file"
        accept="image/*"
        @change="loadImage($event)"
      />
      Drag and drop an image<br />
      (or click to browse)
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import SVGIcon from '@theme/components/base/SVGIcon.vue'
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'ImageCrop',
  components: {
    Cropper,
    SVGIcon,
  },
  data() {
    return {
      image: null,
      imageName: '',
      croppedImage: null,
    }
  },
  methods: {
    zoom(factor) {
      this.$refs.cropper.zoom(factor)
    },
    reset() {
      this.image = null
      this.croppedImage = null
    },
    dragover(event) {
      event.preventDefault()
      if (!event.currentTarget.classList.contains('border-solid')) {
        event.currentTarget.classList.remove('border-dashed')
        event.currentTarget.classList.add('border-solid')
      }
    },
    dragleave(event) {
      event.currentTarget.classList.add('border-dashed')
      event.currentTarget.classList.remove('border-solid')
    },
    drop(event) {
      event.preventDefault()
      this.loadImage({ target: { files: event.dataTransfer.files } })
      event.currentTarget.classList.add('border-dashed')
      event.currentTarget.classList.remove('border-solid')
    },
    loadImage(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
          this.imageName = input.files[0].name
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      this.croppedImage = canvas.toDataURL()
    },
    download() {
      let fileName = this.imageName.split('.')
      const extension = fileName.pop()
      fileName = fileName.join('.')

      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
      const day = ('0' + currentDate.getDate()).slice(-2)

      const newFile = `${year}-${month}-${day}-cardheader-${fileName}.${extension}`

      const a = document.createElement('a')
      a.href = this.croppedImage
      a.download = newFile
      a.click()
    },
  },
}
</script>

<style scoped>
.image-upload {
  max-height: 30rem;
  border-color: #3e9096;
}

.cropper {
  max-height: 70vh;
}
</style>
