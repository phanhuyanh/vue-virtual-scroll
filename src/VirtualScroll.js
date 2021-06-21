const SETTINGS = {
  minIndex: 1,
  maxIndex: 16,
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
    row: Object,
    settings: Object,
    items: Array
  },
  data: () => ({
    opts: {},
  }),
  created() {
    let settings = this.settings || SETTINGS
    this.opts = init(settings) 
  },
  mounted() {
    this.$refs.viewport.scrollTop = this.opts.initPosition
    console.log(this.opts.initPosition, 'init position')
    if(!this.opts.initPosition) {
      console.log('vao day')
      this.runScroller({scrollTop: 0}, true)
    }
  },
  render() {
    // const Test = this.row
    //console.log(JSON.parse(JSON.stringify(this.opts)), 'opts')

    let styleViewport = {
      height: this.opts.viewportHeight + 'px',
      overflow: 'auto'
    }

    let topPaddingHeight = {
      height: this.opts.topPaddingHeight + 'px'
    }

    let bottomHeight = this.opts.bottomPaddingHeight
    let bottomPaddingHeight = {
      height: bottomHeight + 'px'
    }

    let $row = this.opts.data.map(item => <this.row item={item} />)

    return (
      <div class="viewport" style={styleViewport} ref="viewport" vOn:scroll={(e) => this.runScroller({scrollTop: e.target.scrollTop, target: e.target})}>
        <div class="top-padding-height" style={topPaddingHeight}></div>
        {$row}
        <div class="bottom-padding-height" style={bottomPaddingHeight}></div>
      </div>
    )
  },
  methods: {
    runScroller(e) {
      this.$nextTick(() => {
        //setTimeout(() => {
          let scroll = this.$refs.viewport
          let scrollTop = e.target.scrollTop
          console.log(scrollTop, 'scrollTop')
          if(scrollTop > 60) return
          let { totalHeight, toleranceHeight, bufferedItems, settings: {minIndex, itemHeight}} = this.opts
          let index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
          let data = getData(index, bufferedItems)
          let topPaddingHeight =  Math.max((index - minIndex) * itemHeight, 0)
          let bottomPaddingHeight = Math.max(totalHeight - data.length * itemHeight - topPaddingHeight, 0)
    
          // this.$set(this.opts, 'bottomPaddingHeight', bottomPaddingHeight)
          // this.$set(this.opts, 'topPaddingHeight', topPaddingHeight)
          // this.$set(this.opts, 'data', data)
          this.opts = Object.assign({}, this.opts, {topPaddingHeight, bottomPaddingHeight, data})
        //}, 3000)
      })
    } 
  }
}