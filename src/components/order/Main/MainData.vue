<template>
  <v-layout row class="data" align-center px-3>

    <!-- 流水號 -->
    <v-flex xs1 class="order">{{ index + 1 }}</v-flex>

    <!-- 項目 -->
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
    <v-flex xs3 class="action">
      <!-- Edit -->
      <v-btn flat icon color="deep-orange">
        <v-icon>create</v-icon>        
      </v-btn>

      <!-- Copy -->
      <v-btn flat icon color="green" @click="copyMaterial(index)">
        <v-icon>file_copy</v-icon>
      </v-btn>

      <!-- Delete -->
      <v-btn flat icon color="indigo" @click="deleteMaterial(index)">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      dialog: false
    }
  },
  props: ["material", "index"],
  methods: {
    ...mapActions([
      'deleteMaterial',
      'copyMaterial'
    ])
  }
};
</script>



<style lang="scss" scoped>
.data {
  border-bottom: 1px solid #c8c8c8;
}
</style>

