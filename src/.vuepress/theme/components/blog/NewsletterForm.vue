<template>
  <div
    id="newsletter-form"
    class="flex flex-col lg:flex-row lg:justify-between lg:items-center"
  >
    <div class="flex-shrink lg:max-w-sm xl:max-w-xl mb-4 lg:mb-0">
      <h2 class="type-h2">Stay informed</h2>
      <p class="mt-2 mb-6 mr-2">
        Sign up for the IPFS newsletter (<router-link
          :to="latestWeeklyPost ? latestWeeklyPost.path : ''"
          class="text-blueGreenLight hover:underline"
          >example</router-link
        >) for the latest on releases, upcoming developments, community events,
        and more.
      </p>
      <a target="_blank" href="https://ipfs.fyi/newsletter">
        <button
          type="button"
          class="
            px-3
            py-2
            text-white
            bg-blueGreen
            font-semibold
            rounded
            hover:bg-blueGreenScreen
            transition
            duration-300
          "
        >
          Sign up
        </button>
      </a>
    </div>

    <div
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="flex lg:justify-end max-w-lg xl:w-2/5"
    >
      <div id="mc_embed_signup_scroll" class="grid gric-col-2 w-full">
        <div class="fields flex flex-col sm:flex-row col-start-1 col-span-2">
          <div class="sm:ml-4 sm:pt-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NewsletterForm',
  props: {},
  data: () => ({
    email: null,
  }),
  computed: {
    ...mapState('appState', ['latestWeeklyPost']),
  },
  methods: {},
}
</script>
