<template>
  <div>
    <v-treeview
      :items="allCategory"
      :open="open"
      open-on-click
      transition
      dark
      item-key="index"
    >
      <template v-slot:append="{ item, open }">
        <div v-if="!open">
          <v-icon @click.stop="onSelectedCategory(item)">edit</v-icon>
          <v-icon @click.stop="onDeleteCatelog(item)">delete</v-icon>
        </div>
      </template>
    </v-treeview>

    <LabelUpdateDialog
      :isShowDialog="isShowDialog"
      :selectedCategory="selectedCategory"
      @closeDialog="isShowDialog = false"
      @newCatelog="uploadCatelog($event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import LabelUpdateDialog from './LabelUpdateDialog';
import { DELETE_CATEGORY } from '../../store/mutation-types';
export default {
  components: {
    LabelUpdateDialog,
  },
  data: () => {
    return {
      isShowDialog: false,
      open: ['public'],
      selectedCategory: {},
    };
  },
  computed: {
    ...mapState({ selectedIndex: ({ labels }) => labels.selectedIndex }),
    ...mapGetters({ allCategory: 'getCategory' }),
  },
  methods: {
    ...mapMutations([DELETE_CATEGORY]),
    onSelectedCategory(selectedCategory) {
      this.isShowDialog = true;
      this.selectedCategory = selectedCategory;
    },

    onDeleteCatelog(selectedCategory) {
      this.DELETE_CATEGORY(selectedCategory);
    },
  },
};
</script>

<style lang="scss">
.v-treeview-node__label {
  margin-right: 1rem;
  flex-grow: initial !important;
}
</style>
