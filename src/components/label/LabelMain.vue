<template>
  <v-container>
    <!-- Action -->
    <v-layout sm6 mb-3>
      <v-flex class="action">
        <!-- Add Catelog -->
        <LabelActionAdd/>

        <v-btn color="teal lighten-2" class="white--text" @click="saveAllCatelog">
          儲存目錄
          <v-icon right dark>backup</v-icon>
        </v-btn>

        <v-progress-circular indeterminate color="#1867C0" v-if="showUploadProgress"></v-progress-circular>

        <v-snackbar
          v-model="snackbar.show"
          bottom
          left
          :timeout="snackbar.timeout"
          :color="snackbar.color"
        >
          {{ snackbar.text }}
          <v-btn dark flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>

    <!-- Data -->

    <v-progress-circular indeterminate color="#1867C0" v-if="!showData"></v-progress-circular>

    <v-treeview :items="data" :open="open" open-on-click transition item-key="name" v-if="showData">
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
import { mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    LabelActionAdd
  },
  data: () => ({
    open: ["public"],
    snackbar: {
      show: false,
      text: "",
      timeout: 3000,
      color: ""
    },
    showUploadProgress: false,
    showData: false
  }),
  computed: {
    ...mapGetters(["data", "labels"])
  },
  methods: {
    ...mapActions(["set_default_catelog"]),
    alert(element) {
      const text = element.toElement.parentElement.parentElement.getElementsByTagName(
        "div"
      )[0].innerHTML;
      alert(text);
    },
    saveAllCatelog() {
      var vm = this
      this.showUploadProgress=true;
      const formData = {
        allCatelog: this.labels
      };
      axios
        .put("/catelog.json", formData)
        .then(res => {
          console.log(res);
          this.snackbar.color = "#4CAF50";
          this.snackbar.text = "儲存成功!";
          this.snackbar.show = true;
          vm.showUploadProgress=false;
        })
        .catch(error => {
          console.log(error);
          this.snackbar.color = "#FF5252";
          this.snackbar.text = "儲存失敗!";
          this.snackbar.show = true;
          vm.showProgress=false;
        });
    }
  },
  created() {
    var vm = this;
    axios
      .get("/catelog.json")
      .then(res => {
        const data = res.data;
        if (data) {
          vm.set_default_catelog(data.allCatelog);
          vm.showData = true;
        }
      })
      .then(error => {
        console.log(error);
        vm.showData = true;
      });
  }
};
</script>


<style lang="scss">
.v-treeview-node__label {
  margin-right: 1rem;
  flex-grow: initial !important;
}
</style>

