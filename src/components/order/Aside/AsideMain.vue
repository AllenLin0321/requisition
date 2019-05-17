<template>
  <div>
      
    <v-list-group prepend-icon="build">
      <template v-slot:activator>
        <v-list-tile>
            <!-- Main Catelog -->
          <v-list-tile-title>{{ catelog.catelog_name }}</v-list-tile-title>
        </v-list-tile>
      </template>

      <AsideItem 
        v-for="(subCatelog, index) in catelog.subCatelog"
        :key="index"
        :subCatelog="subCatelog">
      </AsideItem>
    </v-list-group>

  </div>
</template>

<script>
import AsideItem from './AsideItem'

export default {
  props: ['catelog'],
  components: {
    AsideItem
  }
};
</script>
