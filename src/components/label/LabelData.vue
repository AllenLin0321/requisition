<template>
  <div>
    <v-treeview
      :items="allCategory"
      :open="open"
      open-on-click
      transition
      dark
      item-key="name"
    >
      <template v-slot:append="{ item, open }">
        <div v-if="!open">
          <v-icon @click.stop="onEditCategory(item)">edit</v-icon>
          <v-icon @click.stop="deleteCatelog">delete</v-icon>
        </div>
      </template>
    </v-treeview>

    <LabelUpdateDialog
      :dialog="dialog"
      @closeDialog="dialog = $event"
      @newCatelog="uploadCatelog($event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import LabelUpdateDialog from './LabelUpdateDialog';
export default {
  components: {
    LabelUpdateDialog,
  },
  data() {
    return {
      dialog: false,
      open: ['public'],
      selectedContent: '',
    };
  },
  computed: {
    ...mapState({ selectedIndex: ({ labels }) => labels.selectedIndex }),
    ...mapGetters({ allCategory: 'getCategory' }),
  },
  methods: {
    ...mapActions(['setSelectedIndex', 'deleteCatelog', 'updateCatelog']),

    // Open the dialog and get the new Catelog Name
    onEditCategory(element) {
      console.log('element: ', element);
      // Show the input dialog
      this.dialog = true;

      // Get the content when click the icon
      // this.selectedContent = this.getContent(element);

      // Set the selectedIndex in vuex
      this.findIndex(this.selectedContent);
    },

    // Update the new Catelog Name
    uploadCatelog(newCatelogName) {
      // Update the catelog
      this.updateCatelog(newCatelogName);
    },
    // Delete the Catelog
    deleteCatelog(element) {
      const content = this.getContent(element);
      // Set the selectedIndex in vuex
      this.findIndex(content);
      this.deleteCatelog();
    },
    // Find the index for the selected Catelog and store in the vuex
    findIndex(content) {
      this.setSelectedIndex(content);
    },
    // Get the content when click the icon
    getContent(element) {
      const text = element.toElement.parentElement.parentElement.getElementsByTagName(
        'div'
      )[0].innerHTML;
      return text;
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
