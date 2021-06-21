<template>
  <div>
    <virtual-scroll :row="itemComponent" :getData="getData" :settings="settings"/>
  </div>
</template>

<script>
import rowTemplate from './dev/rowTemplate.vue'
import VirtualScroll from './src/VirtualScroll.vue'

export default {
  components: {
    VirtualScroll
  },
  data: () => ({
    itemComponent: rowTemplate,
    items: [],
    settings: {
      minIndex: 1,
      maxIndex: 100,
      startIndex: 0,
      itemHeight: 20,
      amount: 7
    }
  }),
  created() {
    this.items = Array.from({length: 100}, (_,i) => {
      let r = {index: i, text: `item ${i}`}
      return r
    })
  },
  methods: {
    getData(start, end) {
      const data = []
      if(start > end) return data
      for(let i = start; i <= end; i++) {
        data.push({index: i, text: `item ${i}`})
      }
      return data
    }
  }
}
</script>

<style>

</style>