<template>
  <v-container>
    <!-- Action -->
    <v-layout sm6 mb-3>
      <v-flex class="action">
        <!-- Add Catelog -->
        <LabelActionAdd/>

        <v-btn color="teal lighten-2" class="white--text">
          儲存目錄
          <v-icon right dark>backup</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- Data -->
    <v-treeview :items="data" :open="open" open-on-click transition item-key="name">
      <template v-slot:append="{ item, open }">
        <div v-if="!open">
          <v-icon @click="alert">edit</v-icon>
          <v-icon @click="alert">delete</v-icon>
        </div>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
import LabelActionAdd from "./LabelActionAdd";
import { mapGetters } from "vuex";

export default {
  components: {
    LabelActionAdd
  },
  data: () => ({
    open: ["public"]
  }),
  computed: {
    ...mapGetters(["data"])
  },
  methods: {
    alert(element) {
      const text = element.toElement.parentElement.parentElement.getElementsByTagName(
        "div"
      )[0].innerHTML;
      alert(text);
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

