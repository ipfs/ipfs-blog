<template>
  <transition
    :name="name"
    :mode="mode"
    :appear="appear"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <main :key="withKey">
      <slot></slot>
    </main>
  </transition>
</template>

<script>
const Func = {
  type: Function,
  default: () => {},
}
export default {
  name: 'Transitions',
  props: {
    name: {
      type: String,
      default: 'fade',
    },
    mode: {
      type: String,
      default: 'out-in',
    },
    appear: {
      type: Boolean,
      default: false,
    },
    withKey: {
      type: String,
      default: null,
    },
    beforeEnter: Func,
    enter: Func,
    afterEnter: Func,
    beforeLeave: Func,
    leave: Func,
    afterLeave: Func,
  },
}
</script>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.fade-enter-to,
.fade-leave {
  @apply opacity-100;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
