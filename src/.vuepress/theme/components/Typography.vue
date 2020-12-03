<template>
  <div class="type-p1 grid-margins">
    <h2 class="type-h2 mt-12 mb-12">Typography</h2>
    <div class="grid md:grid-cols-4 gap-8 mt-12">
      <div>
        <h1 class="type-h1">Type style 1</h1>
        <h2 class="type-h2">Type style 2</h2>
        <h3 class="type-h3">Type style 3</h3>
        <h4 class="type-h4">Type style 4</h4>
        <h5 class="type-h5 mb-12">Type style 5</h5>
      </div>
      <ul class="list-inside list-disc">
        <li>Unordered list items</li>
        <li>Unordered list items</li>
        <li>Unordered list items</li>
      </ul>
      <ol class="list-inside list-decimal">
        <li>Ordered list items</li>
        <li>Ordered list items</li>
        <li>Ordered list items</li>
      </ol>
    </div>
    <div class="grid md:grid-cols-4 gap-8">
      <div>
        <h3 class="type-h5">P1</h3>
        <p class="type-p1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <a>Soluta quibusdam aut incidunt tempore</a> assumenda eos commodi
          quia ipsam eveniet perferendis delectus, magni praesentium quas.
          Debitis mollitia quas perspiciatis vel quidem.
        </p>
      </div>
      <div>
        <h3 class="type-h5">P2</h3>
        <p class="type-p2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <a>Soluta quibusdam aut incidunt tempore</a> assumenda eos commodi
          quia ipsam eveniet perferendis delectus, magni praesentium quas.
          Debitis mollitia quas perspiciatis vel quidem.
        </p>
      </div>
      <div>
        <h3 class="type-h5">P3</h3>
        <p class="type-p3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <a>Soluta quibusdam aut incidunt tempore</a> assumenda eos commodi
          quia ipsam eveniet perferendis delectus, magni praesentium quas.
          Debitis mollitia quas perspiciatis vel quidem.
        </p>
      </div>
      <div>
        <h3 class="type-h5">P4</h3>
        <p class="type-p4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <a>Soluta quibusdam aut incidunt tempore</a> assumenda eos commodi
          quia ipsam eveniet perferendis delectus, magni praesentium quas.
          Debitis mollitia quas perspiciatis vel quidem.
        </p>
      </div>
    </div>

    <h2 class="type-h2 mt-12 mb-12">Buttons</h2>
    <div class="grid md:grid-cols-4 gap-8 mb-12">
      <div v-for="(button, index) in buttons" :key="index">
        <CTA v-bind="button" />
      </div>
    </div>
  </div>
</template>

<script>
import CTA from '@theme/components/CTA.vue'
export default {
  name: 'Typography',
  components: { CTA },
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
