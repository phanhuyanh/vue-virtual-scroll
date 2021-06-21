<template>
  <div>
    <virtual-scroll :row="itemComponent"/>
  </div>
</template>

<script>
// import VirtualScroll from './src/VirtualScroll.js'
import rowTemplate from './dev/rowTemplate.vue'
import VirtualScroll from './src/VirtualScroll.vue'

export default {
  props: ['row'],
  components: {
    VirtualScroll
  },
  data: () => ({
    itemComponent: rowTemplate,
    items: [
      {text: 1, index: 1},
      {text: 2, index: 2},
      {text: 3, index: 3},
      {text: 4, index: 4},
      {text: 5, index: 5},
      {text: 6, index: 6},
      {text: 7, index: 7},
      {text: 8, index: 8},
      {text: 9, index: 9},
      {text: 10, index: 10},
      {text: 11, index: 11},
      {text: 12, index: 12},
      {text: 13, index: 13},
      {text: 14, index: 14},
      {text: 15, index: 15},
      {text: 16, index: 16},
    ]
  })
}
</script>

<style>

</style>