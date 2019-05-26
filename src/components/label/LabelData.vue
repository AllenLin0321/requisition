<template>
  <div>
    <v-treeview :items="data" :open="open" open-on-click transition item-key="name">
      <template v-slot:append="{ item, open }">
        <div v-if="!open">
          <v-icon @click.stop="getData">edit</v-icon>
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import LabelUpdateDialog from "./LabelUpdateDialog";
export default {
  components: {
    LabelUpdateDialog
  },
  data() {
    return {
      dialog: false,
      open: ["public"],
      selectedContent: ""
    };
  },
  computed: {
    ...mapGetters(["data", "selectedIndex"])
  },
  methods: {
    ...mapActions(["set_selected_index", "delete_catelog", "update_catelog"]),

    // Open the dialog and get the new Catelog Name
    getData(element) {
      // Show the input dialog
      this.dialog = true;

      // Get the content when click the icon
      this.selectedContent = this.getContent(element);

      // Set the selectedIndex in vuex
      this.findIndex(this.selectedContent);
    },

    // Update the new Catelog Name
    uploadCatelog(newCatelogName) {
      // Update the catelog
      this.update_catelog(newCatelogName);
    },
    // Delete the Catelog
    deleteCatelog(element) {
      const content = this.getContent(element);
      // Set the selectedIndex in vuex
      this.findIndex(content);
      this.delete_catelog();
    },
    // Find the index for the selected Catelog and store in the vuex
    findIndex(content) {
      this.set_selected_index(content);
    },
    // Get the content when click the icon
    getContent(element) {
      const text = element.toElement.parentElement.parentElement.getElementsByTagName(
        "div"
      )[0].innerHTML;
      return text;
    }
  }
};
</script>

<style lang="scss">
.v-treeview-node__label {
  margin-right: 1rem;
  flex-grow: initial !important;
}
</style>
