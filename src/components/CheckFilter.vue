<template>
  <div v-bind:class="{ 'check-filter': true, active: checked }">
    <span class="checkbox" v-on:click="checkFilter"></span>
    <span class="check-filter-title">{{ title }}</span>
  </div>
</template>

<script>
  export default {
    data: () => {
      return { checked: false }
    },
    props: [ 'title', 'category'],
    methods: {
      checkFilter() {
        this.checked = !this.checked;
        this.$bus.$emit('check-filter', this.category, this.title, this.checked);
      }
    }
  }
</script>
