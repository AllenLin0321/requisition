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
                    <v-text-field
                      label="主目錄名稱"
                      v-model="newManCatelogName"
                      @keyup.enter="addCatelog"
                    ></v-text-field>
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
                      :items="allMainCatelog"
                      v-model="selectedMainCatelog"
                      label="主目錄名稱"
                      outline
                    ></v-select>
                    <v-text-field
                      label="次目錄名稱"
                      v-model="newSubCatelogName"
                      @keyup.enter="addCatelog"
                    ></v-text-field>
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
                      :items="allMainCatelog"
                      v-model="selectedMainCatelog"
                      label="主目錄名稱"
                      outline
                    ></v-select>
                    <v-select
                      :items="relatedSecondCatelog"
                      v-model="selectedSecondCatelog"
                      label="次目錄名稱"
                      outline
                    ></v-select>
                    <v-text-field label="標籤名稱" v-model="newLabel" @keyup.enter="addCatelog"></v-text-field>
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
      selectedMainCatelog: "",
      newManCatelogName: "",
      newSubCatelogName: "",
      newLabel: "",
      selectedSecondCatelog: ""
    };
  },
  computed: {
    ...mapGetters(["allMainCatelog", "relatedSecondCatelog"])
  },
  watch: {
    selectedMainCatelog: function(value) {
      this.updateSecondCatelog();
    }
  },
  methods: {
    // Add new Catelog ( Including: Main, Sub and Label)
    addCatelog() {
      switch (this.currentTab) {
        // Add Main Catelog
        case "tab-1":
          if (this.newManCatelogName) {
            this.$store.dispatch("add_main_catelog", this.newManCatelogName);
            this.newManCatelogName = "";
          } else {
            alert("請輸入資料");
          }
          break;

        // Add Second Catelog
        case "tab-2":
          if (this.newSubCatelogName) {
            const data = {
              selectedMainCatelog: this.selectedMainCatelog,
              newSubCatelogName: this.newSubCatelogName
            };
            this.$store.dispatch("add_second_catelog", data);
            this.newSubCatelogName = "";
          } else {
            alert("請輸入資料");
          }
          break;

        // Add Label
        case "tab-3":
          if (this.newLabel) {
            const data = {
              selectedMainCatelog: this.selectedMainCatelog,
              selectedSecondCatelog: this.selectedSecondCatelog,
              newLabel: this.newLabel
            };
            this.$store.dispatch("add_label", data);
            this.newLabel = "";
          } else {
            alert("請輸入資料");
          }

          break;
      }
      this.dialog = false;
    },

    // When the tab is changed
    recordTab(e) {
      // Recrod the current tab
      this.currentTab = e;
      this.updateSecondCatelog();
    },
    updateSecondCatelog() {
      // Set the second Catelog
      this.$store.dispatch(
        "set_selected_main_catelog",
        this.selectedMainCatelog
      );
    }
  },
  created() {
    this.selectedMainCatelog = this.allMainCatelog[0];
    this.updateSecondCatelog();
  }
};
</script>
