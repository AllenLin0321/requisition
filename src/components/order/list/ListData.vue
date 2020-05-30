<template>
  <v-container grid-list-xl pa-3>
    <v-layout class="data" align-center row wrap>
      <!-- 流水號 -->
      <v-flex xs6 sm4 md1 class="order">{{ index + 1 }}</v-flex>

      <!-- 項目 -->
      <v-flex xs6 sm4 md2 class="item" id="item">{{ material.item }}</v-flex>

      <!-- 數量 -->
      <v-flex xs12 sm4 md3 class="number">
        <v-text-field
          type="number"
          class="inputPrice"
          value="1"
          label="數量"
          @change="onUpdateQuantity"
        ></v-text-field>
      </v-flex>

      <!-- 單位 -->
      <v-flex xs12 sm4 md2 class="unit">
        <v-select
          :items="units"
          label="單位"
          :value="units[0]"
          attach
          @change="onUpdateUnit"
        ></v-select>
      </v-flex>

      <!-- 備註 -->
      <v-flex xs11 sm7 md3 class="unit">
        <v-textarea
          solo
          autofocus
          height="90"
          placeholder="備註"
          @change="onUpdateNote"
        ></v-textarea>
      </v-flex>

      <!-- 動作 -->
      <v-flex xs1 sm1 class="action" pa-0>
        <!-- Delete -->
        <v-btn flat icon color="indigo" @click="DELETE_MATERIAL(index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import {
  UPDATE_QUANTITY,
  UPDATE_UNIT,
  UPDATE_NOTE,
  DELETE_MATERIAL,
} from '../../../store/mutation-types';
export default {
  props: ['material', 'index'],
  computed: {
    ...mapState({ units: ({ material }) => material.units }),
  },
  methods: {
    ...mapMutations([
      UPDATE_QUANTITY,
      UPDATE_UNIT,
      UPDATE_NOTE,
      DELETE_MATERIAL,
    ]),
    onUpdateQuantity(element) {
      const data = {
        index: this.index,
        quantity: element,
      };
      this.UPDATE_QUANTITY(data);
    },
    onUpdateUnit(element) {
      const data = {
        index: this.index,
        unit: element,
      };
      this.UPDATE_UNIT(data);
    },
    onUpdateNote(element) {
      const data = {
        index: this.index,
        note: element,
      };
      this.UPDATE_NOTE(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  border-bottom: 1px solid #c8c8c8;
}

.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
