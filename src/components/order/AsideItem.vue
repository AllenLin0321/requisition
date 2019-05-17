<template>
  <v-list-group no-action sub-group >
    <template v-slot:activator>
      <v-list-tile>
        <v-list-tile-title>{{ subCatelog.subCatelog_name }}</v-list-tile-title>
      </v-list-tile>
    </template>

    <v-list-tile v-for="(label, i) in subCatelog.labels" :key="i">
      <v-list-tile-title v-text="label"></v-list-tile-title>
      <!-- <v-list-tile-action>
        <v-icon v-text="people_outline"></v-icon>
      </v-list-tile-action> -->
    </v-list-tile>

  </v-list-group>
</template>

<script>
export default {
    props: ['subCatelog'],
    created() {
        console.log(this.subCatelog);
    }
}
</script>
