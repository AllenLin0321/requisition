<template>
  <v-container fluid class="table-container">
    <v-layout row align-center mb-3>
      <!-- File Name on the top -->
      <v-toolbar-title>{{ fileName }}</v-toolbar-title>

      <!-- Change the file Name if clcck the EDIT -->
      <MainDialog/>

      <v-spacer></v-spacer>

      <!-- Download the pdf file -->
      <v-btn fab dark color="pink" @click="downloadPDF">
        <v-icon dark>cloud_download</v-icon>
      </v-btn>
    </v-layout>

    <!-- Data Header -->
    <MainHeader></MainHeader>

    <!-- Data -->
    <MainData
      v-for="(material, index) in materials"
      :key="index"
      :material="material"
      :index="index"
    ></MainData>
  </v-container>
</template>

<script>
import MainHeader from "./MainHeader";
import MainData from "./MainData";
import MainDialog from "./MainDialog";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["materials", "fileName"])
  },
  components: {
    MainDialog,
    MainHeader,
    MainData
  },
  methods: {
    downloadPDF() {
      var docDefinition = { content: 'This is an sample PDF printed with pdfMake 測試' };
      pdfMake.createPdf(docDefinition).download("測試");
    }
  }
};
</script>

