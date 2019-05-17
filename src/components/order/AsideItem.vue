<template>
  <div>
    <v-list-group prepend-icon="build" value="true">
      <template v-slot:activator>
        <v-list-tile>
          <v-list-tile-title>水管</v-list-tile-title>
        </v-list-tile>
      </template>
      <v-list-group no-action sub-group value="true">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>強力水管</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile v-for="(admin, i) in admins" :key="i">
          <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="admin[1]" @click="alert"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

      <v-list-group sub-group no-action>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>小水管</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(crud, i) in cruds" :key="i">
          <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="crud[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list-group>

    <!-- ----------------------------------------- -->

    <v-list-group prepend-icon="build" value="true">
      <template v-slot:activator>
        <v-list-tile>
          <v-list-tile-title>電線</v-list-tile-title>
        </v-list-tile>
      </template>
      <v-list-group no-action sub-group value="true">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>強力電線</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile v-for="(admin, i) in admins" :key="i">
          <v-list-tile-title v-text="admin[0]" @click="alert"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

      <v-list-group sub-group no-action>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>小電線</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(crud, i) in cruds" :key="i">
          <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="crud[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return this.$store.getters.labels;
  },
  methods: {
    alert() {
      alert("hello!");
    }
  }
};
</script>
