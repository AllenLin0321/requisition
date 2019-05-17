<template>
  <v-container fluid class="table-container">
    <v-layout row wrap class="header">
      <v-flex xs1 class="order">{{ header.order }}</v-flex>
      <v-flex xs4 class="item">{{ header.item }}</v-flex>
      <v-flex xs2 class="number">{{ header.number }}</v-flex>
      <v-flex xs2 class="unit">{{ header.unit }}</v-flex>
      <v-flex xs3 class="action">{{ header.action }}</v-flex>
    </v-layout>

    <v-layout row wrap class="data">
      <v-flex xs1 class="order">1</v-flex>
      <v-flex xs4 class="item">強力電線1</v-flex>
      <v-flex xs2 class="number">
        <input type="text" name="" id="">
      </v-flex>
      <v-flex xs2 class="unit">{{ header.unit }}</v-flex>
      <v-flex xs3 class="action">{{ header.action }}</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      header: {
        order: "#",
        item: "項目",
        number: "數量",
        unit: "單位",
        action: "動作"
      }
    };
  }
};
</script>

<style lang="scss" scoped>

.table-container {
  > * {
    padding: 20px;
  }
}
.header {
  background-color: #d3d3d3;
  font-weight: bold;
}

.data {
  border-bottom: 1px solid #C8C8C8;
}
</style>
