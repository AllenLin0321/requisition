<template>
  <v-container fluid class="table-container">
    <v-layout row align-center mb-3>

      <v-toolbar-title>{{ fileName }}</v-toolbar-title>
      <!-- Change the file name -->
      <v-btn flat icon color="deep-orange">
        <v-icon>create</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn fab dark color="pink" @click="downloadPDF">
        <v-icon dark>cloud_download</v-icon>
      </v-btn>
    </v-layout>

    <MainHeader></MainHeader>
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
import jsPDF from "jspdf";

export default {
  data() {
    return {
      fileName: '叫料單'
    }
  },
  computed: {
    materials() {
      return this.$store.getters.materials;
    }
  },
  components: {
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

