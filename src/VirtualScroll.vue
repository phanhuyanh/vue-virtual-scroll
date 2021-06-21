<template>
  <div class="viewport" :style="styleViewport" ref="viewport" @scroll="(e) => runScroller(e.target.scrollTop)">
    <div class="top-padding-height" :style="styleTop"></div>
    <component :is="row" v-for="item in opts.data" :key="item.index" :item="item"></component>
    <div class="bottom-padding-height" :style="styleBottom"></div>
  </div>
</template>

<script>
const SETTINGS = {
  minIndex: 1,
  maxIndex: 100,
  startIndex: 3,
  itemHeight: 20,
  amount: 5,
  tolerance: 2,
}

const getData = (offset, limit) => {
  const data = []
  let start = Math.max(SETTINGS.minIndex, offset)
  let end = Math.min(SETTINGS.maxIndex, offset + limit - 1)
  if(start > end) return data
  for(let i = start; i <= end; i++) {
    data.push({index: i, text: `item ${i}`})
  }
  return data
}

const init = (settings) => {
  const {minIndex, maxIndex, startIndex, itemHeight, amount, tolerance} = settings

  let viewportHeight = amount * itemHeight

  let totalHeight = (maxIndex - minIndex + 1) * itemHeight

  let toleranceHeight = tolerance * itemHeight

  let bufferedHeight = 2 * toleranceHeight + viewportHeight

  let bufferedItems = 2 * tolerance + amount

  let itemsAbove = startIndex - tolerance - minIndex

  let topPaddingHeight = itemsAbove * itemHeight

  let bottomPaddingHeight = totalHeight - topPaddingHeight

  let initPosition = topPaddingHeight + toleranceHeight

  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferedHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initPosition,
    data: []
  }
}

export default {
  props: {
    row: Object
  },
  data: () => ({
    opts: {}
  }),
  created() {
    this.opts = init(SETTINGS)
  },
  computed: {
    styleViewport() {
      return {
        'overflow-y': 'auto',
        height: this.opts.viewportHeight + 'px'
      }
    },
    styleTop() {
      return {
        height: this.opts.topPaddingHeight + 'px'
      }
    },
    styleBottom() {
      return {
        height: this.opts.bottomPaddingHeight + 'px'
      }
    }
  },
  mounted() {
    this.$refs.viewport.scrollTop = this.opts.initPosition
    if(!this.opts.initPosition) {
      this.runScroller(0)
    }
  },
  methods: {
    runScroller(scrollTop) {
      let { totalHeight, toleranceHeight, bufferedItems, settings: {minIndex, itemHeight}} = this.opts
      let index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
      let data = getData(index, bufferedItems)
      let topPaddingHeight =  Math.max((index - minIndex) * itemHeight, 0)
      let bottomPaddingHeight = Math.max(totalHeight - data.length * itemHeight - topPaddingHeight, 0)

      this.$set(this.opts, 'topPaddingHeight', topPaddingHeight)
      this.$set(this.opts, 'bottomPaddingHeight', bottomPaddingHeight)
      this.$set(this.opts, 'data', data)
      //this.opts = Object.assign({}, this.opts, {topPaddingHeight, bottomPaddingHeight, data})
    }
  }
}
</script>

<style>

</style>