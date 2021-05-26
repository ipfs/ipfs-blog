<template functional>
  <span v-if="props.isExternal"
    ><span class="mr-4">{{ props.title }}</span
    ><OutboundLink class="-ml-4 pl-1" />
  </span>
  <span v-else>{{ props.title }}</span>
</template>
