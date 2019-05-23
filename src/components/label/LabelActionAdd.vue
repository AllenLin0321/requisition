<template>
  <!-- Change the file name -->
  <v-dialog v-model="dialog" width="500">
    <!-- Add Catelog Button -->
    <template v-slot:activator="{ on }">
      <v-btn color="blue-grey" class="white--text" v-on="on">
        新增目錄
        <v-icon right dark>add_circle</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!-- Card Title -->
      <!-- <v-card-title class="headline teal lighten-4" primary-title>新增主目錄名稱</v-card-title> -->

      <v-tabs centered color="cyan" dark icons-and-text @change="recordTab">
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
        <v-tab-item value="tab-1">
          <v-card flat>
            <!-- Card Content -->
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-text-field label="主目錄名稱" id="newCatelogName" @keyup.enter="addCatelog"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Second Catelog -->
        <v-tab-item value="tab-2">
          <v-card flat>
            <!-- Card Content -->
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-select
                      :items="mainCatelog"
                      v-model="selectedMainCatelog"
                      label="主目錄名稱"
                      outline
                    ></v-select>
                    <v-text-field label="次目錄名稱" id="newSubCatelogName" @keyup.enter="addCatelog"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Labels -->
        <v-tab-item value="tab-3">
          <v-card flat>
            <!-- Card Content -->
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-select
                      :items="mainCatelog"
                      v-model="selectedMainCatelog"
                      label="主目錄名稱"
                      outline
                    ></v-select>
                    <v-select :items="mainCatelog" label="次目錄名稱" outline></v-select>
                    <v-text-field label="標籤名稱" id="newLabel" @keyup.enter="addCatelog"></v-text-field>
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
        <v-btn color="pink lighten-1" flat @click="dialog = false">
          <strong>取消</strong>
        </v-btn>
        <v-btn color="teal lighten-1" flat @click="addCatelog">
          <strong>完成</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      currentTab: "",
      selectedMainCatelog: ""
    };
  },
  computed: {
    ...mapGetters(["mainCatelog"])
  },
  methods: {
    addCatelog() {
      switch (this.currentTab) {
        // Add Main Catelog
        case "tab-1":
          if (newCatelogName.value) {
            // this.add_main_catelog(newCatelogName.value);
            this.$store.dispatch("add_main_catelog", newCatelogName.value);
          } else {
            alert("請輸入資料");
          }
          break;

        // Add Second Catelog
        case "tab-2":
          if (newSubCatelogName.value) {
            const data = {
              selectedMainCatelog: this.selectedMainCatelog,
              newSubCatelogName: newSubCatelogName.value
            }
            this.$store.dispatch("add_second_catelog", data);
          } else {
            alert("請輸入資料");
          }
          break;

        case "tab-3":
          console.log(this.selectedMainCatelog);
          break;
      }

      this.dialog = false;
    },
    recordTab(e) {
      this.currentTab = e;
    }
  }
};
</script>
