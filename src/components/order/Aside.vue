<template>
  <v-navigation-drawer stateless value="true">
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
      <AsideItem
        v-for="(label, index) in labels"
        :key="index"/>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import AsideItem from './AsideItem'

  export default {
    data() {
      return {
        labels: this.$store.getters.labels
      }
    },
    components: {
      AsideItem
    },
    created() {
      console.log(labels);
    }
  }
</script>
