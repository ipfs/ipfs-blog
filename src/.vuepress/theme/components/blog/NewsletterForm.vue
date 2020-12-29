<template>
  <div
    id="newsletter-form"
    class="flex flex-col md:flex-row md:justify-between md:items-center"
  >
    <div class="flex-shrink max-w-xl mb-4 md:mb-0">
      <h2 class="type-h2">Stay informed</h2>
      <p class="mt-2">
        Sign up for the IPFS Weekly newsletter (<router-link
          :to="latestWeeklyPost ? latestWeeklyPost.path : ''"
          class="text-blueGreen hover:underline"
          >example</router-link
        >) for the latest on releases, upcoming developments, community events,
        and more.
      </p>
    </div>
    <form
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="flex"
      action="https://ipfs.us4.list-manage.com/subscribe/post?u=25473244c7d18b897f5a1ff6b&amp;id=cad54b2230"
      method="post"
      target="_blank"
    >
      <div id="mc_embed_signup_scroll" class="grid gric-col-2">
        <div class="fields flex col-start-1 col-span-2">
          <input
            id="mce-EMAIL"
            v-model="email"
            required
            type="email"
            aria-label="Email Address"
            class="text-black p-2 rounded"
            placeholder="email@your.domain"
            name="EMAIL"
          />
          <div class="ml-4">
            <input
              id="mc-embedded-subscribe"
              type="submit"
              value="Subscribe"
              name="subscribe"
              class="p-2 text-white bg-blueGreen rounded cursor-pointer"
            />
          </div>
        </div>
        <label class="pt-2 italic col-start-1 col-span-2" for="gdpr_28879">
          <input
            id="gdpr_28879"
            type="checkbox"
            class=""
            required
            name="gdpr[28879]"
            value="Y"
          /><span class="pl-2">Please send me the newsletter</span>
        </label>
      </div>
      <div id="mergeRow-gdpr">
        <div>
          <fieldset class="" name="interestgroup_field"></fieldset>
        </div>
        <div style="position: absolute; left: -5000px" aria-hidden="true">
          <input
            type="text"
            name="b_25473244c7d18b897f5a1ff6b_cad54b2230"
            tabindex="-1"
            value=""
          />
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      </div>
    </form>
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
