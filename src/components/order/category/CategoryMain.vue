<template>
  <v-navigation-drawer
    stateless
    value="true"
    dark
    clipped
    class="hello"
    :class="{ 'navigation-drawer-sm': $vuetify.breakpoint.smAndDown }"
  >
    <v-list>
      <!-- Title -->
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">分類</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <!-- Label -->
      <CategoryList
        v-for="mainCategory in allCategory"
        :key="mainCategory.index"
        :mainCategory="mainCategory"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import CategoryList from './CategoryList';
export default {
  components: {
    CategoryList,
  },
  computed: {
    ...mapGetters({ allCategory: 'getCategory' }),
  },
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background-color: #445175;
  .v-toolbar {
    background-color: #445175;
  }
}
.navigation-drawer-sm {
  width: auto !important;
}
</style>
