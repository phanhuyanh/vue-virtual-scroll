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
    row: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    getData: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    opts: {}
  }),
  created() {
    let settings = {...SETTINGS, ...this.settings}
    let { minIndex, maxIndex, startIndex, tolerance } = settings
    minIndex = Math.min(minIndex, maxIndex)
    startIndex = Math.max(minIndex, startIndex)
    tolerance = Math.max(tolerance, 0)
    
    this.opts = {...settings, ...{minIndex, maxIndex, startIndex, tolerance}}
    this.opts = init(this.opts)
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
    let viewport = this.$refs.viewport
    if(!viewport) return

    this.$refs.viewport.scrollTop = this.opts.initPosition
    if(!this.opts.initPosition) {
      this.runScroller(0)
    }
  },
  methods: {
    runScroller(scrollTop) {
      let { totalHeight, toleranceHeight, bufferedItems, settings: {minIndex, itemHeight, maxIndex}} = this.opts
      let index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)

      let start = Math.max(minIndex, index)
      let end = Math.min(maxIndex, index + bufferedItems - 1)
      let data = this.getData(start, end)

      let topPaddingHeight =  Math.max((index - minIndex) * itemHeight, 0)
      let bottomPaddingHeight = Math.max(totalHeight - data.length * itemHeight - topPaddingHeight, 0)

      this.$set(this.opts, 'topPaddingHeight', topPaddingHeight)
      this.$set(this.opts, 'bottomPaddingHeight', bottomPaddingHeight)
      this.$set(this.opts, 'data', data)
    }
  }
}
</script>