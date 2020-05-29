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
        v-for="(catelog, index) in labels"
        :key="index"
        :catelog="catelog"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import CategoryList from './CategoryList';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      labels: state => {
        return state.labels.labels;
      },
    }),
  },
  components: {
    CategoryList,
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
