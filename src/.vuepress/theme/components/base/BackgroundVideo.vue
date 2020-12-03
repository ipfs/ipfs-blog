<template>
  <div class="relative">
    <video
      ref="videoElement"
      :class="classList"
      muted
      preload
      playsinline
      loop
      :poster="poster"
    >
      <source
        v-for="(src, type, index) in srcset"
        :key="index"
        :src="requireAsset(src)"
        :type="type"
      />
    </video>
    <button
      aria-label="Toggle Video Play and Pause"
      class="absolute z-10"
      style="right: 20px; bottom: 20px"
      @click="togglePlayPause"
    >
      <SVGIcon
        :class-list="['h-4', 'w-4']"
        :name="videoBeingPlayed ? 'pause' : 'play'"
        :title="videoBeingPlayed ? 'Pause Video' : 'Play Video'"
      />
    </button>
  </div>
</template>

<script>
import SVGIcon from '@theme/components/base/SVGIcon.vue'
import requireAsset from '@theme/components/mixins/requireAsset'

let player = null

export default {
  name: 'BackgroundVideo',
  components: { SVGIcon },
  mixins: [requireAsset],
  props: {
    classList: {
      type: String,
      default: '',
    },
    poster: {
      type: String,
      default: '',
    },
    srcset: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return { videoBeingPlayed: false }
  },
  mounted: function () {
    player = this
    if (!window.matchMedia('prefers-reduced-motion: reduce)').matches) {
      this.playVideo()
    }
  },
  methods: {
    togglePlayPause: function () {
      return player.videoBeingPlayed ? this.pauseVideo() : this.playVideo()
    },
    playVideo: function () {
      this.$refs.videoElement.play()
      player.videoBeingPlayed = true
    },
    pauseVideo: function () {
      this.$refs.videoElement.pause()
      player.videoBeingPlayed = false
    },
  },
}
</script>
