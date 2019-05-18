<template>
  <v-layout row class="data" align-center px-3>
    <v-flex xs1 class="order">{{ index+1 }}</v-flex>

    <v-flex xs4 class="item">{{ material }}</v-flex>

    <!-- 數量 -->
    <v-flex xs2 class="number" pr-4>
      <v-text-field label="數量"></v-text-field>
    </v-flex>

    <!-- 單位 -->
    <v-flex xs2 class="unit" pr-4>
      <v-text-field label="單位"></v-text-field>
    </v-flex>

    <!-- 動作 -->
    <v-flex xs3 class="action">動作</v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['material', 'index']
}
</script>



<style lang="scss" scoped>
.data {
  border-bottom: 1px solid #c8c8c8;
}
</style>

