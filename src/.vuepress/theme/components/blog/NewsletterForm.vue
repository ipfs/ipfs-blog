<template>
  <div id="newsletter-form" class="flex justify-between items-center">
    <div class="flex-shrink max-w-xl">
      <h2 class="type-h2">Stay informed</h2>
      <p class="mt-2">
        Sign up for the IPFS Weekly newsletter (<a
          class="text-blueGreen hover:underline"
          href="/weekly-110"
          >example</a
        >) for the latest on releases, upcoming developments, community events,
        and more.
      </p>
    </div>
    <form
      id="mc-embedded-subscribe-form"
      action="https://ipfs.us4.list-manage.com/subscribe/post?u=25473244c7d18b897f5a1ff6b&amp;id=cad54b2230"
      method="post"
      name="mc-embedded-subscribe-form"
      class="flex"
      target="_blank"
      novalidate
    >
      <div id="mc_embed_signup_scroll" class="flex">
        <div class="fields flex flex-col">
          <input
            id="mce-EMAIL"
            required
            type="email"
            aria-label="Email Address"
            class="text-black p-2 rounded"
            placeholder="email@your.domain"
            value=""
            name="EMAIL"
          />
          <label class="pt-2 italic" for="gdpr_28879">
            <input
              id="gdpr_28879"
              type="checkbox"
              class=""
              name="gdpr[28879]"
              value="Y"
            /><span class="pl-2">Please send me the newsletter</span>
          </label>
        </div>
        <div class="ml-4">
          <input
            id="mc-embedded-subscribe"
            type="submit"
            value="Subscribe"
            name="subscribe"
            class="p-2 text-white bg-blueGreen rounded"
          />
        </div>
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
export default {
  name: 'NewsletterForm',
  props: {},
  computed: {},
  methods: {},
}
</script>
