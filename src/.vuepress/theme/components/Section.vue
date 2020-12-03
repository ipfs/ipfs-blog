<template>
  <div :class="['section', mergedTheme.background]">
    <div class="grid grid-margins grid-cols-12" :class="mergedTheme.grid">
      <div v-if="background.type === 'video'" class="absolute inset-0 z-0">
        <BackgroundVideo
          class="w-full h-full"
          v-bind="background"
          class-list="object-cover w-full h-full"
        />
      </div>
      <div v-if="background.type === 'image'" class="absolute inset-0 z-0">
        <LazyImage
          :class="[
            'w-full h-full',
            { 'hidden md:block': background.mobileImg },
          ]"
          v-bind="background.img"
          :img-class="['w-full h-full', background.size, background.position]"
        />
        <LazyImage
          v-if="background.mobileImg"
          class="w-full h-full md:hidden"
          v-bind="background.mobileImg"
          :img-class="['w-full h-full', background.size, background.position]"
        />
      </div>
      <div
        :class="[
          'z-10',
          mergedTheme.content,
          extendedPadding
            ? ['py-20 lg:pt-240px lg:pb-120px']
            : ['py-120px lg:py-140px'],
          inset ? 'col-span-10 col-start-2' : 'col-span-12',
        ]"
      >
        <div v-if="title" v-transition class="grid grid-cols-12 z-10">
          <transition name="slide" appear>
            <h2
              :class="['col-span-12 section-title', mergedTheme.text]"
              :itemprop="mergedTheme.textMeta"
            >
              <span
                v-for="(t, i) in splitTitle"
                :key="i"
                class="anim"
                :style="{
                  'animation-delay': i * 0.06 + 's',
                }"
                v-html="t"
              />
            </h2>
          </transition>
        </div>
        <slot></slot>
        <div v-if="children">
          <div v-for="(child, index) in children" :key="index" class="z-10">
            <hr
              :class="[
                children.length > 2 && index === 0 ? 'my-10' : 'my-10 lg:mb-16',
                mergedTheme.hr,
                { hidden: !title && index === 0 },
                { hidden: child.hideDivider },
              ]"
            />
            <component :is="child.component" v-bind="child"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundVideo from '@theme/components/base/BackgroundVideo.vue'
import ColumnText from '@theme/components/ColumnText.vue'
import Section from '@theme/components/Section.vue'
import Column from '@theme/components/base/Column.vue'
import Container from '@theme/components/base/Container.vue'
import LazyImage from '@theme/components/base/LazyImage.vue'
import TextBlock from '@theme/components/TextBlock.vue'

export default {
  name: 'Section',
  components: {
    BackgroundVideo,
    ColumnText,
    Column,
    Container,
    LazyImage,
    Section,
    TextBlock,
  },
  props: {
    background: {
      type: Object,
      default: function () {
        return { type: 'gradient', gradient: 'bg-gradient-1' }
      },
    },
    children: {
      type: Array,
      default: function () {
        return []
      },
    },
    extendedPadding: {
      type: Boolean,
      default: false,
    },
    inset: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    theme: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    splitTitle() {
      return this.title.split(' ').map((s) => s + '&nbsp;')
    },
    mergedTheme() {
      switch (this.background.type) {
        case 'gradient': {
          return {
            ...{
              background: this.background.gradient,
              content: '',
              text: 'text-white type-h1 lg:col-span-7',
              hr: 'hr-gradient',
            },
            ...this.theme,
          }
        }
        case 'transparent': {
          return {
            ...{
              background: 'bg-transparent',
              content: '',
              text: 'text-deepBlue type-h1 lg:col-span-7',
              hr: 'hr-gradient',
            },
            ...this.theme,
          }
        }
        case 'image': {
          return {
            ...{
              background: 'relative',
              content: '',
              text: 'text-white type-h1 lg:col-span-7',
              hr: 'hr-transparent',
            },
            ...this.theme,
          }
        }
        case 'video': {
          return {
            ...{
              background:
                'relative bg-gradient-2 video-min-height flex items-center',
              content: 'relative pointer-events-none',
              text: 'text-white type-h1 lg:col-span-7',
              hr: 'hr-transparent',
            },
            ...this.theme,
          }
        }
        default: {
          return {
            ...{
              background: '',
              content: '',
              text: '',
              hr: '',
            },
            ...this.theme,
          }
        }
      }
    },
  },
}
</script>
<style lang="postcss">
@keyframes translate-slide-up {
  0% {
    transform: translateY(25%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.section-title .anim {
  display: inline-block;
  float: left;
  animation: translate-slide-up 0.75s cubic-bezier(0.5, 0, 0, 1) both;
}

@screen lg {
  .video-min-height {
    min-height: 40vh;
  }
}
</style>
