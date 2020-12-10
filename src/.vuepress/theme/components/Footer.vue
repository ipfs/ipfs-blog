<template>
  <footer class="footer bg-gradient-6 text-white py-8 md:py-16">
    <div class="grid grid-cols-12 grid-margins">
      <NewsletterForm class="col-start-1 col-span-12 pb-20" />
      <div class="col-start-1 col-span-12 flex justify-between">
        <div class="">
          <ul class="">
            <li class="sitemap-head">Protocol Labs</li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://protocol.ai"
                >About</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://protocol.ai/join"
                >Join</a
              >
            </li>
          </ul>
        </div>

        <div class="grid-flex-cell">
          <ul class="">
            <li class="sitemap-head">IPFS</li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://ipfs.io/#install"
                >Install</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://github.com/ipfs/ipfs"
                >GitHub</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://github.com/ipfs/community/blob/master/code-of-conduct.md"
                >Code of Conduct</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://docs.ipfs.io/"
                >Docs</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://docs.ipfs.io/community/"
                >Community</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://ipfs.io/help"
                >Help</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://awesome.ipfs.io/"
                >Awesome IPFS</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://cluster.ipfs.io/"
                >IPFS Cluster</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://ipfs.io/team"
                >Team</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://ipfs.io/media"
                >Media</a
              >
            </li>
            <li>
              <a class="text-blueGreen hover:text-white" href="//blog.ipfs.io/"
                >Blog</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://ipfs.io/legal/"
                >Legal</a
              >
            </li>
          </ul>
        </div>

        <div class="grid-flex-cell">
          <ul class="">
            <li class="sitemap-head">ProtoSchool</li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://proto.school/#/tutorials"
                >Tutorials</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://proto.school/#/chapters"
                >Chapters</a
              >
            </li>
          </ul>
        </div>

        <div class="grid-flex-cell">
          <ul class="">
            <li class="sitemap-head">Filecoin</li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://filecoin.io/"
                >About</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://filecoin.io/faqs/"
                >FAQ</a
              >
            </li>
          </ul>
          <ul class="">
            <li class="sitemap-head" style="padding-top: 30px">
              Other Projects
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://libp2p.io/"
                >libp2p</a
              >
            </li>
            <li>
              <a class="text-blueGreen hover:text-white" href="https://ipld.io/"
                >IPLD</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://drand.love/"
                >Drand</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="https://multiformats.io/"
                >Multiformats</a
              >
            </li>
            <li>
              <a
                class="text-blueGreen hover:text-white"
                href="http://testground.ai/"
                >Testground</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="share-links">
        <ul class="share list-unstyled">
          <SocialLinks class="flex items-center" />
        </ul>
      </div>

      <div class="col-start-1 col-span-12">
        <center>
          © Protocol Labs | Except as
          <a
            class="text-blueGreen hover:text-white"
            href="https://protocol.ai/legal/"
            >noted</a
          >, content licensed
          <a
            class="text-blueGreen hover:text-white"
            href="https://creativecommons.org/licenses/by/3.0/"
            >CC-BY 3.0.</a
          >
        </center>
      </div>
    </div>
  </footer>
</template>
<script>
import SocialLinks from '@theme/components/SocialLinks'
import NewsletterForm from '@theme/components/blog/NewsletterForm'
export default {
  name: 'Footer',
  components: { SocialLinks, NewsletterForm },
  computed: {
    footerLinks() {
      return this.$site.themeConfig.footerLinks
    },
  },
}
</script>

<style scoped>
.sitemap-head {
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
