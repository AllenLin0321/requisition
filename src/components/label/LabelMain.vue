<template>
  <v-container>
    <!-- Action -->
    <v-layout sm6 mb-3>
      <v-flex class="action">
        <!-- Add Catelog -->
        <LabelActionAdd/>

        <v-btn color="teal lighten-2" class="white--text" @click="uploadCatelog">
          儲存目錄
          <v-icon right dark>backup</v-icon>
        </v-btn>

        <!-- Show Progree circle when uploading the data to firebase -->
        <v-progress-circular indeterminate color="#1867C0" v-if="showUploadProgress"></v-progress-circular>

        <!-- Notification on the left bottom -->
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
    <LabelData v-if="showData" />

  </v-container>
</template>

<script>
import LabelData from './LabelData';
import LabelActionAdd from "./LabelActionAdd";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    LabelActionAdd,
    LabelData
  },
  data: () => ({
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

    // Upload the Catelog to firebase
    uploadCatelog() {
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
    // Download the catelog from Firebase
    var vm = this;
    axios
      .get("/catelog.json")
      .then(res => {
        const data = res.data;
        if (data) {
          // Upload the new Catelog to vuex
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




