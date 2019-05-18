<template>
  <v-layout row class="data" align-center px-3 pt-3 data-app>
    <!-- 流水號 -->
    <v-flex xs1 class="order">{{ index + 1 }}</v-flex>

    <!-- 項目 -->
    <v-flex xs4 class="item">{{ material }}</v-flex>

    <!-- 數量 -->
    <v-flex xs2 class="number" pr-4>
      <v-text-field type="number" class="inputPrice" value="1" label="數量"></v-text-field>
    </v-flex>

    <!-- 單位 -->
    <v-flex xs2 class="unit" pr-4 d-flex>
      <v-select :items="units" label="單位" :value="units[0]" attach></v-select>
    </v-flex>

    <!-- 動作 -->
    <v-flex xs3 class="action">

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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"]
    };
  },
  props: ["material", "index"],
  methods: {
    ...mapActions(["deleteMaterial", "copyMaterial"])
  },
  computed: {
    units() {
      return this.$store.getters.units;
    }
  }
};
</script>



<style lang="scss" scoped>
.data {
  border-bottom: 1px solid #c8c8c8;
}

.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>

