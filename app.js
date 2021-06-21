import VirtualScroll from './src/VirtualScroll.js'
import rowTemplate from './dev/rowTemplate.js'
import App from './App.vue'


export default {
  data: () => ({
    item: [
      {text: 1, index: 1},
      {text: 2, index: 2},
      {text: 3, index: 3},
      {text: 4, index: 4},
      {text: 5, index: 5},
      {text: 11, index: 11},
      {text: 6, index: 6},
      {text: 7, index: 7},
      {text: 8, index: 8},
      {text: 9, index: 9},
      {text: 10, index: 10}
    ],
    componentRow: rowTemplate
  }),
  render() {
    return (
      <div>
        <App row={rowTemplate}/>
        <VirtualScroll />
      </div>
    )
  }
}