<template>
  <v-list-group prepend-icon="build">
    <template v-slot:activator>
      <v-list-tile>
        <!-- Main Catelog -->
        <v-list-tile-title>{{ catelog.catelog_name }}</v-list-tile-title>
      </v-list-tile>
    </template>

    <CategoryListItem
      v-for="(subCatelog, index) in catelog.subCatelog"
      :key="index"
      :subCatelog="subCatelog"
    >
    </CategoryListItem>
  </v-list-group>
</template>

<script>
import CategoryListItem from './CategoryListItem';

export default {
  props: ['catelog'],
  components: {
    CategoryListItem,
  },
};
</script>
