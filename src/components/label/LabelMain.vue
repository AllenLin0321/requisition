<template>
  <v-container>
    <!-- Action -->
    <v-layout sm6 mb-3>
      <v-flex class="action">
        <!-- Add Catelog -->
        <LabelActionModal />

        <!-- Show Progree circle when uploading the data to firebase -->
        <v-progress-circular
          indeterminate
          color="#1867C0"
          v-if="showUploadProgress"
        ></v-progress-circular>

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
    <v-progress-circular
      indeterminate
      color="#1867C0"
      v-if="!showData"
    ></v-progress-circular>
    <LabelData v-if="showData" />
  </v-container>
</template>

<script>
import axios from 'axios';
import LabelData from './LabelData';
import LabelActionModal from './LabelActionModal';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    LabelActionModal,
    LabelData,
  },
  data: () => ({
    snackbar: {
      show: false,
      text: '',
      timeout: 3000,
      color: '',
    },
    showUploadProgress: false,
    showData: false,
  }),
  computed: {
    ...mapState(['labels']),
    ...mapGetters(['data']),
  },
  methods: {
    ...mapActions(['fetchCatelog']),
  },
  created() {
    this.fetchCatelog();
    this.showData = true;
  },
};
</script>
