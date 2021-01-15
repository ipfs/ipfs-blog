<template>
  <transition name="fade">
    <div v-if="show" class="fixed top-0 right-0 bottom-0 left-0 z-50">
      <div
        class="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-25"
        @click="closeModal()"
      ></div>
      <div
        role="dialog"
        aria-modal="true"
        class="modal-content absolute bg-white rounded w-11/12 md:w-4/5 max-w-screen-lg max-h-screen overflow-y-auto p-4 lg:p-8"
      >
        <VideoModalContent v-if="videoModalCard" :close-modal="closeModal" />
        <button
          type="button"
          class="absolute top-0 right-0 mt-4 mr-4 text-blueGreen hover:underline font-bold text-xl"
          @click="closeModal()"
        >
          X
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import VideoModalContent from '@theme/components/blog/VideoModalContent'

export default {
  name: 'VideoModal',
  components: {
    VideoModalContent,
  },
  props: {},
  data() {
    return {
      show: false,
    }
  },
  computed: { ...mapState('appState', ['videoModalCard']) },
  watch: {},
  methods: {
    closeModal() {
      this.show = false
      document.querySelector('body').classList.remove('overflow-hidden')
    },
    openModal() {
      this.show = true
      document.querySelector('body').classList.add('overflow-hidden')
    },
  },
}
</script>

<style lang="stylus" scoped>
.modal-content {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
