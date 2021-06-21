<template>
  <div class="item" :key="item.index" :style="{height: '20px', 'border-bottom': '1px solid #ccc', 'box-sizing': 'border-box'}">
    {{ item.text }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>

</style>