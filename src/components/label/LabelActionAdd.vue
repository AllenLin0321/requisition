<template>
  <!-- Change the file name -->
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="blue-grey" class="white--text" v-on="on">
        新增目錄
        <v-icon right dark>add_circle</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!-- Card Title -->
      <!-- <v-card-title class="headline teal lighten-4" primary-title>新增主目錄名稱</v-card-title> -->

      <v-tabs centered color="cyan" dark icons-and-text>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab href="#tab-1">
          主目錄
          <v-icon>book</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          次目錄
          <v-icon>bookmarks</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          標籤
          <v-icon>bookmark</v-icon>
        </v-tab>

        <!-- Main Catelog -->
        <v-tab-item value='tab-1'>
          <v-card flat>
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
          </v-card>
        </v-tab-item>
      </v-tabs>

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
      dialog: false,
      flag: ''
    };
  },
  methods: {
    addMainCatelog() {
      if (newCatelogName.value) {
        this.dialog = false;
        this.$store.dispatch("add_main_catelog", newCatelogName.value);
      }else {
        alert("請輸入資料");
      }
    }
  }
};
</script>
