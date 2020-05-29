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
      <v-tabs centered color="cyan" dark icons-and-text @change="recordTab">
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <!-- Tab Header -->
        <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :href="`#tab-${index + 1}`"
        >
          {{ tab.name }}
          <v-icon>{{ tab.icon }}</v-icon>
        </v-tab>

        <!-- Main Catelog -->
        <v-tab-item value="tab-1">
          <v-card flat>
            <!-- Card Content -->
            <v-card-text>
              <v-text-field
                label="主目錄名稱"
                v-model="newManCatelogName"
                @keyup.enter="addCatelog"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Second Catelog -->
        <v-tab-item value="tab-2">
          <v-card flat>
            <!-- Card Content -->
            <v-card-text pa-5>
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
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Labels -->
        <v-tab-item value="tab-3">
          <v-card flat>
            <!-- Card Content -->
            <v-card-text>
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
              <v-text-field
                label="標籤名稱"
                v-model="newLabel"
                @keyup.enter="addCatelog"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <v-divider />

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
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      tabs: [
        { name: '主目錄', icon: 'book' },
        { name: '次目錄', icon: 'bookmarks' },
        { name: '標籤', icon: 'bookmark' },
      ],
      dialog: false,
      currentTab: '',
      selectedMainCatelog: '',
      newManCatelogName: '',
      newSubCatelogName: '',
      newLabel: '',
      selectedSecondCatelog: '',
    };
  },
  computed: {
    ...mapState({
      relatedSecondCatelog: ({ labels }) => {
        return labels.relatedSecondCatelog;
      },
    }),
    ...mapGetters(['allMainCatelog']),
  },
  watch: {
    selectedMainCatelog: function(value) {
      this.updateSecondCatelog();
    },
  },
  methods: {
    // Add new Catelog ( Including: Main, Sub and Label)
    addCatelog() {
      switch (this.currentTab) {
        // Add Main Catelog
        case 'tab-1':
          if (this.newManCatelogName) {
            this.$store.dispatch('addMainCatelog', this.newManCatelogName);
            this.newManCatelogName = '';
          } else {
            alert('請輸入資料');
          }
          break;

        // Add Second Catelog
        case 'tab-2':
          if (this.newSubCatelogName) {
            const data = {
              selectedMainCatelog: this.selectedMainCatelog,
              newSubCatelogName: this.newSubCatelogName,
            };
            this.$store.dispatch('addSecondCatelog', data);
            this.newSubCatelogName = '';
          } else {
            alert('請輸入資料');
          }
          break;

        // Add Label
        case 'tab-3':
          if (this.newLabel) {
            const data = {
              selectedMainCatelog: this.selectedMainCatelog,
              selectedSecondCatelog: this.selectedSecondCatelog,
              newLabel: this.newLabel,
            };
            this.$store.dispatch('addLabel', data);
            this.newLabel = '';
          } else {
            alert('請輸入資料');
          }

          break;
      }
      this.dialog = false;
    },

    // When the tab is changed
    recordTab(e) {
      // Recrod the current tab
      this.currentTab = e;

      // Update the Second Catelog in Label Tab when changed the tab
      this.updateSecondCatelog();
    },
    updateSecondCatelog() {
      // Set the second Catelog
      this.$store.dispatch('setSelectedMainCatelog', this.selectedMainCatelog);
    },
  },
  created() {
    this.selectedMainCatelog = this.allMainCatelog[0];
    this.updateSecondCatelog();
  },
};
</script>

<style lang="scss">
.v-card__text {
  padding: 35px;
}
</style>
