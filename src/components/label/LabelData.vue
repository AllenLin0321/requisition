<template>
  <v-treeview :items="data" :open="open" open-on-click transition item-key="name">
    <template v-slot:append="{ item, open }">
      <div v-if="!open">
        <v-icon @click.stop="updateCatelog">edit</v-icon>
        <v-icon @click.stop="deleteCatelog">delete</v-icon>
      </div>
    </template>
  </v-treeview>
</template>


<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      open: ["public"]
    };
  },
  computed: {
    ...mapGetters(["data", "selectedIndex"])
  },
  methods: {
    ...mapActions(["set_selected_index","delete_catelog"]),
    updateCatelog(element) {},
    deleteCatelog(element) {
      const content = this.getContent(element);
        // Set the selectedIndex in vuex
      this.findIndex(content);
      this.delete_catelog();
    },
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
