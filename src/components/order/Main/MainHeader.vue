<template>
  <v-layout row wrap class="header" pa-3>
    <v-flex xs6 md1 class="order">{{ header.order }}</v-flex>
    <v-flex xs6 md3 class="item">{{ header.item }}</v-flex>
    <v-flex xs6 md2 class="quantity">{{ header.quantity }}</v-flex>
    <v-flex xs6 md2 class="unit">{{ header.unit }}</v-flex>
    <v-flex xs6 md3 class="note">{{ header.note }}</v-flex>
    <v-flex class="action" :pl-4="$vuetify.breakpoint.mdAndUp">{{ header.action }}</v-flex>
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
