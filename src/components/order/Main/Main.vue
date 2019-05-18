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

import { mapGetters } from 'vuex';

// 3-party plugin to generate the pdf file
import jsPDF from "jspdf";

export default {  

  computed: {
    ...mapGetters([
      'materials',
      'fileName'
    ])
  },
  components: {
    MainDialog,
    MainHeader,
    MainData
  },
  methods: {
    downloadPDF() {
      let pdfName = this.fileName;
      var doc = new jsPDF();
      doc.text("Hello World", 10, 10);
      doc.save(pdfName + ".pdf");
    }
  }
};
</script>

