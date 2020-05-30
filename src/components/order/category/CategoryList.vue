<template>
  <v-list-group prepend-icon="build">
    <template v-slot:activator>
      <v-list-tile>
        <!-- Main Category title-->
        <v-list-tile-title>{{ mainCategory.name }}</v-list-tile-title>
      </v-list-tile>
    </template>

    <!-- Sub Categories -->
    <CategoryListItem
      v-for="subCategory in mainCategory.children"
      :key="subCategory.index"
      :subCategory="subCategory"
    >
    </CategoryListItem>
  </v-list-group>
</template>

<script>
import CategoryListItem from './CategoryListItem';

export default {
  props: ['mainCategory'],
  components: {
    CategoryListItem,
  },
};
</script>
