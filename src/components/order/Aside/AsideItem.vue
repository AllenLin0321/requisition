<template>
  <v-list-group no-action sub-group>
    <template v-slot:activator>
      <v-list-tile>
        <v-list-tile-title>{{ subCatelog.subCatelog_name }}</v-list-tile-title>
      </v-list-tile>
    </template>

    <v-list-tile v-for="(label, i) in subCatelog.labels" :key="i" @click="saveData">
      <v-list-tile-title v-text="label"></v-list-tile-title>
    </v-list-tile>
  </v-list-group>
</template>

<script>
export default {
  props: ["subCatelog"],
  methods: {
    saveData(element) {
      this.$store.dispatch('saveMaterial', element.target.innerText);
    }
  }
};
</script>
