<template>
  <v-layout row wrap class="header" pa-3>
    <v-flex xs1 class="order">{{ header.order }}</v-flex>
    <v-flex xs4 class="item">{{ header.item }}</v-flex>
    <v-flex xs2 class="number">{{ header.number }}</v-flex>
    <v-flex xs2 class="unit">{{ header.unit }}</v-flex>
    <v-flex xs3 class="action" pl-3>{{ header.action }}</v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    header() {
      return this.$store.getters.header;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #d3d3d3;
  font-weight: bold;
}
</style>
