<template>
  <!-- Change the file name -->
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="blue-grey" class="white--text" v-on="on">
        新增主目錄
        <v-icon right dark>add_circle</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!-- Card Title -->
      <v-card-title class="headline teal lighten-4" primary-title>新增主目錄名稱</v-card-title>

      <!-- Card Content -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field label="主目錄名稱" id="newCatelogName" @keyup.enter="addMainCatelog"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider/>

      <!-- Card Action -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue lighten-1" flat @click="addMainCatelog">
          <strong>完成</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    addMainCatelog() {
      this.dialog = false;
      this.$store.dispatch("add_main_catelog", newCatelogName.value);
    }
  }
};
</script>
