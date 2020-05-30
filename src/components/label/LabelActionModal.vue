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
      <v-tabs centered color="cyan" dark icons-and-text @change="onChangeTab">
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
                v-model="newManCategoryName"
                @keyup.enter="onAddCategory"
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
                :items="mainCategories"
                :item-text="item => item.name"
                :item-value="item => item.index"
                v-model="selectedMainCategory"
                label="主目錄名稱"
                outline
              ></v-select>
              <v-text-field
                label="次目錄名稱"
                v-model="newSubCatelogName"
                @keyup.enter="onAddCategory"
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
                :items="mainCategories"
                v-model="selectedMainCategory"
                :item-text="item => item.name"
                :item-value="item => item.index"
                label="主目錄名稱"
                outline
              ></v-select>
              <v-select
                :items="relatedSubCategoried"
                v-model="selectedSubCategory"
                :item-text="item => item.name"
                :item-value="item => item.index"
                label="次目錄名稱"
                outline
              ></v-select>
              <v-text-field
                label="標籤名稱"
                v-model="newLabel"
                @keyup.enter="onAddCategory"
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
        <v-btn color="teal lighten-1" flat @click="onAddCategory">
          <strong>完成</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import {
  ADD_MAIN_CATELOG,
  ADD_SECOND_CATELOG,
  ADD_LABEL,
} from '../../store/mutation-types';
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
      // new category/label name
      newManCategoryName: '',
      newSubCatelogName: '',
      newLabel: '',
      // Selected tab
      selectedMainCategory: '',
      selectedSubCategory: '',
    };
  },
  computed: {
    ...mapState({
      relatedSecondCatelog: ({ labels }) => {
        return labels.relatedSecondCatelog;
      },
      mainCategories: ({ labels }) => labels.mainCategories,
      subCategories: ({ labels }) => labels.subCategories,
    }),
    relatedSubCategoried() {
      if (this.subCategories.length === 0) return [];
      return this.subCategories.filter(
        subCategory => subCategory.parent === this.selectedMainCategory
      );
    },
  },
  methods: {
    ...mapMutations([ADD_MAIN_CATELOG, ADD_SECOND_CATELOG, ADD_LABEL]),
    // Add new Catelog ( Including: Main, Sub and Label)
    onAddCategory() {
      switch (this.currentTab) {
        // Add Main Catelog
        case 'tab-1':
          if (this.newManCategoryName) {
            this.ADD_MAIN_CATELOG(this.newManCategoryName);
            this.newManCategoryName = '';
          } else {
            alert('請輸入資料');
          }
          break;

        // Add Second Catelog
        case 'tab-2':
          if (this.newSubCatelogName) {
            const payload = {
              selectedMainCategory: this.selectedMainCategory,
              newSubCatelogName: this.newSubCatelogName,
            };
            this.ADD_SECOND_CATELOG(payload);
            this.newSubCatelogName = '';
          } else {
            alert('請輸入資料');
          }
          break;

        // Add Label
        case 'tab-3':
          if (this.newLabel) {
            const payload = {
              selectedSubCategory: this.selectedSubCategory,
              newLabel: this.newLabel,
            };
            this.ADD_LABEL(payload);
            this.newLabel = '';
          } else {
            alert('請輸入資料');
          }

          break;
      }
      this.dialog = false;
    },

    // When the tab is changed
    onChangeTab(e) {
      // Recrod the current tab
      this.currentTab = e;

      // Update the Second Catelog in Label Tab when changed the tab
      // this.updateSecondCatelog();
    },
    updateSecondCatelog() {
      // Set the second Catelog
      // this.$store.dispatch('setSelectedMainCatelog', this.selectedMainCategory);
    },
  },
  created() {
    this.selectedMainCategory =
      this.mainCategories.length === 0 ? 0 : this.mainCategories[0].index;
    // this.updateSecondCatelog();
  },
};
</script>

<style lang="scss">
.v-card__text {
  padding: 35px;
}
</style>
