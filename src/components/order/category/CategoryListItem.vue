<template>
  <v-list-group no-action sub-group>
    <template v-slot:activator>
      <!-- Sub Category title-->
      <v-list-tile>
        <v-list-tile-title>{{ subCategory.name }} </v-list-tile-title>
      </v-list-tile>
    </template>

    <!-- Labels -->
    <v-list-tile
      v-for="label in subCategory.children"
      :key="label.index"
      @click="onSelectLabel(label)"
    >
      <!-- label title -->
      <v-list-tile-title>{{ label.name }}</v-list-tile-title>
    </v-list-tile>
  </v-list-group>
</template>

<script>
import { mapMutations } from 'vuex';
import { SAVE_MATERIAL } from '../../../store/mutation-types';
export default {
  props: ['subCategory'],
  methods: {
    ...mapMutations([SAVE_MATERIAL]),
    onSelectLabel(label) {
      const item = {
        item: label.name,
        quantity: '1',
        unit: '個',
      };
      this.SAVE_MATERIAL(item);
    },
  },
};
</script>
